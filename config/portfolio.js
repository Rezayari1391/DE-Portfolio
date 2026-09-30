/**
 * DevPortfolio Configuration
 * Customize all personal information, social links, skills, projects, and Web3Forms key here.
 */

const portfolioConfig = {
    // --- Personal Information ---
    name: "Pouria",
    role: "Web Developer • Programmer • Game Developer",
    bio: "Passionate developer crafting high-performance web applications, efficient backend solutions, and interactive games.",
    about: [
        "Hello! I'm Pouria, a dedicated software developer passionate about building lightweight, scalable, and visually compelling applications.",
        "My expertise spans modern web development, lower-level system architecture, Python execution environments, and game engine logic. I enjoy solving complex technical problems and contributing to open-source software."
    ],
    avatarUrl: "assets/images/placeholder.svg",

    // --- Contact & Social Links ---
    email: "contact@example.com",
    location: "United States",
    githubUsername: "pouriadev",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",

    // --- Web3Forms API Access Key ---
    // Get your key for free at https://web3forms.com/
    web3formsAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE",

    // --- Statistics ---
    stats: [
        { label: "Projects Completed", value: "15+" },
        { label: "Technologies Mastered", value: "10+" },
        { label: "Years Experience", value: "3+" }
    ],

    // --- Skills & Technologies ---
    skills: [
        {
            name: "JavaScript",
            category: "Web Development",
            icon: "fa-brands fa-js",
            description: "ES6+, Vanilla JS, Async/Await, DOM manipulation, and modern web APIs."
        },
        {
            name: "HTML5 & CSS3",
            category: "Web Development",
            icon: "fa-brands fa-html5",
            description: "Semantic structures, Flexbox/Grid layouts, custom CSS animations, and glassmorphism."
        },
        {
            name: "Python",
            category: "Programming",
            icon: "fa-brands fa-python",
            description: "Scripting, backend automation, CPython mechanics, and data processing."
        },
        {
            name: "C / C++",
            category: "Systems & Low Level",
            icon: "fa-solid fa-code",
            description: "Memory management, performance-critical code, and interpreter design."
        },
        {
            name: "C#",
            category: "Game Dev & General",
            icon: "fa-solid fa-hashtag",
            description: "Object-oriented software design, Unity game logic, and .NET ecosystem."
        },
        {
            name: "Unity",
            category: "Game Development",
            icon: "fa-solid fa-gamepad",
            description: "3D graphics, character controllers, physics pipelines, and gameplay mechanics."
        },
        {
            name: "Git & GitHub",
            category: "Tools & DevOps",
            icon: "fa-brands fa-github",
            description: "Version control, branching workflows, pull requests, and CI/CD pipelines."
        },
        {
            name: "Linux",
            category: "Environments",
            icon: "fa-brands fa-linux",
            description: "Shell scripting, server environment deployment, and system configuration."
        }
    ],

    // --- Projects ---
    projects: [
        {
            title: "3D Survival Shooter",
            category: "Game Development",
            description: "An action-packed 3D shooter and survival game featuring dynamic mechanics, particle systems, and customizable shaders.",
            technologies: ["C#", "Unity", "Shaders"],
            image: "assets/images/placeholder.webp",
            github: "https://github.com",
            demo: "#"
        },
        {
            title: "Mini Python Interpreter",
            category: "Programming",
            description: "A lightweight implementation exploring CPython execution architecture and compact code golfing structures.",
            technologies: ["C", "Python", "CPython"],
            image: "assets/images/placeholder.webp",
            github: "https://github.com",
            demo: "#"
        },
        {
            title: "DevPortfolio Template",
            category: "Web",
            description: "A modern, dependency-free developer portfolio template built with pure HTML5, CSS3, and Vanilla JS.",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            image: "assets/images/placeholder.webp",
            github: "https://github.com",
            demo: "#"
        }
    ],

    // --- Featured GitHub Repositories ---
    repositories: [
        {
            name: "3d-shooter-survival",
            description: "Source code for 3D shooter and survival game built with Unity engine.",
            language: "C#",
            stars: 12,
            url: "https://github.com"
        },
        {
            name: "c-mini-python",
            description: "A compact C implementation exploring Python core execution mechanisms.",
            language: "C",
            stars: 8,
            url: "https://github.com"
        },
        {
            name: "DevPortfolio",
            description: "Open-source developer portfolio template with config-driven structure.",
            language: "JavaScript",
            stars: 25,
            url: "https://github.com"
        }
    ]
};