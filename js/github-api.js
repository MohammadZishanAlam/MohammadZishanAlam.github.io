/**
 * Live GitHub API Integration (Security Hardened)
 * Mohammad Zishan Alam — Real-Time Repository & Stats Integration
 */
class GitHubService {
    constructor() {
        this.defaultUsername = 'MohammadZishanAlam';
        this.cache = new Map();
        this.usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;
        this.lastRequestTime = 0;
        this.minRequestIntervalMs = 600; // Throttle to prevent spamming
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

    async fetchUserProfile(username = this.defaultUsername) {
        const cleanUser = this.sanitizeUsername(username);
        const cacheKey = `gh_user_${cleanUser}`;

        // Check in-memory & sessionStorage cache
        if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache.set(cacheKey, parsed);
                return parsed;
            }
        } catch (_) {}

        await this.throttle();

        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) throw new Error(`GitHub user '@${cleanUser}' not found.`);
                if (response.status === 403) throw new Error("GitHub API rate limit exceeded. Cached data will be used where available.");
                throw new Error(`GitHub API returned status ${response.status}`);
            }

            const data = await response.json();
            this.cache.set(cacheKey, data);
            try { sessionStorage.setItem(cacheKey, JSON.stringify(data)); } catch (_) {}
            return data;
        } catch (error) {
            console.warn("GitHub Profile Fetch Warning:", error.message);
            throw error;
        }
    }

    async fetchUserRepos(username = this.defaultUsername) {
        const cleanUser = this.sanitizeUsername(username);
        const cacheKey = `gh_repos_${cleanUser}`;

        if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache.set(cacheKey, parsed);
                return parsed;
            }
        } catch (_) {}

        await this.throttle();

        try {
            const response = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUser)}/repos?sort=updated&per_page=12`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) throw new Error("Repositories not found.");
                if (response.status === 403) throw new Error("GitHub API rate limit exceeded.");
                throw new Error(`GitHub API error (${response.status})`);
            }

            const repos = await response.json();
            if (!Array.isArray(repos)) throw new Error("Invalid response from GitHub.");

            const sortedRepos = repos.sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count));
            this.cache.set(cacheKey, sortedRepos);
            try { sessionStorage.setItem(cacheKey, JSON.stringify(sortedRepos)); } catch (_) {}
            return sortedRepos;
        } catch (error) {
            console.warn("GitHub Repos Fetch Warning:", error.message);
            throw error;
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
            "Python": "#1e4f7a",
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
async function renderGitHubSection(username = null) {
    const targetRaw = username || (typeof USER_CONFIG !== 'undefined' ? USER_CONFIG.githubUsername : 'MohammadZishanAlam');
    const container = document.getElementById('github-repos-container');
    const profileCard = document.getElementById('github-profile-card');
    const statsContainer = document.getElementById('github-lang-stats');
    const statusMsg = document.getElementById('github-status-msg');

    if (!container) return;

    let targetUser;
    try {
        targetUser = githubService.sanitizeUsername(targetRaw);
    } catch (valErr) {
        container.innerHTML = `
            <div class="col-span-full glass-card p-6 rounded-2xl text-center border-rose-500/30">
                <i class="fas fa-triangle-exclamation text-amber-500 text-2xl mb-2"></i>
                <p class="text-sm text-theme-primary font-bold mb-1">Security Validation Error</p>
                <p class="text-xs text-rose-500 font-medium">${escapeHtml(valErr.message)}</p>
            </div>
        `;
        if (statusMsg) {
            statusMsg.textContent = "Invalid username";
            statusMsg.className = "text-xs text-rose-500 font-bold";
        }
        return;
    }

    // Show loading state
    container.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div class="loader mb-4"></div>
            <p class="text-xs text-theme-muted font-medium">Fetching verified repositories from GitHub for <strong>@${escapeHtml(targetUser)}</strong>...</p>
        </div>
    `;

    if (statusMsg) {
        statusMsg.textContent = `Syncing with @${targetUser}...`;
        statusMsg.className = "text-xs text-electric-cyan animate-pulse font-bold";
    }

    try {
        const [profile, repos] = await Promise.all([
            githubService.fetchUserProfile(targetUser),
            githubService.fetchUserRepos(targetUser)
        ]);

        // Secure Profile Card Render
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
                        <a href="${safeHtmlUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-sm text-center">
                            <i class="fab fa-github mr-1.5"></i>Follow on GitHub
                        </a>
                    </div>
                </div>
            `;
        }

        // Render Language Breakdown
        if (statsContainer) {
            const langStats = githubService.calculateLanguageStats(repos);
            if (langStats.length > 0) {
                statsContainer.innerHTML = `
                    <div class="glass-card p-5 rounded-2xl mb-6">
                        <h4 class="text-xs font-bold text-theme-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                            <i class="fas fa-chart-pie text-electric-cyan"></i> Top GitHub Languages Breakdown
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

        // Render Repositories
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
                            <span class="flex items-center gap-1" title="Stars">
                                <i class="far fa-star text-amber-500"></i> ${parseInt(repo.stargazers_count, 10) || 0}
                            </span>
                            <span class="flex items-center gap-1" title="Forks">
                                <i class="fas fa-code-fork text-cyan-600"></i> ${parseInt(repo.forks_count, 10) || 0}
                            </span>
                        </div>
                        <a href="${safeRepoUrl}" target="_blank" rel="noopener noreferrer" class="text-electric-cyan font-bold hover:underline flex items-center gap-1 text-[11px]" title="View on GitHub">
                            <span>Code</span>
                            <i class="fas fa-arrow-up-right-from-square text-[9px]"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        if (statusMsg) {
            statusMsg.textContent = `Connected to GitHub (@${targetUser})`;
            statusMsg.className = "text-xs text-emerald-600 dark:text-emerald-400 font-bold";
        }

    } catch (err) {
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

function escapeHtml(unsafe) {
    if (!unsafe) return "";
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
