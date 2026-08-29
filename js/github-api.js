/**
 * Real-Time Live GitHub API Integration
 * Mohammad Zishan Alam — Real-Time Repository, Activity & Commit Stream
 */
class GitHubService {
    constructor() {
        this.defaultUsername = 'MohammadZishanAlam';
        this.cache = new Map();
        this.usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
        this.lastRequestTime = 0;
        this.minRequestIntervalMs = 500;
        this.autoRefreshTimer = null;
        this.autoRefreshIntervalMs = 60000; // Auto-poll every 60s for new pushes
    }

    sanitizeUsername(raw) {
        if (!raw || typeof raw !== 'string') return this.defaultUsername;
        const clean = raw.trim().replace(/^@/, '');
        if (!this.usernameRegex.test(clean)) {
            throw new Error("Invalid GitHub username format. Allowed: alphanumeric characters and single hyphens (1-39 chars).");
        }
        return clean;
    }

    async throttle() {
        const now = Date.now();
        const elapsed = now - this.lastRequestTime;
        if (elapsed < this.minRequestIntervalMs) {
            await new Promise(res => setTimeout(res, this.minRequestIntervalMs - elapsed));
        }
        this.lastRequestTime = Date.now();
    }

    timeAgo(dateString) {
        if (!dateString) return 'recently';
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days === 1) return 'Yesterday';
        if (days < 30) return `${days}d ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        return `${Math.floor(months / 12)}y ago`;
    }

    async fetchUserProfile(username = this.defaultUsername, bypassCache = false) {
        const cleanUser = this.sanitizeUsername(username);
        const cacheKey = `gh_user_${cleanUser}`;

        if (!bypassCache && this.cache.has(cacheKey)) return this.cache.get(cacheKey);

        await this.throttle();

        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });

            if (!response.ok) {
                if (response.status === 404) throw new Error(`GitHub user '@${cleanUser}' not found.`);
                if (response.status === 403) throw new Error("GitHub API rate limit reached. Re-syncing shortly.");
                throw new Error(`GitHub API returned status ${response.status}`);
            }

            const data = await response.json();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.warn("GitHub Profile Fetch Warning:", error.message);
            throw error;
        }
    }

    async fetchUserRepos(username = this.defaultUsername, bypassCache = false) {
        const cleanUser = this.sanitizeUsername(username);
        const cacheKey = `gh_repos_${cleanUser}`;

        if (!bypassCache && this.cache.has(cacheKey)) return this.cache.get(cacheKey);

        await this.throttle();

        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=pushed&per_page=12`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });

            if (!response.ok) {
                if (response.status === 404) throw new Error("Repositories not found.");
                if (response.status === 403) throw new Error("GitHub API rate limit exceeded.");
                throw new Error(`GitHub API error (${response.status})`);
            }

            const repos = await response.json();
            if (!Array.isArray(repos)) throw new Error("Invalid response from GitHub.");

            this.cache.set(cacheKey, repos);
            return repos;
        } catch (error) {
            console.warn("GitHub Repos Fetch Warning:", error.message);
            throw error;
        }
    }

    async fetchUserEvents(username = this.defaultUsername, bypassCache = false) {
        const cleanUser = this.sanitizeUsername(username);
        const cacheKey = `gh_events_${cleanUser}`;

        if (!bypassCache && this.cache.has(cacheKey)) return this.cache.get(cacheKey);

        await this.throttle();

        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}/events/public?per_page=10`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });

            if (!response.ok) {
                return []; // Non-blocking fallback
            }

            const events = await response.json();
            if (!Array.isArray(events)) return [];

            this.cache.set(cacheKey, events);
            return events;
        } catch (error) {
            console.warn("GitHub Events Fetch Warning:", error.message);
            return [];
        }
    }

    calculateLanguageStats(repos) {
        const langCounts = {};
        let total = 0;

        repos.forEach(repo => {
            if (repo.language && typeof repo.language === 'string') {
                const cleanLang = repo.language.substring(0, 30);
                langCounts[cleanLang] = (langCounts[cleanLang] || 0) + 1;
                total++;
            }
        });

        if (total === 0) return [];

        return Object.keys(langCounts).map(lang => ({
            name: lang,
            count: langCounts[lang],
            percentage: Math.round((langCounts[lang] / total) * 100)
        })).sort((a, b) => b.count - a.count);
    }

    getLanguageColor(language) {
        const isDark = document.documentElement.getAttribute("data-theme") !== "light";
        const colorsDark = {
            "Python": "#3572A5",
            "Jupyter Notebook": "#DA5B0B",
            "JavaScript": "#f1e05a",
            "TypeScript": "#3178c6",
            "HTML": "#e34c26",
            "CSS": "#563d7c",
            "C++": "#f34b7d",
            "C": "#555555",
            "Java": "#b07219",
            "SQL": "#e38c00",
            "Shell": "#89e051"
        };
        const colorsLight = {
            "Python": "#02457a",
            "Jupyter Notebook": "#c04e06",
            "JavaScript": "#b8860b",
            "TypeScript": "#1d5899",
            "HTML": "#b83210",
            "CSS": "#432868",
            "C++": "#b81d4a",
            "C": "#333333",
            "Java": "#85510e",
            "SQL": "#ad6800",
            "Shell": "#3b7a12"
        };
        const colors = isDark ? colorsDark : colorsLight;
        return colors[language] || (isDark ? "#00f2fe" : "#02457a");
    }
}

// Global GitHub Service Instance
const githubService = new GitHubService();

// UI Render Handler for GitHub Section
async function renderGitHubSection(username = null, bypassCache = false) {
    const targetRaw = username || (typeof USER_CONFIG !== 'undefined' ? USER_CONFIG.githubUsername : 'MohammadZishanAlam');
    const container = document.getElementById('github-repos-container');
    const profileCard = document.getElementById('github-profile-card');
    const statsContainer = document.getElementById('github-lang-stats');
    const activityFeedContainer = document.getElementById('github-activity-feed');
    const statusMsg = document.getElementById('github-status-msg');
    const refreshBtnIcon = document.getElementById('github-refresh-icon');

    if (!container) return;

    if (refreshBtnIcon) refreshBtnIcon.classList.add('fa-spin');

    let targetUser;
    try {
        targetUser = githubService.sanitizeUsername(targetRaw);
    } catch (valErr) {
        if (refreshBtnIcon) refreshBtnIcon.classList.remove('fa-spin');
        container.innerHTML = `
            <div class="col-span-full glass-card p-6 rounded-2xl text-center border-rose-500/30">
                <i class="fas fa-triangle-exclamation text-amber-500 text-2xl mb-2"></i>
                <p class="text-sm text-theme-primary font-bold mb-1">Validation Error</p>
                <p class="text-xs text-rose-500 font-medium">${escapeHtml(valErr.message)}</p>
            </div>
        `;
        if (statusMsg) {
            statusMsg.textContent = "Invalid username";
            statusMsg.className = "text-xs text-rose-500 font-bold";
        }
        return;
    }

    if (statusMsg) {
        statusMsg.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-1.5"></span>Syncing live with @${targetUser}...`;
        statusMsg.className = "text-xs text-electric-cyan font-bold flex items-center";
    }

    try {
        const [profile, repos, events] = await Promise.all([
            githubService.fetchUserProfile(targetUser, bypassCache),
            githubService.fetchUserRepos(targetUser, bypassCache),
            githubService.fetchUserEvents(targetUser, bypassCache)
        ]);

        if (refreshBtnIcon) refreshBtnIcon.classList.remove('fa-spin');

        // 1. Secure Profile Card Render
        if (profileCard) {
            const safeAvatar = profile.avatar_url && profile.avatar_url.startsWith('https://') ? escapeHtml(profile.avatar_url) : 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
            const safeHtmlUrl = profile.html_url && profile.html_url.startsWith('https://') ? escapeHtml(profile.html_url) : '#';

            profileCard.innerHTML = `
                <div class="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 border-glow">
                    <img src="${safeAvatar}" alt="${escapeHtml(profile.name || profile.login)}" class="w-20 h-20 rounded-full border-2 border-electric-cyan shadow-md flex-shrink-0" loading="lazy" referrerpolicy="no-referrer">
                    <div class="flex-1 text-center md:text-left">
                        <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                            <h3 class="text-xl font-bold text-theme-primary">${escapeHtml(profile.name || profile.login)}</h3>
                            <a href="${safeHtmlUrl}" target="_blank" rel="noopener noreferrer" class="badge-cyan text-xs">
                                <i class="fab fa-github mr-1"></i>@${escapeHtml(profile.login)}
                            </a>
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Live Sync Active
                            </span>
                        </div>
                        <p class="text-xs text-theme-secondary mb-3 font-medium">${escapeHtml(profile.bio || "Data & Pipeline Engineer | B.Tech CSE Undergrad")}</p>
                        <div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-theme-muted font-semibold">
                            ${profile.location ? `<span><i class="fas fa-map-marker-alt mr-1 text-electric-cyan"></i>${escapeHtml(profile.location)}</span>` : ''}
                            <span><i class="fas fa-book-bookmark mr-1 text-electric-cyan"></i>${parseInt(profile.public_repos, 10) || 0} Repositories</span>
                            <span><i class="fas fa-users mr-1 text-electric-cyan"></i>${parseInt(profile.followers, 10) || 0} Followers</span>
                            <span><i class="fas fa-code-fork mr-1 text-electric-cyan"></i>${repos.reduce((acc, r) => acc + (parseInt(r.forks_count, 10) || 0), 0)} Forks</span>
                            <span><i class="fas fa-star mr-1 text-electric-cyan"></i>${repos.reduce((acc, r) => acc + (parseInt(r.stargazers_count, 10) || 0), 0)} Stars</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 w-full md:w-auto flex-shrink-0">
                        <a href="${safeHtmlUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-sm text-center font-bold">
                            <i class="fab fa-github mr-1.5"></i>Follow on GitHub
                        </a>
                    </div>
                </div>
            `;
        }

        // 2. Real-Time Activity & Commit Stream Feed
        if (activityFeedContainer) {
            if (events && events.length > 0) {
                const recentPushes = events.filter(e => e.type === 'PushEvent' || e.type === 'CreateEvent' || e.type === 'WatchEvent').slice(0, 4);

                activityFeedContainer.innerHTML = `
                    <div class="glass-card p-5 rounded-2xl mb-6 border border-cyan-600/30">
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <h4 class="text-xs font-bold text-theme-primary uppercase tracking-wider flex items-center gap-2">
                                <i class="fas fa-satellite-dish text-electric-cyan animate-pulse"></i>
                                Real-Time GitHub Push &amp; Activity Stream
                            </h4>
                            <span class="text-[10px] text-theme-muted font-mono font-bold">Auto-Syncs with GitHub</span>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            ${recentPushes.map(ev => {
                                const repoShortName = ev.repo ? ev.repo.name.replace(/^[^/]+\//, '') : 'Repository';
                                const repoFullUrl = `https://github.com/${ev.repo ? ev.repo.name : targetUser}`;
                                const timeStr = githubService.timeAgo(ev.created_at);

                                let eventIcon = 'fa-code-commit text-electric-cyan';
                                let eventText = 'Pushed updates';
                                let commitMsg = '';

                                if (ev.type === 'PushEvent') {
                                    eventIcon = 'fa-code-commit text-emerald-500';
                                    const commitCount = (ev.payload && ev.payload.commits) ? ev.payload.commits.length : 1;
                                    eventText = `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''}`;
                                    if (ev.payload && ev.payload.commits && ev.payload.commits[0]) {
                                        commitMsg = ev.payload.commits[0].message || '';
                                    }
                                } else if (ev.type === 'CreateEvent') {
                                    eventIcon = 'fa-folder-plus text-amber-500';
                                    eventText = `Created ${ev.payload && ev.payload.ref_type ? ev.payload.ref_type : 'repository'}`;
                                } else if (ev.type === 'WatchEvent') {
                                    eventIcon = 'fa-star text-amber-400';
                                    eventText = 'Starred repository';
                                }

                                return `
                                    <div class="p-3 rounded-xl card-inner-box flex items-start justify-between gap-2 transition-all hover:border-cyan-600/40">
                                        <div class="flex items-start gap-2.5 overflow-hidden">
                                            <div class="mt-0.5 text-sm flex-shrink-0">
                                                <i class="fas ${eventIcon}"></i>
                                            </div>
                                            <div class="overflow-hidden">
                                                <div class="flex items-center gap-1.5 flex-wrap">
                                                    <span class="text-xs font-bold text-theme-primary">${escapeHtml(eventText)} to</span>
                                                    <a href="${escapeHtml(repoFullUrl)}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-electric-cyan hover:underline truncate">
                                                        ${escapeHtml(repoShortName)}
                                                    </a>
                                                </div>
                                                ${commitMsg ? `<p class="text-[11px] text-theme-secondary font-mono truncate mt-0.5">"${escapeHtml(commitMsg)}"</p>` : ''}
                                            </div>
                                        </div>
                                        <span class="text-[10px] text-theme-muted font-mono font-bold flex-shrink-0 whitespace-nowrap">${escapeHtml(timeStr)}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            } else {
                activityFeedContainer.innerHTML = '';
            }
        }

        // 3. Render Language Breakdown
        if (statsContainer) {
            const langStats = githubService.calculateLanguageStats(repos);
            if (langStats.length > 0) {
                statsContainer.innerHTML = `
                    <div class="glass-card p-5 rounded-2xl mb-6">
                        <h4 class="text-xs font-bold text-theme-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i class="fas fa-chart-pie text-electric-cyan"></i> Real-Time Code Languages Breakdown
                        </h4>
                        <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 flex overflow-hidden mb-3 border border-slate-300 dark:border-slate-700">
                            ${langStats.map(l => `
                                <div style="width: ${l.percentage}%; background-color: ${githubService.getLanguageColor(l.name)}" 
                                     title="${escapeHtml(l.name)}: ${l.percentage}%" 
                                     class="h-full transition-all duration-500 hover:opacity-80">
                                </div>
                            `).join('')}
                        </div>
                        <div class="flex flex-wrap gap-3">
                            ${langStats.map(l => `
                                <span class="inline-flex items-center text-xs text-theme-secondary font-semibold">
                                    <span class="w-2.5 h-2.5 rounded-full mr-1.5 flex-shrink-0" style="background-color: ${githubService.getLanguageColor(l.name)}"></span>
                                    ${escapeHtml(l.name)} <span class="text-theme-muted ml-1 font-mono">(${l.percentage}%)</span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                statsContainer.innerHTML = '';
            }
        }

        // 4. Render Repositories Sorted by Real-Time Activity
        if (repos.length === 0) {
            container.innerHTML = `
                <div class="col-span-full glass-card p-8 rounded-2xl text-center">
                    <i class="fas fa-folder-open text-3xl text-theme-muted mb-2"></i>
                    <p class="text-theme-secondary font-bold">No public repositories found for @${escapeHtml(targetUser)}.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = repos.slice(0, 8).map(repo => {
            const langColor = githubService.getLanguageColor(repo.language || 'Other');
            const safeRepoUrl = repo.html_url && repo.html_url.startsWith('https://') ? escapeHtml(repo.html_url) : '#';
            const updatedTime = githubService.timeAgo(repo.pushed_at || repo.updated_at);

            return `
                <div class="github-repo-card glass-card rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-cyan-600/50">
                    <div>
                        <div class="flex items-start justify-between gap-2 mb-2">
                            <h4 class="font-bold text-sm text-theme-primary flex items-center gap-1.5 truncate" title="${escapeHtml(repo.name)}">
                                <i class="far fa-folder text-electric-cyan flex-shrink-0"></i>
                                <span class="truncate">${escapeHtml(repo.name)}</span>
                            </h4>
                            <span class="text-[10px] px-2 py-0.5 rounded-full ${repo.private ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold' : 'tag-pill font-mono'}">
                                ${repo.private ? 'Private' : 'Public'}
                            </span>
                        </div>
                        <p class="text-xs text-theme-secondary leading-relaxed mb-4 line-clamp-3 font-medium">
                            ${escapeHtml(repo.description || "Data & Pipeline Engineering repository.")}
                        </p>
                        ${Array.isArray(repo.topics) && repo.topics.length > 0 ? `
                            <div class="flex flex-wrap gap-1.5 mb-3">
                                ${repo.topics.slice(0, 3).map(t => `<span class="tag-pill text-[9px] font-mono">${escapeHtml(t)}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>

                    <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-theme-muted font-bold">
                        <div class="flex items-center gap-3">
                            ${repo.language ? `
                                <span class="flex items-center gap-1">
                                    <span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: ${langColor}"></span>
                                    <span class="text-theme-secondary text-[11px] font-semibold">${escapeHtml(repo.language)}</span>
                                </span>
                            ` : ''}
                            <span class="flex items-center gap-1 text-[11px]" title="Last Pushed">
                                <i class="fas fa-clock-rotate-left text-cyan-600"></i> ${escapeHtml(updatedTime)}
                            </span>
                        </div>
                        <a href="${safeRepoUrl}" target="_blank" rel="noopener noreferrer" class="text-electric-cyan font-bold hover:underline flex items-center gap-1 text-[11px]" title="Open ${escapeHtml(repo.name)} on GitHub">
                            <span>Code</span>
                            <i class="fas fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        if (statusMsg) {
            statusMsg.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>Connected &bull; Last Synced ${new Date().toLocaleTimeString()}`;
            statusMsg.className = "text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center";
        }

    } catch (err) {
        if (refreshBtnIcon) refreshBtnIcon.classList.remove('fa-spin');
        console.error("GitHub Render Error:", err);
        container.innerHTML = `
            <div class="col-span-full glass-card p-6 rounded-2xl text-center border-rose-500/30">
                <i class="fas fa-triangle-exclamation text-amber-500 text-2xl mb-2"></i>
                <p class="text-sm text-theme-primary font-bold mb-1">Could not fetch GitHub repositories for <strong>@${escapeHtml(targetUser)}</strong>.</p>
                <p class="text-xs text-theme-muted mb-3 font-medium">${escapeHtml(err.message)}</p>
                <p class="text-xs text-electric-cyan font-mono">Configured username: <code>${escapeHtml(targetUser)}</code></p>
            </div>
        `;
        if (statusMsg) {
            statusMsg.textContent = `Notice: ${err.message}`;
            statusMsg.className = "text-xs text-rose-500 dark:text-rose-400 font-bold";
        }
    }
}

// Start Real-Time Auto-Polling
function startGitHubAutoSync() {
    if (githubService.autoRefreshTimer) clearInterval(githubService.autoRefreshTimer);
    githubService.autoRefreshTimer = setInterval(() => {
        const userInput = document.getElementById("github-username-input");
        const currentUser = userInput ? userInput.value.trim() : null;
        renderGitHubSection(currentUser, true);
    }, githubService.autoRefreshIntervalMs);
}

function escapeHtml(unsafe) {
    if (!unsafe) return "";
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
