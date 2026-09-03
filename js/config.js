/**
 * Portfolio User Configuration
 * Mohammad Zishan Alam — Aspiring Data Engineer & Problem Solver | B.Tech CSE
 */
const USER_CONFIG = {
    // Basic Details
    name: "Mohammad Zishan Alam",
    title: "Data & Pipeline Engineer | CS Undergrad",
    tagline: "Data Pipelines · Python & SQL · Data Structures & Algorithms",
    bio: "Computer Science undergraduate at Chaibasa Engineering College building ETL scripts, internal dashboards, and data validation tools. I write Python and SQL to automate repetitive data tasks, parse multi-format spreadsheets, and practice algorithmic problem solving in Python and C++.",
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

    // Key Production & Performance Metrics (Original Animated Numbers Grid)
    stats: [
        { label: "ETL Processing Speed", value: 6700, suffix: " rows/s" },
        { label: "SAP Records Processed", value: 100, suffix: "K+" },
        { label: "Timesheets Audited", value: 9, suffix: "K+" },
        { label: "Report Time Reduced", value: 95, suffix: "%" }
    ],

    // Typing Animation Target Roles & Competencies
    roles: [
        "Data & Pipeline Engineer",
        "DSA & Problem Solver",
        "Python & SQL Developer",
        "ETL Pipeline Designer",
        "Data Analytics & BI Developer"
    ]
};
