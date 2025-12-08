const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        shortDescription: "Full-stack e-commerce solution with modern UI",
        description: "A complete e-commerce platform built with React and Node.js. Features include user authentication, shopping cart functionality, payment processing, and an admin dashboard. The platform supports multiple payment methods and includes a comprehensive product management system.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        featuredImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
        githubUrl: "https://github.com/yourusername/ecommerce",
        liveUrl: "https://your-ecommerce-demo.com",
        category: "Web Development",
        status: "completed",
        featured: true,
        startDate: "2024-01-01",
        completionDate: "2024-03-01"
    },
    {
        id: 2,
        title: "Task Management App",
        shortDescription: "Collaborative task management with real-time updates",
        description: "A modern task management application that enables teams to collaborate effectively. Features include real-time updates via WebSockets, drag-and-drop task organization, project tracking, and notification systems. Built with React and Node.js.",
        technologies: ["React", "Socket.io", "Node.js", "PostgreSQL"],
        thumbnailUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
        featuredImageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200",
        githubUrl: "https://github.com/yourusername/taskapp",
        liveUrl: "https://your-taskapp-demo.com",
        category: "Web Development",
        status: "completed",
        featured: true,
        startDate: "2024-02-01",
        completionDate: "2024-04-01"
    },
    {
        id: 3,
        title: "Weather Mobile App",
        shortDescription: "Beautiful weather app for iOS and Android",
        description: "A cross-platform mobile application that provides accurate weather forecasts with a beautiful, intuitive interface. Features include location-based weather, interactive maps, hourly and daily forecasts, and weather alerts.",
        technologies: ["React Native", "Redux", "Weather API"],
        thumbnailUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
        featuredImageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200",
        githubUrl: "https://github.com/yourusername/weather-app",
        liveUrl: null,
        category: "Mobile Development",
        status: "completed",
        featured: false,
        startDate: "2024-03-01",
        completionDate: "2024-05-01"
    },
    {
        id: 4,
        title: "Portfolio Website",
        shortDescription: "Personal portfolio showcasing my work",
        description: "A responsive portfolio website built with React to showcase my projects and skills. Features a modern design, smooth animations, and an intuitive user interface. Fully responsive and optimized for all devices.",
        technologies: ["React", "CSS3", "JavaScript"],
        thumbnailUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
        featuredImageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200",
        githubUrl: "https://github.com/yourusername/portfolio",
        liveUrl: "https://yourportfolio.com",
        category: "Web Development",
        status: "Completed",
        featured: false,
        startDate: "2024-06-01",
        completionDate: "2024-07-01"
    },
    {
        id: 5,
        title: "Slot Machine",
        shortDescription: "University project for a classes Tangible User Interfaces and Phisycal Computing",
        description: "This project is a fully functional slot machine prototype that operates using a custom, non-monetary payment system based on 3D‑printed coins. The machine is powered by an Arduino and programmed in C++, handling everything from coin detection to reel logic, lighting effects, and win conditions. The goal was to replicate the experience of a real slot machine while ensuring it remained completely safe and non‑gambling by design.\n" +
            "\n" +
            "The interface includes LED‑based reels, a pullable lever, and a display for user feedback, creating an interactive and visually engaging experience. All physical components, including the coins, were designed and 3D‑printed as part of the project.\n" +
            "\n" +
            "I developed this project together with three classmates, collaborating on hardware assembly, code structure, and iterative testing. Through this work, we explored microcontroller programming, basic electronics, rapid prototyping, and user‑focused design. This project gave us hands‑on experience combining software, circuitry, and fabrication into a complete functional system.",
        technologies: ["Arduino Uno", "C++", "ArduinoIDE"],
        thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        featuredImageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
        githubUrl: "https://github.com/yourusername/ecommerce",
        // liveUrl: "https://your-ecommerce-demo.com",
        category: "Physical Computing",
        status: "Ongoing",
        featured: true,
        startDate: "2025-01-01",
        completionDate: ""
    },
];

export default projects;
