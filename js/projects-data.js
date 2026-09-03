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
        shortDesc: "A zero-dependency Python script built during my MECON internship that reads 100K+ transaction rows from Excel/CSV exports, verifies debits against credits, and cuts verification time by 95%.",
        featured: true,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Pandas", "ETL Architecture", "Data Cleaning", "Automation"],
        metrics: [
            { label: "Batch Parsing", value: "~6,700 rows/s" },
            { label: "Architecture", value: "Zero External Dep" },
            { label: "Work", value: "Internship Task" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        caseStudy: {
            overview: "Built during my internship at MECON Limited to replace hours of manual ledger auditing. It parses multi-column Excel and CSV files, standardizes messy dates and currency strings, and flags mismatched accounts.",
            problem: "Staff spent several hours every week manually cross-checking transaction ledgers across multiple spreadsheet exports, which was slow and prone to copy-paste errors.",
            solution: "Wrote a standalone Python script using Pandas vectorization to parse batches at ~6,700 rows per second, check debit/credit balance totals, and export clean summary tables.",
            dataset: "Multi-column transactional ledgers, vendor invoice batches, and departmental account balances.",
            architecture: [
                "1. Ingestion: Reads raw multi-format CSV and Excel files into unified memory structures",
                "2. Cleaning: Strips formatting artifacts, standardizes date formats, and handles null values",
                "3. Reconciliation: Cross-references debit/credit columns and flags discrepancies",
                "4. Export: Generates clean, audit-ready summary tables automatically"
            ],
            keyFindings: "Reduced a multi-hour manual verification task to under 15 seconds for batches of 100,000+ records."
        }
    },
    {
        id: "timesheet-application",
        title: "Employee Timesheet Compliance Application",
        category: "engineering",
        tagLabel: "Streamlit App · Internal Tool",
        shortDesc: "An internal Streamlit application with an SQLite backend to audit 9,000+ employee timesheets across departments, featuring separate views for Admins and Reviewers.",
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
            overview: "An internal tool developed during my MECON internship to track weekly timesheet submissions and flag missing or irregular work logs across departments.",
            problem: "Department supervisors tracked attendance and hours on separate spreadsheets, making it difficult to spot missing submissions or overtime discrepancies.",
            solution: "Created an interactive Streamlit tool backed by SQLite with role-based logins so Admins can inspect company-wide compliance and Reviewers can check departmental entries.",
            dataset: "Employee attendance records, shift schedules, and department submission status tables.",
            architecture: [
                "1. Database Layer: Normalized SQLite tables for users, roles, and timesheet entries",
                "2. Authentication: Role-based interface filtering (Admin vs. Reviewer views)",
                "3. Validation Engine: Automated logic detecting duplicate, missing, or irregular hours",
                "4. Visual Reporting: Interactive charts displaying department compliance metrics"
            ],
            keyFindings: "Audited 9,000+ timesheet entries with automated detection of missing shift logs and duplicate records."
        }
    },
    {
        id: "video-game-sales",
        title: "Video Game Global Sales Analysis",
        category: "analytics",
        tagLabel: "EDA · Market Analysis",
        shortDesc: "Exploratory analysis of 5,000+ gaming sales records using Pandas and Seaborn, applying 95th-percentile Winsorization to handle blockbuster revenue skew.",
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
            overview: "An exploratory analysis comparing regional video game sales across North America, Europe, and Japan across different genres and release years.",
            problem: "A small number of blockbuster titles had disproportionately high sales, skewing averages and making standard regional comparisons unrepresentative.",
            solution: "Applied 95th-percentile Winsorization to cap extreme values, then generated Seaborn charts to compare sales distributions by genre and platform.",
            dataset: "Kaggle video game sales dataset comprising genre, platform, publisher, and regional revenue metrics.",
            architecture: [
                "1. Data Cleaning: Addressed missing publisher metadata and standardized numeric types",
                "2. Outlier Management: Applied statistical Winsorization to stabilize variance",
                "3. Regional Breakdown: Compared market preferences across North America, EU, and Japan",
                "4. Visualization: Created publication-quality Seaborn distribution charts"
            ],
            keyFindings: "Identified clear regional divergence: RPGs held the highest market share in Japan, whereas Action and Shooter titles led sales in North America."
        }
    },
    {
        id: "car-sales-prediction",
        title: "Car Sales Prediction & Market Entry (Capstone)",
        category: "ml",
        tagLabel: "Machine Learning · Capstone",
        shortDesc: "Machine learning capstone project using a Random Forest classifier to predict vehicle purchase likelihood based on buyer age, income, and commute habits.",
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
            overview: "A capstone project analyzing consumer demographic data from India and Japan to identify which customer segments are most likely to purchase a newly launched vehicle.",
            problem: "Planning vehicle launches without demographic purchase modeling led to poorly targeted campaigns and mismatched price positioning.",
            solution: "Prepared features (encoding, scaling), tuned Random Forest decision trees in Scikit-learn, and evaluated model precision and recall across demographic segments.",
            dataset: "Consumer demographic surveys, household income data, and vehicle ownership trends.",
            architecture: [
                "1. Data Preparation: Categorical encoding, feature scaling, and correlation analysis",
                "2. Model Training: Hyperparameter tuning of Random Forest decision trees",
                "3. Feature Importance: Identified top predictors including income brackets and commute patterns",
                "4. Segment Projection: Quantified prospective high-conversion target segments"
            ],
            keyFindings: "Found that middle-to-high income urban commuters showed 3.4x higher purchase intent than non-commuter groups."
        }
    },
    {
        id: "gymbot-streamlit",
        title: "Gym-Bot: Fitness Planner",
        category: "ml",
        tagLabel: "Streamlit App · Personal Project",
        shortDesc: "A Python and Streamlit web app that calculates daily caloric targets (BMR/TDEE) and generates structured weekly workout splits based on user goals.",
        featured: false,
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Streamlit", "Data Processing", "UI Design"],
        metrics: [
            { label: "Framework", value: "Streamlit" },
            { label: "Interface", value: "Interactive" },
            { label: "Domain", value: "Health & Fitness" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/gymbot-streamlit",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/gymbot-streamlit",
        caseStudy: {
            overview: "A fitness planning assistant built with Python and Streamlit to give users structured exercise schedules and calculated nutrition targets.",
            problem: "Individuals often struggle with generic workout plans that don't adjust caloric targets and training splits to their body weight and experience level.",
            solution: "Designed an interactive Streamlit application that calculates BMR and daily caloric needs, suggesting targeted weekly workout splits.",
            dataset: "Workout taxonomy, caloric expenditure estimates, and exercise difficulty tables.",
            architecture: [
                "1. User Profiling: Interactive input collection for age, weight, activity level, and target goals",
                "2. Calculation Engine: Formulated BMR, TDEE, and macronutrient distribution models",
                "3. Plan Generator: Dynamic weekly training schedules tailored for strength, hypertrophy, or endurance",
                "4. Interactive UI: Responsive Streamlit components with instant feedback"
            ],
            keyFindings: "Built a functional, interactive calculator that adjusts training splits and macronutrient targets dynamically based on user experience level."
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
        description: "Worked under senior mentors to automate repetitive spreadsheet reconciliation and build an internal timesheet auditing tool.",
        badge: "Industry Internship",
        highlights: [
            "Wrote Python and Pandas scripts that processed 100K+ transaction rows from Excel and CSV exports at ~6,700 rows/s.",
            "Built an internal Streamlit application backed by SQLite to audit 9,000+ timesheets with Admin and Reviewer permission views.",
            "Added automated data validation rules to flag missing shift hours, duplicate entries, and debit/credit ledger discrepancies."
        ]
    },
    {
        type: "education",
        title: "Bachelor of Technology — Computer Science & Engineering",
        subtitle: "Chaibasa Engineering College, Chaibasa, Jharkhand",
        period: "2023 — Expected 2027",
        description: "Undergraduate in Computer Science & Engineering (2023–2027) focusing on core CS fundamentals and data tools.",
        badge: "Undergraduate Degree",
        highlights: [
            "Practicing Data Structures & Algorithms (arrays, trees, graphs) in Python and C++",
            "Studying DBMS, writing SQL queries, and designing normalized relational schemas in SQLite and MySQL"
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
        title: "ETL & Data Ingestion",
        desc: "Writing Python and Pandas scripts to read, clean, and cross-reference multi-column CSV and Excel files."
    },
    {
        icon: "fas fa-brain",
        title: "DSA & Problem Solving",
        desc: "Practicing algorithmic problem solving in Python and C++ with attention to time complexity and edge cases."
    },
    {
        icon: "fas fa-chart-pie",
        title: "Streamlit Dashboards",
        desc: "Creating internal browser tools with SQLite backends, role-based filters (Admin/Reviewer), and summary charts."
    },
    {
        icon: "fas fa-shield-halved",
        title: "Data Validation & Auditing",
        desc: "Writing automated checks to catch missing values, duplicate entries, and mismatched records before reports are generated."
    }
];
