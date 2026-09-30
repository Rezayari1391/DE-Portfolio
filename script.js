/**
 * DevPortfolio - Core Application Script
 * Config-driven initialization, UI interactions, filtering, animations, and Web3Forms handling.
 */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadConfigData();
    setupThemeToggle();
    setupMobileMenu();
    setupProjectFilters();
    setupContactForm();
    setupScrollReveal();
    setupNavigationHighlight();
    hideLoader();
}

/* --- Loader Management --- */
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300);
    }
}

/* --- Populate UI from Config File --- */
function loadConfigData() {
    if (typeof portfolioConfig === 'undefined') return;

    // Hero Section
    document.getElementById('hero-name').textContent = portfolioConfig.name || "Developer Name";
    document.getElementById('hero-role').textContent = portfolioConfig.role || "Software Developer";
    document.getElementById('hero-bio').textContent = portfolioConfig.bio || "";
    document.getElementById('hero-github-btn').href = portfolioConfig.githubUrl || "#";

    // About Section
    const avatar = document.getElementById('about-avatar');
    if (avatar && portfolioConfig.avatarUrl) avatar.src = portfolioConfig.avatarUrl;

    const aboutTextContainer = document.getElementById('about-text');
    if (aboutTextContainer && portfolioConfig.about) {
        aboutTextContainer.innerHTML = portfolioConfig.about
            .map(p => `<p>${p}</p>`)
            .join('');
    }

    // Stats
    const statsGrid = document.getElementById('stats-grid');
    if (statsGrid && portfolioConfig.stats) {
        statsGrid.innerHTML = portfolioConfig.stats.map(stat => `
            <div class="stat-card">
                <div class="stat-number">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    // Skills
    renderSkills(portfolioConfig.skills || []);

    // Projects
    renderProjects(portfolioConfig.projects || []);

    // GitHub Showcase
    document.getElementById('github-profile-link').href = portfolioConfig.githubUrl || "#";
    renderRepositories(portfolioConfig.repositories || []);

    // Contact Details
    const emailEl = document.getElementById('contact-email');
    if (emailEl) {
        emailEl.href = `mailto:${portfolioConfig.email}`;
        emailEl.textContent = portfolioConfig.email;
    }
    document.getElementById('contact-location').textContent = portfolioConfig.location || "Remote";

    // Social Links
    renderSocialLinks();

    // Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('footer-name').textContent = portfolioConfig.name;
}

/* --- Render Skills --- */
function renderSkills(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card reveal">
            <i class="${skill.icon} skill-icon"></i>
            <span class="skill-category">${skill.category}</span>
            <h3 class="skill-title">${skill.name}</h3>
            <p class="skill-desc">${skill.description}</p>
        </div>
    `).join('');
}

/* --- Render Projects & Dynamic Filters --- */
function renderProjects(projects, filterCategory = 'All') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const filteredProjects = filterCategory === 'All' 
        ? projects 
        : projects.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));

    projectsGrid.innerHTML = filteredProjects.map(project => `
        <article class="project-card reveal">
            <div class="project-image-wrapper">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-techs">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fa-brands fa-github"></i> Code
                    </a>
                    <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                    </a>
                </div>
            </div>
        </article>
    `).join('');
}

function setupProjectFilters() {
    const filtersContainer = document.getElementById('project-filters');
    if (!filtersContainer || !portfolioConfig.projects) return;

    const categories = ['All', ...new Set(portfolioConfig.projects.map(p => p.category))];

    filtersContainer.innerHTML = categories.map((cat, idx) => `
        <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-category="${cat}">
            ${cat}
        </button>
    `).join('');

    filtersContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');
        renderProjects(portfolioConfig.projects, category);
        setupScrollReveal(); // Re-trigger reveal animations for new items
    });
}

/* --- Render Repositories --- */
function renderRepositories(repos) {
    const reposGrid = document.getElementById('repos-grid');
    if (!reposGrid) return;

    reposGrid.innerHTML = repos.map(repo => `
        <div class="repo-card reveal">
            <div class="repo-header">
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-name">${repo.name}</a>
                <i class="fa-solid fa-code-fork" style="color: var(--text-muted)"></i>
            </div>
            <p class="repo-desc">${repo.description}</p>
            <div class="repo-meta">
                <span><i class="fa-solid fa-circle" style="color: var(--accent); font-size: 0.6rem;"></i> ${repo.language}</span>
                <span><i class="fa-solid fa-star"></i> ${repo.stars}</span>
            </div>
        </div>
    `).join('');
}

/* --- Social Links Generator --- */
function renderSocialLinks() {
    const containers = [document.getElementById('social-links'), document.getElementById('footer-socials')];
    
    const links = [
        { icon: "fa-brands fa-github", url: portfolioConfig.githubUrl, label: "GitHub" },
        { icon: "fa-brands fa-linkedin", url: portfolioConfig.linkedinUrl, label: "LinkedIn" },
        { icon: "fa-brands fa-x-twitter", url: portfolioConfig.twitterUrl, label: "Twitter" }
    ];

    containers.forEach(container => {
        if (!container) return;
        container.innerHTML = links.map(link => `
            <a href="${link.url}" class="social-btn" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
                <i class="${link.icon}"></i>
            </a>
        `).join('');
    });
}

/* --- Dark / Light Theme Toggle --- */
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    toggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

/* --- Mobile Menu Navigation --- */
function setupMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.setAttribute('aria-expanded', false);
        });
    });
}

/* --- Web3Forms Asynchronous Contact Form --- */
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form)) return;

        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';

        const formData = new FormData(form);
        formData.append('access_key', portfolioConfig.web3formsAccessKey);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                statusMsg.className = 'form-status success';
                statusMsg.textContent = 'Message sent successfully! I will get back to you soon.';
                form.reset();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            statusMsg.className = 'form-status error';
            statusMsg.textContent = 'Failed to send message. Please try again or email directly.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = 'Send Message';
        }
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        const group = input.parentElement;
        if (!input.checkValidity()) {
            group.classList.add('invalid');
            isValid = false;
        } else {
            group.classList.remove('invalid');
        }
    });

    return isValid;
}

/* --- Intersection Observer Scroll Reveal --- */
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* --- Active Link Highlight & Navbar Shadow --- */
function setupNavigationHighlight() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}