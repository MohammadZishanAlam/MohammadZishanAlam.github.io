/**
 * Main Portfolio Application Logic (Production & Security Hardened)
 * Mohammad Zishan Alam — Aspiring Data Engineer & Problem Solver
 */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    populateUserConfig();
    initTypingEffect();
    if (typeof renderGitHubSection === 'function') {
        renderGitHubSection();
        startGitHubAutoSync();
    }
    renderServices();
    renderSkills();
    renderProjects("all");
    renderTimeline();
    initProjectFilters();
    initModalHandlers();
    initScrollSpy();
    initStatsCounter();
    initContactForm();
    initMobileNav();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark";

    setTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            try { localStorage.setItem("portfolio_theme", newTheme); } catch (_) {}
        });
    }
}

function setTheme(theme) {
    const safeTheme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", safeTheme);
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
        if (safeTheme === "light") {
            themeIcon.className = "fas fa-moon text-blue-900";
        } else {
            themeIcon.className = "fas fa-sun text-amber-300";
        }
    }
}

/* ==========================================================================
   2. User Config Initialization
   ========================================================================== */
function populateUserConfig() {
    if (typeof USER_CONFIG === 'undefined') return;

    // Safe string setters
    const setText = (selector, val) => {
        document.querySelectorAll(selector).forEach(el => {
            el.textContent = String(val || '');
        });
    };

    setText(".user-name", USER_CONFIG.name);
    setText(".user-title", USER_CONFIG.title);
    setText(".user-tagline", USER_CONFIG.tagline);
    setText(".user-bio", USER_CONFIG.bio);
    setText(".user-location", USER_CONFIG.location);
    setText(".user-availability", USER_CONFIG.availabilityStatus);

    // Social Links with noopener noreferrer enforcement
    const setSafeLink = (id, url) => {
        const el = document.getElementById(id);
        if (el && url && typeof url === 'string') {
            el.href = url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:') ? url : '#';
            el.setAttribute("rel", "noopener noreferrer");
        }
    };
    setSafeLink("github-link", USER_CONFIG.github);
    setSafeLink("github-hero-link", USER_CONFIG.github);
    setSafeLink("linkedin-link", USER_CONFIG.linkedin);
    setSafeLink("linkedin-link-2", USER_CONFIG.linkedin);
    setSafeLink("kaggle-link", USER_CONFIG.kaggle);
    setSafeLink("leetcode-link", USER_CONFIG.leetcode);

    // Render Stats (Original Animated Numbers Grid)
    const statsContainer = document.getElementById("hero-stats-container");
    if (statsContainer && Array.isArray(USER_CONFIG.stats)) {
        statsContainer.innerHTML = USER_CONFIG.stats.map(stat => `
            <div class="stat-card glass-card p-4 rounded-2xl text-center border-glow transition-all hover:-translate-y-1">
                <div class="stat-number text-2xl sm:text-3xl font-extrabold text-electric-cyan font-mono mb-1" data-target="${parseInt(stat.value, 10) || 0}">0${escapeHtml(stat.suffix || '')}</div>
                <div class="text-xs text-theme-secondary font-bold">${escapeHtml(stat.label)}</div>
            </div>
        `).join('');
    }
}

/* ==========================================================================
   3. Typing Animation
   ========================================================================== */
function initTypingEffect() {
    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    const roles = (typeof USER_CONFIG !== 'undefined' && Array.isArray(USER_CONFIG.roles)) ? USER_CONFIG.roles : [
        "Data & Pipeline Engineer",
        "DSA & Problem Solver",
        "Python & SQL Developer",
        "ETL Pipeline Designer",
        "Data Analytics & BI Developer"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typingSpeed = 65;
    const erasingSpeed = 30;
    const pauseDelay = 2200;

    function type() {
        const currentRole = roles[roleIdx] || "";

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            setTimeout(type, pauseDelay);
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(type, 300);
        } else {
            setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
        }
    }

    type();
}

/* ==========================================================================
   4. Services & Core Competencies
   ========================================================================== */
function renderServices() {
    const container = document.getElementById("services-grid");
    if (!container || typeof SERVICES_DATA === 'undefined') return;

    container.innerHTML = SERVICES_DATA.map((srv) => `
        <div class="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-600/50 group relative overflow-hidden flex flex-col justify-between">
            <div>
                <div class="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-electric-cyan text-xl mb-4 group-hover:scale-110 transition-transform flex-shrink-0">
                    <i class="${escapeHtml(srv.icon)}"></i>
                </div>
                <h3 class="text-base font-bold text-theme-primary mb-2 group-hover:text-electric-cyan transition-colors">${escapeHtml(srv.title)}</h3>
                <p class="text-xs text-theme-secondary leading-relaxed font-medium">${escapeHtml(srv.desc)}</p>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   5. Skills Matrix
   ========================================================================== */
function renderSkills() {
    if (typeof SKILLS_DATA === 'undefined') return;

    const renderSkillCategory = (elementId, skills) => {
        const el = document.getElementById(elementId);
        if (!el || !Array.isArray(skills)) return;

        el.innerHTML = skills.map(skill => `
            <div class="skill-item card-inner-box p-3 rounded-xl transition-all duration-300 hover:border-cyan-600/50">
                <div class="flex items-center justify-between mb-2">
                    <span class="flex items-center gap-2 text-xs font-bold text-theme-primary">
                        <i class="${escapeHtml(skill.icon)} text-electric-cyan text-sm"></i>
                        ${escapeHtml(skill.name)}
                    </span>
                    <span class="tag-pill text-[10px] font-mono">${escapeHtml(skill.tag)}</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-gradient-to-r from-cyan-600 to-blue-700 h-full rounded-full transition-all duration-1000" style="width: ${Math.min(100, Math.max(0, parseInt(skill.level, 10) || 0))}%"></div>
                </div>
            </div>
        `).join('');
    };

    renderSkillCategory("skills-data-analysis", SKILLS_DATA.dataAnalysis);
    renderSkillCategory("skills-data-engineering", SKILLS_DATA.dataEngineering);
    renderSkillCategory("skills-bi-visualization", SKILLS_DATA.biAndVisualization);
    renderSkillCategory("skills-languages-tools", SKILLS_DATA.languagesAndTools);
}

/* ==========================================================================
   6. Projects Rendering & Filter Logic
   ========================================================================== */
function renderProjects(filterCategory = "all") {
    const container = document.getElementById("projects-grid");
    if (!container || typeof PROJECTS_DATA === 'undefined') return;

    const safeFilter = escapeHtml(filterCategory);
    const filtered = safeFilter === "all" 
        ? PROJECTS_DATA 
        : PROJECTS_DATA.filter(p => p.category === safeFilter);

    container.innerHTML = filtered.map((project) => `
        <div class="project-card glass-card rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-600/50">
            <div>
                <!-- Project Preview Image -->
                <div class="relative overflow-hidden h-48 bg-slate-900">
                    <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" loading="lazy" referrerpolicy="no-referrer">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <span class="absolute top-3 left-3 tag-pill text-xs font-bold backdrop-blur-md">
                        ${escapeHtml(project.tagLabel)}
                    </span>
                </div>

                <!-- Project Content -->
                <div class="p-6">
                    <h3 class="text-lg font-bold text-theme-primary group-hover:text-electric-cyan transition-colors mb-2">
                        ${escapeHtml(project.title)}
                    </h3>
                    <p class="text-xs text-theme-secondary leading-relaxed mb-4 font-medium">
                        ${escapeHtml(project.shortDesc)}
                    </p>

                    <!-- Key Technical Metrics -->
                    ${Array.isArray(project.metrics) && project.metrics.length > 0 ? `
                        <div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl card-inner-box mb-4 text-center">
                            ${project.metrics.map(m => `
                                <div>
                                    <div class="text-xs font-bold text-electric-cyan font-mono truncate">${escapeHtml(m.value)}</div>
                                    <div class="text-[9px] text-theme-muted uppercase font-bold">${escapeHtml(m.label)}</div>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Tech Stack Badges -->
                    <div class="flex flex-wrap gap-1.5 mb-2">
                        ${Array.isArray(project.techStack) ? project.techStack.map(t => `<span class="tech-badge font-mono">${escapeHtml(t)}</span>`).join('') : ''}
                    </div>
                </div>
            </div>

            <!-- Project Actions Footer -->
            <div class="px-6 pb-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <button onclick="openCaseStudyModal('${escapeHtml(project.id)}')" class="text-xs font-bold text-electric-cyan hover:underline flex items-center gap-1.5 transition-colors">
                    <i class="fas fa-file-lines"></i> Case Study
                </button>
                <div class="flex items-center gap-2">
                    <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-secondary-sm text-xs font-bold" title="Open on GitHub">
                        <i class="fab fa-github mr-1"></i> Code
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll(".project-filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");
            const category = btn.getAttribute("data-category") || "all";
            renderProjects(category);
        });
    });
}

/* ==========================================================================
   7. Case Study Modal System
   ========================================================================== */
function initModalHandlers() {
    const modal = document.getElementById("case-study-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    const backdrop = document.getElementById("modal-backdrop");

    if (!modal) return;

    const closeModal = () => {
        modal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });
}

window.openCaseStudyModal = function(projectId) {
    if (typeof PROJECTS_DATA === 'undefined') return;
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project || !project.caseStudy) return;

    const modal = document.getElementById("case-study-modal");
    const content = document.getElementById("modal-body-content");
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="space-y-6">
            <!-- Header Banner -->
            <div class="relative rounded-2xl overflow-hidden h-48 bg-slate-900 border border-slate-700">
                <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" class="w-full h-full object-cover" loading="lazy" referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6">
                    <span class="tag-pill text-xs self-start mb-2 font-bold">${escapeHtml(project.tagLabel)}</span>
                    <h2 class="text-2xl font-extrabold text-white">${escapeHtml(project.title)}</h2>
                </div>
            </div>

            <!-- Overview -->
            <div>
                <h4 class="text-xs uppercase tracking-widest text-electric-cyan font-bold mb-1">Project Overview</h4>
                <p class="text-sm text-theme-secondary leading-relaxed font-medium">${escapeHtml(project.caseStudy.overview)}</p>
            </div>

            <!-- Problem & Solution Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="card-inner-box p-4 rounded-xl border border-rose-500/30">
                    <h5 class="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <i class="fas fa-triangle-exclamation"></i> Operational Challenge
                    </h5>
                    <p class="text-xs text-theme-secondary leading-relaxed font-medium">${escapeHtml(project.caseStudy.problem)}</p>
                </div>
                <div class="card-inner-box p-4 rounded-xl border border-emerald-500/30">
                    <h5 class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <i class="fas fa-lightbulb"></i> Engineered Solution
                    </h5>
                    <p class="text-xs text-theme-secondary leading-relaxed font-medium">${escapeHtml(project.caseStudy.solution)}</p>
                </div>
            </div>

            <!-- Architecture & Pipeline Stages -->
            <div class="card-inner-box p-5 rounded-xl">
                <h4 class="text-xs uppercase tracking-widest text-electric-cyan font-bold mb-3 flex items-center gap-2">
                    <i class="fas fa-network-wired"></i> Architecture &amp; Execution Stages
                </h4>
                <ul class="space-y-2 text-xs text-theme-secondary font-medium">
                    ${Array.isArray(project.caseStudy.architecture) ? project.caseStudy.architecture.map(step => `
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-electric-cyan mt-0.5 flex-shrink-0"></i>
                            <span>${escapeHtml(step)}</span>
                        </li>
                    `).join('') : ''}
                </ul>
            </div>

            <!-- Dataset & Tech Stack -->
            <div class="space-y-3">
                <div>
                    <h5 class="text-xs font-bold text-theme-primary mb-1">Data Characteristics</h5>
                    <p class="text-xs text-theme-muted font-medium">${escapeHtml(project.caseStudy.dataset)}</p>
                </div>
                <div>
                    <h5 class="text-xs font-bold text-theme-primary mb-2">Technologies &amp; Libraries</h5>
                    <div class="flex flex-wrap gap-1.5">
                        ${Array.isArray(project.techStack) ? project.techStack.map(t => `<span class="tech-badge font-mono">${escapeHtml(t)}</span>`).join('') : ''}
                    </div>
                </div>
            </div>

            <!-- Key Findings & Impact -->
            <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <h5 class="text-xs font-bold text-electric-cyan uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <i class="fas fa-square-poll-vertical"></i> Measurable Result
                </h5>
                <p class="text-xs text-theme-primary leading-relaxed font-medium">${escapeHtml(project.caseStudy.keyFindings)}</p>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-primary-sm font-bold">
                    <i class="fab fa-github mr-1.5"></i> Open Repository on GitHub
                </a>
            </div>
        </div>
    `;

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
};

/* ==========================================================================
   8. Timeline: Experience & Education
   ========================================================================= */
function renderTimeline() {
    const container = document.getElementById("timeline-container");
    if (!container || typeof TIMELINE_DATA === 'undefined') return;

    container.innerHTML = TIMELINE_DATA.map((item) => `
        <div class="timeline-item relative pl-8 pb-10 border-l-2 border-slate-300 dark:border-slate-700 last:border-l-transparent group">
            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-electric-cyan group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(2,106,167,0.4)]"></div>
            <div class="glass-card p-5 rounded-2xl transition-all duration-300 hover:border-cyan-600/40 hover:-translate-y-1">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span class="badge-cyan text-[10px] uppercase font-bold">${escapeHtml(item.badge)}</span>
                    <span class="text-xs text-theme-muted font-mono font-bold"><i class="far fa-calendar-alt mr-1"></i>${escapeHtml(item.period)}</span>
                </div>
                <h3 class="text-base font-bold text-theme-primary">${escapeHtml(item.title)}</h3>
                <h4 class="text-xs text-electric-cyan font-bold mb-3">${escapeHtml(item.subtitle)}</h4>
                <p class="text-xs text-theme-secondary leading-relaxed mb-3 font-medium">${escapeHtml(item.description)}</p>
                ${Array.isArray(item.highlights) && item.highlights.length > 0 ? `
                    <div class="space-y-1.5">
                        ${item.highlights.map(h => `
                            <div class="flex items-start gap-2 text-xs text-theme-secondary font-medium">
                                <i class="fas fa-angle-right text-electric-cyan mt-0.5 flex-shrink-0"></i>
                                <span>${escapeHtml(h)}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   9. Scroll Spy & Smooth Link Navigation (Full Inertia Preserved)
   ========================================================================== */
function initScrollSpy() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const navbar = document.getElementById("main-navbar");

    // Smooth Anchor Scroll on Click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && !targetId.includes('modal')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active-nav");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active-nav");
                    }
                });
            }
        });
    }, { passive: true });
}

/* ==========================================================================
   10. Foundation Stats Animated Counter
   ========================================================================== */
function initStatsCounter() {
    const counters = document.querySelectorAll(".stat-number");
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
                    const suffix = counter.textContent.replace(/[0-9]/g, '');
                    let count = 0;
                    const increment = Math.max(1, Math.ceil(target / 35));
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            counter.textContent = `${target}${suffix}`;
                            clearInterval(timer);
                        } else {
                            counter.textContent = `${count}${suffix}`;
                        }
                    }, 35);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsContainer = document.getElementById("hero-stats-container");
    if (statsContainer) observer.observe(statsContainer);
}

/* ==========================================================================
   11. Bot-Safe Action Triggers: Direct Email & Direct Call Functions
   ========================================================================== */
function composeEmail() {
    const email = (typeof USER_CONFIG !== 'undefined') ? USER_CONFIG.email : "alamzishan07@gmail.com";
    const subject = encodeURIComponent("Opportunity / Project Inquiry - Mohammad Zishan Alam");
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}`;
}

function directCall() {
    const phone = (typeof USER_CONFIG !== 'undefined') ? USER_CONFIG.phone : "+91 7859031586";
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    window.location.href = `tel:${cleanPhone}`;
}

function copyEmailToClipboard(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const email = (typeof USER_CONFIG !== 'undefined') ? USER_CONFIG.email : "alamzishan07@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
            showToast("Email address copied to clipboard!");
        }).catch(() => {
            showToast("Could not copy automatically.", "error");
        });
    }
}

function copyPhoneToClipboard(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const phone = (typeof USER_CONFIG !== 'undefined') ? USER_CONFIG.phone : "+91 7859031586";
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phone).then(() => {
            showToast("Phone number copied to clipboard!");
        }).catch(() => {
            showToast("Could not copy automatically.", "error");
        });
    }
}

/* ==========================================================================
   12. Contact Form & Mailto Dispatch
   ========================================================================== */
let lastFormSubmitTime = 0;

function initContactForm() {
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // 1. Anti-Spam Honeypot Trap Check
            const honeypot = document.getElementById("contact-trap");
            if (honeypot && honeypot.value !== "") {
                console.warn("Spam bot trapped.");
                return;
            }

            // 2. Client-Side Rate Limiter (Cooldown 15 seconds)
            const now = Date.now();
            if (now - lastFormSubmitTime < 15000) {
                const waitSec = Math.ceil((15000 - (now - lastFormSubmitTime)) / 1000);
                showToast(`Please wait ${waitSec}s before sending another message.`, "error");
                return;
            }

            // 3. Field Extraction & Input Sanitization
            const nameEl = document.getElementById("contact-name");
            const emailEl = document.getElementById("contact-email");
            const subjectEl = document.getElementById("contact-subject");
            const messageEl = document.getElementById("contact-message");

            const name = nameEl ? nameEl.value.trim().substring(0, 100) : '';
            const email = emailEl ? emailEl.value.trim().substring(0, 100) : '';
            const subject = subjectEl ? subjectEl.value.trim().substring(0, 150) : 'Portfolio Inquiry';
            const message = messageEl ? messageEl.value.trim().substring(0, 2500) : '';

            // 4. Validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!name || name.length < 2) {
                showToast("Please provide a valid name (at least 2 characters).", "error");
                return;
            }
            if (!email || !emailRegex.test(email)) {
                showToast("Please enter a valid email address.", "error");
                return;
            }
            if (!message || message.length < 5) {
                showToast("Please write a meaningful message (at least 5 characters).", "error");
                return;
            }

            const submitBtn = form.querySelector("button[type='submit']");
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Opening email client...`;
            }

            lastFormSubmitTime = Date.now();

            // Direct mailto dispatch to ensure 100% reliable delivery
            const recipient = (typeof USER_CONFIG !== 'undefined') ? USER_CONFIG.email : "alamzishan07@gmail.com";
            const fullSubject = `[Portfolio] ${subject} - from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(body)}`;

            setTimeout(() => {
                window.location.href = mailtoUrl;
                showToast("Email draft created! Click Send in your email app.");
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Send Message</span><i class="fas fa-paper-plane text-xs ml-2"></i>`;
                }
            }, 600);
        });
    }
}

function showToast(message, type = "success") {
    let toast = document.getElementById("custom-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "custom-toast";
        document.body.appendChild(toast);
    }

    toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold transition-all duration-300 ${
        type === "success" 
            ? "glass-card text-theme-primary border border-cyan-600 shadow-[0_0_20px_rgba(2,106,167,0.3)]" 
            : "glass-card text-rose-600 dark:text-rose-400 border border-rose-500"
    }`;
    toast.innerHTML = `
        <i class="${type === "success" ? "fas fa-check-circle text-electric-cyan text-base" : "fas fa-circle-exclamation text-rose-500 text-base"}"></i>
        <span>${escapeHtml(message)}</span>
    `;

    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-4");
        setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
    }, 3500);
}

/* ==========================================================================
   13. Mobile Menu Navigation
   ========================================================================== */
function initMobileNav() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!mobileMenuBtn || !mobileDrawer) return;

    mobileMenuBtn.addEventListener("click", () => {
        mobileDrawer.classList.toggle("hidden");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileDrawer.classList.add("hidden");
        });
    });
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
