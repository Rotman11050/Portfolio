// Get base URL for GitHub Pages deployment
const baseUrl = import.meta.env.BASE_URL;

const projects = [
    {
        id: 1,
        title: "Portfolio Website",
        shortDescription: "Personal portfolio showcasing my projects and skills",
        description: "A responsive portfolio website built with React to showcase my projects and skills. Features a modern design, smooth animations, and an intuitive user interface.",
        technologies: ["React", "CSS3", "JavaScript"],
        thumbnailUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
        featuredImageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200",
        githubUrl: "https://github.com/Rotman11050/Portofolio",
        liveUrl: "https://rotman11050.github.io/Portfolio",
        category: "Web Development",
        status: "completed",
        featured: false,
        startDate: "2025-11-20",
        completionDate: ""
    },
    {
        id: 2,
        title: "Slot Machine",
        shortDescription: "University project for a classes Tangible User Interfaces and Phisycal Computing",
        description: "This project is a fully functional slot machine prototype that operates using a custom, non-monetary payment system based on 3D‑printed coins. The machine is powered by an Arduino and programmed in C++, handling everything from coin detection to reel logic, lighting effects, and win conditions. The goal was to replicate the experience of a real slot machine while ensuring it remained completely safe and non‑gambling by design.\n" +
            "\n" +
            "The interface includes LED‑based reels, a pullable lever, and a display for user feedback, creating an interactive and visually engaging experience. All physical components, including the coins, were designed and 3D‑printed as part of the project.\n" +
            "\n" +
            "I developed this project together with three classmates, collaborating on hardware assembly, code structure, and iterative testing. Through this work, we explored microcontroller programming, basic electronics, rapid prototyping, and user‑focused design. This project gave us hands‑on experience combining software, circuitry, and fabrication into a complete functional system.",
        technologies: ["Arduino Uno", "C++", "ArduinoIDE"],
        thumbnailUrl: `${baseUrl}SlotMachine1.jpg`,
        featuredImageUrl: `${baseUrl}SlotMachine3.jpg`,
        githubUrl: "https://github.com/yourusername/ecommerce", //TODO
        category: "Physical Computing",
        status: "in-progress",
        featured: true,
        startDate: "2025-10-23",
        completionDate: ""
    },
    {
        id: 3,
        title: "Children of Karin Aldamawiu's (Browser 2D Game)",
        shortDescription: "Browser-based 2D game built with HTML, CSS & JavaScript",
        description: "A small 2D browser game. The project includes an index.html, JS scripts, assets (spritesheets for player, enemies/NPCs), and CSS styling. " +
            "The theme is a post-apocalyptic city called \"Bilghrad\", where the player must collect a sacred relic while avoiding a gigantic tornados. The repo contains screenshots, " +
            "spritesheets, gameplay and logic implemented in JavaScript. ",
        technologies: ["JavaScript", "HTML", "CSS","Git"],
        thumbnailUrl: `${baseUrl}CCL1.1.png`,
        featuredImageUrl: `${baseUrl}CCL1.4.png`,
        githubUrl: "https://github.com/Rotman11050/CCL1",
        liveUrl: "https://cc241023-21012.php.ustp.cloud/",
        category: "Browser Game",
        status: "completed",
        featured: true,
        startDate: "2025-01-15",
        completionDate: "2025-02-02"
    },
    {
        id: 4,
        title: "Web Library - 451",
        shortDescription: "E-Library filled with classical books which are not under copy right",
        description: "Named after one of mine favourite books \"Fahrenheit 451\". Walking next to the bookstore I noticed that" +
            "shop window is full of classical books which weren't under any copy right and book stores were selling them for really big prices." +
            "In that moment I realised that I want to build library which will bring those books to people who are willing to read them but can't buy" +
            "all of them. Main motto of that project would be: Free knowledge and education to everyone!",
        technologies: ["React", "CSS3", "JavaScript","Git","Node.js","Express"],
        thumbnailUrl: `${baseUrl}Logo451.png`,
        featuredImageUrl: `${baseUrl}451.1.png`,
        githubUrl: "https://git.nwt.fhstp.ac.at/ccl/ss2025_ccl2_cc241023",
        liveUrl: "https://cc241023-10701.node.fhstp.cc/",
        category: "Web Development",
        status: "completed",
        featured: true,
        startDate: "2025-06-10",
        completionDate: "2025-07-02"
    },
    {
        id: 5,
        title: "AcraneAtlas",
        shortDescription: "Mobile helper for a game \"League of Legends\"",
        description: "Wish for this project appeared when one of my friends told me that he is still struggling with all" +
            "of those champions and abilities in game. I realised that mobile app would be really good for all begginers." +
            "Included in that I would like to pull lores of champions in my application as well",
        technologies: ["Kotlin","Android Studio","AndroidIDE","Jetpack Compose"],
        thumbnailUrl: `${baseUrl}lol.jpg`,
        featuredImageUrl: `${baseUrl}league-of-legends.webp`,
        category: "Mobile Development",
        status: "in-progress",
        featured: false,
        startDate: "2025-12-01",
        completionDate: ""
    },
    // {
    //     id: 6,
    //     title: "TraficSpeaker",
    //     shortDescription: "Old traffic light repurposed for more fun time",
    //     description: "Used the body of old traffic light for body of an speaker. Pretty tough project since vast majority" +
    //         "of parts that were used were recycled parts from an old PC.",
    //     technologies: ["Arduino Uno", "C++", "ArduinoIDE"],
    //     thumbnailUrl: "/lol.jpg",
    //     featuredImageUrl: "/league-of-legends.webp",
    //     githubUrl: "https://git.nwt.fhstp.ac.at/ccl/ss2025_ccl2_cc241023",
    //     liveUrl: "https://cc241023-10701.node.fhstp.cc/",
    //     category: "Physical Computing",
    //     status: "Ongoing",
    //     featured: false,
    //     startDate: "2024-09-01",
    //     completionDate: "2025-07-01"
    // }

];

export default projects;
