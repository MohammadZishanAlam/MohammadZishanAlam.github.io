/**
 * Portfolio Projects, Skills & Timeline Data
 * Mohammad Zishan Alam — Aspiring Data Engineer & Problem Solver
 */

const PROJECTS_DATA = [
    {
        id: "sap-analysis-tool",
        title: "Enterprise SAP Analysis & ETL Tool",
        category: "engineering",
        tagLabel: "Data Engineering · Automation",
        shortDesc: "Standalone Python ETL tool developed during internship to automate the ingestion, validation, and reconciliation of batch operational records from Excel/CSV exports.",
        featured: true,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Pandas", "ETL Architecture", "Data Cleaning", "Automation"],
        metrics: [
            { label: "Batch Parsing", value: "High-Speed" },
            { label: "Architecture", value: "Zero External Dep" },
            { label: "Work", value: "Internship Task" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        caseStudy: {
            overview: "Developed under mentor guidance at MECON Limited to eliminate repetitive manual spreadsheet auditing. Automatically parses, standardizes, and reconciles large tabular transaction exports.",
            problem: "Finance and operational teams spent hours manually cross-checking large spreadsheet exports, leading to operational delays and potential data-entry discrepancies.",
            solution: "Engineered a standalone Python script utilizing optimized Pandas vectorization to automate data ingestion, normalize mismatched date/currency formats, and flag transaction anomalies.",
            dataset: "Multi-column transactional ledgers, vendor invoice batches, and departmental account balances.",
            architecture: [
                "1. Ingestion: Reads raw multi-format CSV and Excel files into unified memory structures",
                "2. Cleaning: Strips formatting artifacts, standardizes date formats, and handles null values",
                "3. Reconciliation: Cross-references debit/credit columns and flags discrepancies",
                "4. Export: Generates clean, audit-ready summary tables automatically"
            ],
            keyFindings: "Successfully automated a previously manual multi-hour cross-checking process into an automated workflow completing in seconds."
        }
    },
    {
        id: "timesheet-application",
        title: "Employee Timesheet Compliance Application",
        category: "engineering",
        tagLabel: "Streamlit App · Internal Tool",
        shortDesc: "Interactive timesheet monitoring dashboard built with Streamlit and SQLite, featuring role-based views (Admin/Reviewer) and automated anomaly detection.",
        featured: true,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Streamlit", "SQLite", "Data Validation", "RBAC Views"],
        metrics: [
            { label: "Database", value: "SQLite" },
            { label: "Access", value: "Role Views" },
            { label: "Domain", value: "HR Compliance" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/TimeSheet-Application",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/TimeSheet-Application",
        caseStudy: {
            overview: "An internal compliance application built during the MECON internship to track and audit timesheet submissions across multiple departments.",
            problem: "Tracking employee attendance and overtime compliance across departments required manual consolidation from disconnected logs.",
            solution: "Built a Streamlit dashboard powered by an SQLite backend with role-based filtering, allowing reviewers and administrators to monitor submission compliance and detect missing logs.",
            dataset: "Employee attendance records, shift schedules, and department submission status tables.",
            architecture: [
                "1. Database Layer: Normalized SQLite tables for users, roles, and timesheet entries",
                "2. Authentication: Role-based interface filtering (Admin vs. Reviewer views)",
                "3. Validation Engine: Automated logic detecting duplicate, missing, or irregular hours",
                "4. Visual Reporting: Interactive charts displaying department compliance metrics"
            ],
            keyFindings: "Simplified weekly audit workflows by giving reviewers an instant visual breakdown of departmental submission compliance."
        }
    },
    {
        id: "video-game-sales",
        title: "Video Game Global Sales Analysis",
        category: "analytics",
        tagLabel: "EDA · Market Analysis",
        shortDesc: "End-to-end data analytics project examining 5,000+ gaming title sales records with outlier treatment via 95th-percentile Winsorization and visual market segmentation.",
        featured: false,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Statistical Analysis"],
        metrics: [
            { label: "Records", value: "5,000+" },
            { label: "Treatment", value: "Winsorization" },
            { label: "Focus", value: "EDA & BI" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/Video-game-sales-analysis",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/Video-game-sales-analysis",
        caseStudy: {
            overview: "A comprehensive Exploratory Data Analysis project uncovering regional consumer purchasing patterns across North America, Europe, Japan, and other global markets.",
            problem: "Raw sales data contained significant extreme skew from a handful of mega-blockbusters that distorted baseline regional trends.",
            solution: "Implemented 95th-percentile Winsorization to cap extreme outliers and performed regional correlation analysis across genres, platforms, and release eras.",
            dataset: "Kaggle video game sales dataset comprising genre, platform, publisher, and regional revenue metrics.",
            architecture: [
                "1. Data Cleaning: Addressed missing publisher metadata and standardized numeric types",
                "2. Outlier Management: Applied statistical Winsorization to stabilize variance",
                "3. Regional Breakdown: Compared market preferences across North America, EU, and Japan",
                "4. Visualization: Created publication-quality Seaborn distribution charts"
            ],
            keyFindings: "Highlighted significant divergence in regional genre preferences (e.g., RPG dominance in Japan vs. Action/Shooter lead in North America)."
        }
    },
    {
        id: "car-sales-prediction",
        title: "Car Sales Prediction & Market Entry (Capstone)",
        category: "ml",
        tagLabel: "Machine Learning · Capstone",
        shortDesc: "Applied machine learning capstone project predicting automotive purchasing intent using Random Forest classification based on consumer demographics and income factors.",
        featured: false,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Scikit-Learn", "Random Forest", "Feature Engineering"],
        metrics: [
            { label: "Model", value: "Random Forest" },
            { label: "Dataset", value: "Demographics" },
            { label: "Outcome", value: "Segmentation" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/car-sales-prediction-capstone-project",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/car-sales-prediction-capstone-project",
        caseStudy: {
            overview: "A machine learning capstone project analyzing automotive market datasets across India and Japan to evaluate customer purchase propensity for targeted vehicle launches.",
            problem: "Evaluating market entry opportunities required data-driven customer segmentation rather than broad assumptions about purchasing ability.",
            solution: "Trained and evaluated a Random Forest classifier in Scikit-Learn to estimate purchase propensity using factors such as age, income brackets, urban location, and commute habits.",
            dataset: "Consumer demographic surveys, household income data, and vehicle ownership trends.",
            architecture: [
                "1. Data Preparation: Categorical encoding, feature scaling, and correlation analysis",
                "2. Model Training: Hyperparameter tuning of Random Forest decision trees",
                "3. Feature Importance: Identified top predictors including income brackets and commute patterns",
                "4. Segment Projection: Quantified prospective high-conversion target segments"
            ],
            keyFindings: "Identified high-conversion urban demographic segments with 3.4x higher purchase intent, providing actionable targeting criteria."
        }
    },
    {
        id: "gymbot-streamlit",
        title: "Gym-Bot: AI Fitness Assistant",
        category: "ml",
        tagLabel: "Streamlit App · Personal Project",
        shortDesc: "Interactive fitness recommendation application built with Python and Streamlit, providing customized workout plans and nutritional insights.",
        featured: false,
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Streamlit", "Data Processing", "UI Design"],
        metrics: [
            { label: "Framework", value: "Streamlit" },
            { label: "Interface", value: "Interactive" },
            { label: "Domain", value: "Health & AI" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/gymbot-streamlit",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/gymbot-streamlit",
        caseStudy: {
            overview: "A dynamic fitness planning and workout tracking assistant built with Python and Streamlit to give users customized exercise schedules and nutrition insights.",
            problem: "Individuals often struggle with generic workout plans that don't tailor exercises and nutrition targets to their personal experience level and physical goals.",
            solution: "Designed an interactive Streamlit application that calculates caloric targets, suggests structured training splits, and provides real-time guidance.",
            dataset: "Workout taxonomy, caloric expenditure estimates, and exercise difficulty tables.",
            architecture: [
                "1. User Profiling: Interactive input collection for age, weight, activity level, and target goals",
                "2. Calculation Engine: Formulated BMR, TDEE, and macronutrient distribution models",
                "3. Plan Generator: Dynamic weekly training schedules tailored for strength, hypertrophy, or endurance",
                "4. Interactive UI: Responsive Streamlit components with instant feedback"
            ],
            keyFindings: "Delivered a lightweight, responsive application demonstrating rapid frontend delivery with Streamlit and clean Python logic."
        }
    }
];

// Skills Matrix
const SKILLS_DATA = {
    dataAnalysis: [
        { name: "Exploratory Data Analysis (EDA)", level: 95, icon: "fas fa-magnifying-glass-chart", tag: "Core" },
        { name: "Statistical & Predictive Modeling", level: 88, icon: "fas fa-chart-line", tag: "Modeling" },
        { name: "Random Forest Classification", level: 85, icon: "fas fa-tree", tag: "ML" },
        { name: "Data Cleaning & Wrangling", level: 95, icon: "fas fa-broom", tag: "Data" },
        { name: "Outlier Analysis & Winsorization", level: 90, icon: "fas fa-filter-circle-xmark", tag: "Stats" },
        { name: "Data Validation & Quality Checks", level: 92, icon: "fas fa-circle-check", tag: "Quality" }
    ],
    dataEngineering: [
        { name: "ETL Pipeline Design", level: 92, icon: "fas fa-network-wired", tag: "Core ETL" },
        { name: "SQL Query Optimization", level: 90, icon: "fas fa-database", tag: "SQL" },
        { name: "Relational Schema Design", level: 88, icon: "fas fa-table", tag: "RDBMS" },
        { name: "Batch Data Processing", level: 92, icon: "fas fa-gears", tag: "Batch" },
        { name: "Data Transformation & Parsing", level: 94, icon: "fas fa-shuffle", tag: "Pandas" },
        { name: "SQLite & Relational Databases", level: 90, icon: "fas fa-server", tag: "Database" }
    ],
    biAndVisualization: [
        { name: "Streamlit Application Development", level: 94, icon: "fas fa-laptop-code", tag: "Frontend" },
        { name: "Matplotlib & Seaborn", level: 92, icon: "fas fa-chart-area", tag: "Charts" },
        { name: "Plotly Interactive Dashboards", level: 88, icon: "fas fa-chart-column", tag: "Plotly" },
        { name: "Role-Based UI Filtering", level: 88, icon: "fas fa-user-shield", tag: "UI Flow" },
        { name: "Executive PDF & Table Reports", level: 90, icon: "fas fa-file-pdf", tag: "Reports" },
        { name: "Interactive Data Visualizations", level: 90, icon: "fas fa-chart-pie", tag: "Visuals" }
    ],
    languagesAndTools: [
        { name: "Python (Pandas, NumPy, Scikit-learn)", level: 95, icon: "fab fa-python", tag: "Primary" },
        { name: "Data Structures & Algorithms (DSA)", level: 88, icon: "fas fa-brain", tag: "DSA" },
        { name: "SQL & Relational Databases", level: 92, icon: "fas fa-database", tag: "Query" },
        { name: "C / C++ (Core Programming)", level: 85, icon: "fas fa-code", tag: "Systems" },
        { name: "Git & Version Control", level: 90, icon: "fab fa-git-alt", tag: "Version Control" },
        { name: "VS Code & Jupyter Notebooks", level: 94, icon: "fas fa-terminal", tag: "IDE" }
    ]
};

// Timeline Data (Honest, Defendable, and CGPA-Free)
const TIMELINE_DATA = [
    {
        type: "experience",
        title: "Software & Data Automation Intern",
        subtitle: "MECON Limited, Ranchi (Govt. of India Enterprise)",
        period: "April 2026 – May 2026",
        description: "Under the guidance of senior engineering mentors, analyzed operational bottlenecks and developed Python automation tools to replace repetitive manual spreadsheet reconciliation and timesheet tracking.",
        badge: "Industry Internship",
        highlights: [
            "Developed Python and Pandas batch parsing scripts to automate cross-checking of Excel/CSV operational records.",
            "Built an internal Streamlit dashboard for timesheet compliance auditing with multi-role views (Admin/Reviewer).",
            "Automated recurring data validation workflows, significantly reducing manual data-entry errors for internal operations."
        ]
    },
    {
        type: "education",
        title: "Bachelor of Technology — Computer Science & Engineering",
        subtitle: "Chaibasa Engineering College, Chaibasa, Jharkhand",
        period: "2023 — Expected 2027",
        description: "Pursuing B.Tech in CSE with strong focus on Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Programming.",
        badge: "Undergraduate Degree",
        highlights: [
            "Actively solving algorithmic and data structure problems in Python and C++",
            "Focused on relational database design, query optimization, and scalable data workflows"
        ]
    },
    {
        type: "leadership",
        title: "Lead Coordinator & Convenor",
        subtitle: "College Tech Fest (Navkriti)",
        period: "Campus Leadership",
        description: "Led planning, promotion, and event management for Navkriti, coordinating 5+ competitive events and student committees across engineering departments.",
        badge: "Leadership & Management",
        highlights: [
            "Managed scheduling, promotion, and student volunteer teams for multi-day events",
            "Fostered strong technical engagement and participation across engineering branches"
        ]
    },
    {
        type: "leadership",
        title: "Aspire Leaders Program Graduate",
        subtitle: "Aspire Institute (Founded at Harvard University)",
        period: "9-Week Global Leadership Curriculum",
        description: "Completed a 9-week leadership development program focused on ethical leadership, cross-cultural communication, and practical team execution.",
        badge: "Global Leadership",
        highlights: [
            "Collaborated with an international cohort of young leaders on social impact and leadership projects"
        ]
    },
    {
        type: "leadership",
        title: "Technical Mentor & Workshop Facilitator",
        subtitle: "Techspire Tech Club",
        period: "Peer Mentorship",
        description: "Facilitated technical workshops and hands-on coding sessions on Python, Pandas, and basic machine learning workflows for over 20 students.",
        badge: "Community",
        highlights: [
            "Organized interactive sessions on data cleaning, exploratory analysis, and building simple dashboards"
        ]
    }
];

// Services / Value Proposition Data
const SERVICES_DATA = [
    {
        icon: "fas fa-network-wired",
        title: "ETL & Pipeline Engineering",
        desc: "Designing clean, reliable data pipelines that ingest, parse, and validate batch operational data without unnecessary dependencies."
    },
    {
        icon: "fas fa-brain",
        title: "DSA & Problem Solving",
        desc: "Applying strong algorithmic foundations in data structures, time complexity analysis, and modular coding to solve computational challenges."
    },
    {
        icon: "fas fa-chart-pie",
        title: "Interactive Dashboards & BI",
        desc: "Building clean Streamlit and Plotly dashboards with role-based filtering, turning raw database records into clear, actionable business metrics."
    },
    {
        icon: "fas fa-shield-halved",
        title: "Data Quality & Automation",
        desc: "Developing automated validation rules, anomaly detection, and data reconciliation scripts to keep operational datasets clean and audit-ready."
    }
];
