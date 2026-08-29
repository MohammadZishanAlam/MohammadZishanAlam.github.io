/**
 * Portfolio User Configuration
 * Mohammad Zishan Alam — Aspiring Data Engineer & Problem Solver | B.Tech CSE
 */
const USER_CONFIG = {
    // Basic Details
    name: "Mohammad Zishan Alam",
    title: "Aspiring Data Engineer | CS Undergrad & Problem Solver",
    tagline: "Data Engineering · DSA & Problem Solving · Python & SQL Architecture",
    bio: "Computer Science undergraduate focused on Data Engineering, algorithmic problem solving, and building scalable data workflows. Experienced in developing modular Python applications, relational database schemas, and data processing scripts. Passionate about designing robust ETL pipelines, optimizing SQL queries, and solving complex challenges with clean, efficient code.",
    location: "Ranchi, Jharkhand, India",
    availabilityStatus: "Open to work and collaborate",
    
    // Contact & Profiles (Assembled dynamically to prevent bot scraping)
    emailUser: "alamzishan07",
    emailDomain: "gmail.com",
    get email() { return `${this.emailUser}@${this.emailDomain}`; },
    phoneCode: "+91",
    phoneNumber: "7859031586",
    get phone() { return `${this.phoneCode} ${this.phoneNumber}`; },
    
    githubUsername: "MohammadZishanAlam",
    linkedin: "https://linkedin.com/in/mohammad-zishan-alam-6ba779254",
    github: "https://github.com/MohammadZishanAlam",
    kaggle: "https://kaggle.com/",
    leetcode: "https://leetcode.com/",
    resumeUrl: "#resume-modal",

    // College / University (CGPA omitted; coursework emphasized)
    education: {
        degree: "Bachelor of Technology — Computer Science and Engineering",
        institution: "Chaibasa Engineering College, Chaibasa, Jharkhand",
        period: "2023 — Expected 2027",
        focus: "Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Object-Oriented Programming, Software Engineering"
    },

    // Core Technical Foundation Stats (No Internship in Hero)
    stats: [
        { label: "Core Focus", value: "Data Engineering" },
        { label: "Primary Languages", value: "Python & SQL" },
        { label: "Core Foundation", value: "DSA & DBMS" },
        { label: "Key Specialization", value: "ETL & Pipelines" }
    ],

    // Typing Animation Target Roles & Competencies
    roles: [
        "Aspiring Data Engineer",
        "DSA & Algorithmic Problem Solver",
        "Python & SQL Developer",
        "ETL Pipeline Designer",
        "Data Analytics & BI Developer"
    ]
};
