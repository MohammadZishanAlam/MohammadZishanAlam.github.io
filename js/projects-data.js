/**
 * Portfolio Projects Data & Case Studies
 * Mohammad Zishan Alam — Production-grade ETL, Analytics & ML Engineering
 * Real GitHub Repository Links
 */
const PROJECTS_DATA = [
    {
        id: "sap-analysis-tool",
        title: "Enterprise SAP Analysis & ETL Tool",
        category: "engineering", // categories: all, engineering, analytics, ml
        tagLabel: "Production ETL · MECON Limited",
        shortDesc: "Built an in-house ETL pipeline that ingests, cleans, and reconciles over 100,000 SAP records at ~6,700 rows per second, reducing daily finance report preparation from hours to under 15 seconds.",
        featured: true,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Pandas", "NumPy", "Plotly", "FPDF", "ETL Architecture"],
        metrics: [
            { label: "Throughput", value: "~6,700 rows/s" },
            { label: "Dataset Volume", value: "100,000+ rows" },
            { label: "Execution Time", value: "< 15 seconds" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        caseStudy: {
            overview: "Developed and deployed a standalone desktop ETL tool for the finance department at MECON Limited (Ranchi) to automate data extraction, quality validation, and payment reconciliation from large SAP accounting exports.",
            problem: "Finance analysts previously reconciled client payments, overdue invoices, and ledger balances by hand across large Excel spreadsheets. The manual workflow was slow, difficult to cross-verify, and took multiple hours every day.",
            solution: "Created a fast, zero-dependency Python and Pandas pipeline that parses raw SAP files, handles data type inconsistencies, runs automated validation checks, and generates visual Plotly reports alongside instant PDF summaries.",
            dataset: "Exported SAP transaction tables containing more than 100,000 client invoice and payment records.",
            architecture: [
                "1. Data Ingestion: High-speed parser supporting various SAP spreadsheet and CSV layouts without external database dependencies",
                "2. Data Cleansing: Vectorized type conversion, null-value handling, and currency formatting",
                "3. Aggregation & Reconciliation: Grouping by client account, project code, invoice aging brackets, and milestones",
                "4. Reporting Engine: Custom FPDF integration generating formatted management summaries in seconds"
            ],
            keyFindings: "Cut daily reporting time by over 95% while eliminating manual transcription errors. The tool is in active daily production use at MECON Limited."
        }
    },
    {
        id: "timesheet-compliance-dashboard",
        title: "Employee Timesheet Compliance Application",
        category: "engineering",
        tagLabel: "Data Automation · MECON Limited",
        shortDesc: "Developed an internal Streamlit application backed by SQLite to monitor 9,000+ employee timesheet records, cutting attendance anomaly detection time by 80% with role-based access control.",
        featured: true,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Streamlit", "Pandas", "SQLite", "RBAC Security"],
        metrics: [
            { label: "Records Analyzed", value: "9,000+ logs" },
            { label: "Audit Time Cut", value: "80% faster" },
            { label: "Deployment", value: "Company-Wide" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/TimeSheet-Application",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/TimeSheet-Application",
        caseStudy: {
            overview: "Created a role-secured web application for HR managers and department heads at MECON Limited to track employee timesheet submissions, identify missing hours, and generate department-level compliance reports.",
            problem: "HR teams needed an efficient way to audit monthly work logs for 9,000+ employees across multiple locations while ensuring department heads could only see records for their own staff.",
            solution: "Built a Streamlit platform connected to an optimized SQLite database with Role-Based Access Control (RBAC), automated rule-based anomaly detection, and filterable department views.",
            dataset: "Monthly timesheet logs and shift records for over 9,000 employees.",
            architecture: [
                "1. Database Ingestion: Automated monthly log loading into indexed SQLite tables",
                "2. Access Control: Role-based permissions preventing unauthorized cross-department data access",
                "3. Anomaly Engine: Logic checks for missing logs, overlapping shifts, and incomplete hours",
                "4. Reporting Dashboard: Interactive department summaries and visual compliance status indicators"
            ],
            keyFindings: "Reduced the time needed for monthly compliance reviews from several days to just a few minutes, making audit reporting seamless for HR."
        }
    },
    {
        id: "financial-analysis-tool",
        title: "Financial Analysis & Reporting Tool",
        category: "analytics",
        tagLabel: "BI & Reporting · MECON Limited",
        shortDesc: "Built an internal financial intelligence tool with interactive Plotly visualizations and automated PDF generation to assist finance teams with budget reviews and ledger analysis.",
        featured: true,
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Plotly", "Pandas", "FPDF", "Data Quality"],
        metrics: [
            { label: "Report Creation", value: "Automated" },
            { label: "Chart Views", value: "Multi-View" },
            { label: "Data Quality", value: "Validated" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/SAP-Analysis-Tool",
        caseStudy: {
            overview: "Engineered a desktop data application at MECON Limited to give finance teams an interactive visual interface for tracking ledger balances, monitoring project costs, and exporting formatted executive reports.",
            problem: "Finance officers had to manually compile ledger trends and variance figures into presentations, which made quarterly reviews slow and prone to formatting inconsistencies.",
            solution: "Developed a Python application combining Pandas data processing, interactive Plotly charts, and an automated PDF document generator using FPDF.",
            dataset: "Multi-year project ledger entries, cost allocations, and payment milestones.",
            architecture: [
                "1. Data Loading: Integrated multiple ledger sources into a clean schema",
                "2. Statistical Analysis: Automated calculation of year-over-year trends and budget variances",
                "3. Interactive Charts: Breakdown charts, waterfall cost views, and timeline graphs with Plotly",
                "4. PDF Export: Standardized, one-click PDF reports complete with summary tables and charts"
            ],
            keyFindings: "Made financial reviews significantly faster by providing clean, standardized visual reports with built-in data validation."
        }
    },
    {
        id: "video-game-market-analysis",
        title: "Video Game Sales Analysis",
        category: "analytics",
        tagLabel: "Data Cleaning & EDA · Personal Project",
        shortDesc: "Engineered a data cleaning pipeline across 5,000+ sales records—handling currency normalization, missing-value imputation, and 95th-percentile Winsorization—to analyze regional market trends.",
        featured: false,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Winsorization", "EDA"],
        metrics: [
            { label: "Records Cleaned", value: "5,000+" },
            { label: "Outlier Capping", value: "95th %ile" },
            { label: "Visualizations", value: "4 Chart Types" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/Video-game-sales-analysis",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/Video-game-sales-analysis",
        caseStudy: {
            overview: "An exploratory data analysis project examining video game sales patterns across North America, Europe, Japan, and international markets over multiple console generations.",
            problem: "Historical sales datasets had mixed currency formats, missing publisher metadata, and high-revenue outliers that skewed standard averages.",
            solution: "Built a Python cleaning pipeline using Pandas to normalize currency values, impute missing fields, and apply Winsorization at the 95th percentile, followed by Seaborn and Matplotlib visual distributions.",
            dataset: "Historical records for over 5,000 video game titles, publishers, and release platforms.",
            architecture: [
                "1. Data Cleaning: Currency harmonization, publisher normalization, and missing value handling",
                "2. Outlier Treatment: Applied 95th-percentile Winsorization to manage revenue spikes from blockbuster titles",
                "3. Market Comparison: Regional sales breakdowns (North America, Europe, Japan) by genre and platform",
                "4. Visual Reporting: Clear distribution plots, heatmaps, and trend lines"
            ],
            keyFindings: "Highlighted significant differences in genre preference across regional markets and showed how console lifecycles influence sales peaks."
        }
    },
    {
        id: "international-market-entry",
        title: "Car Sales Prediction & Market Entry Analysis",
        category: "ml",
        tagLabel: "Machine Learning · Capstone Project",
        shortDesc: "Trained a Random Forest classification model on consumer demographic and income data to identify 56,000+ prospective buyers for an international automotive market entry in India and Japan.",
        featured: false,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
        techStack: ["Python", "Scikit-Learn", "Random Forest", "Pandas", "Predictive Modeling"],
        metrics: [
            { label: "Algorithm", value: "Random Forest" },
            { label: "Target Audience", value: "56,000+ leads" },
            { label: "Domain", value: "Market Strategy" }
        ],
        githubUrl: "https://github.com/MohammadZishanAlam/car-sales-prediction-capstone-project",
        liveDemoUrl: "https://github.com/MohammadZishanAlam/car-sales-prediction-capstone-project",
        caseStudy: {
            overview: "A machine learning capstone project analyzing automotive market datasets across India and Japan to help an automotive manufacturer evaluate whether and how to enter the Indian vehicle market.",
            problem: "Entering a competitive automotive market required data-driven customer segmentation rather than broad assumptions about purchasing ability.",
            solution: "Built and evaluated a Random Forest classifier in Scikit-Learn to estimate purchase propensity using factors such as age, income brackets, urban location, and commute habits.",
            dataset: "Consumer demographic surveys, household income data, and vehicle ownership trends.",
            architecture: [
                "1. Data Preparation: Categorical encoding, feature scaling, and correlation analysis",
                "2. Model Training: Hyperparameter tuning of Random Forest decision trees",
                "3. Feature Importance: Identified top predictors including income brackets and commute patterns",
                "4. Segment Projection: Quantified a primary qualified target audience of over 56,000 potential buyers"
            ],
            keyFindings: "Identified high-conversion urban demographic segments with 3.4x higher purchase intent, providing actionable targeting criteria."
        }
    },
    {
        id: "gymbot-streamlit",
        title: "Gym-Bot: AI Fitness & Workout Assistant",
        category: "ml",
        tagLabel: "Streamlit App · Personal Project",
        shortDesc: "Interactive AI fitness recommendation application built with Python and Streamlit, providing personalized workout and diet guidance based on user profile and fitness targets.",
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
            keyFindings: "Delivered a lightweight, highly responsive application demonstrating rapid frontend delivery with Streamlit and clean Python logic."
        }
    }
];

// Skills Matrix strictly aligned with Zishan's Resume
const SKILLS_DATA = {
    dataAnalysis: [
        { name: "Exploratory Data Analysis (EDA)", level: 95, icon: "fas fa-magnifying-glass-chart", tag: "Core" },
        { name: "Statistical & Predictive Modeling", level: 90, icon: "fas fa-chart-line", tag: "Modeling" },
        { name: "Random Forest Classification", level: 88, icon: "fas fa-tree", tag: "ML" },
        { name: "Data Cleaning & Wrangling", level: 96, icon: "fas fa-broom", tag: "Data" },
        { name: "Outlier Analysis & Winsorization", level: 92, icon: "fas fa-filter-circle-xmark", tag: "Stats" },
        { name: "Data Validation & Quality Checks", level: 94, icon: "fas fa-circle-check", tag: "Quality" }
    ],
    dataEngineering: [
        { name: "ETL Pipeline Design", level: 95, icon: "fas fa-network-wired", tag: "Core ETL" },
        { name: "Pipeline Orchestration & Automation", level: 90, icon: "fas fa-gears", tag: "Pipelines" },
        { name: "Role-Based Access Control (RBAC)", level: 88, icon: "fas fa-shield-halved", tag: "Security" },
        { name: "Relational Database Design", level: 90, icon: "fas fa-database", tag: "Databases" },
        { name: "API Integration", level: 86, icon: "fas fa-plug", tag: "Backend" },
        { name: "SQL (MySQL, SQLite, PostgreSQL)", level: 92, icon: "fas fa-table-cells", tag: "SQL" }
    ],
    biAndVisualization: [
        { name: "Plotly Interactive Visualizations", level: 94, icon: "fas fa-chart-pie", tag: "Interactive" },
        { name: "Streamlit Dashboard Development", level: 95, icon: "fas fa-desktop", tag: "Apps" },
        { name: "Matplotlib & Seaborn", level: 92, icon: "fas fa-chart-area", tag: "Python" },
        { name: "Power BI & Tableau", level: 84, icon: "fas fa-square-poll-vertical", tag: "BI" },
        { name: "FPDF Automated Report Generation", level: 90, icon: "fas fa-file-pdf", tag: "Reporting" },
        { name: "Dashboard UI & Layout Design", level: 92, icon: "fas fa-window-maximize", tag: "Dashboards" }
    ],
    languagesAndTools: [
        { name: "Python", level: 95, icon: "fab fa-python", tag: "Primary" },
        { name: "Pandas & NumPy", level: 95, icon: "fas fa-table", tag: "Core" },
        { name: "Scikit-Learn", level: 88, icon: "fas fa-brain", tag: "ML" },
        { name: "Java, C, C++", level: 82, icon: "fas fa-code", tag: "Languages" },
        { name: "Git & GitHub", level: 90, icon: "fab fa-git-alt", tag: "DevOps" },
        { name: "Google Cloud Platform (GCP)", level: 80, icon: "fab fa-google", tag: "Cloud" }
    ]
};

// Timeline: Experience & Education strictly aligned with Resume
const TIMELINE_DATA = [
    {
        type: "experience",
        title: "Software Development & Data Automation Intern",
        subtitle: "MECON Limited, Ranchi (Govt. of India Enterprise)",
        period: "April 2026 – May 2026",
        description: "Independently built and deployed 3 desktop data applications from requirements to final delivery: the SAP Analysis Tool, Timesheet Compliance Dashboard, and Financial Analysis Tool.",
        badge: "Industry Internship",
        highlights: [
            "Engineered a zero-dependency ETL pipeline processing 100,000+ SAP records at ~6,700 rows per second (<15s runtime), currently in daily active use by finance teams.",
            "Built an RBAC-secured Streamlit dashboard to audit 9,000+ employee timesheets, reducing anomaly detection time by ~80%.",
            "Added Role-Based Access Control and multi-stage data validation to keep sensitive financial and employee data secure and audit-ready."
        ]
    },
    {
        type: "education",
        title: "Bachelor of Technology — Computer Science & Engineering",
        subtitle: "Chaibasa Engineering College, Chaibasa, Jharkhand",
        period: "2023 — Expected 2027",
        description: "Pursuing B.Tech in CSE with a CGPA of 6.98/10 through Semester 4. Coursework covers Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering, Cloud Computing, and Cybersecurity.",
        badge: "Undergraduate Degree",
        highlights: [
            "Core focus on database systems, algorithm optimization, and software development practices",
            "Active technical participant in collegiate tech events and programming workshops"
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
            "Helped achieve strong student participation across all departments"
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
        description: "Facilitated technical workshops and hands-on coding sessions on Python, Pandas, and basic machine learning workflows for more than 20 students.",
        badge: "Community",
        highlights: [
            "Organized interactive sessions on data cleaning, exploratory analysis, and building simple dashboards"
        ]
    }
];

// Services Data
const SERVICES_DATA = [
    {
        icon: "fas fa-network-wired",
        title: "ETL & Pipeline Engineering",
        desc: "Designing fast, reliable ETL pipelines that ingest, clean, and validate high-volume operational data (up to ~6,700+ rows/sec) without unnecessary third-party dependencies."
    },
    {
        icon: "fas fa-chart-pie",
        title: "Interactive Dashboards & BI",
        desc: "Building clean Streamlit and Plotly dashboards with role-based access control, turning raw database records into clear, actionable business metrics."
    },
    {
        icon: "fas fa-brain",
        title: "Data Analysis & Predictive Modeling",
        desc: "Performing detailed exploratory analysis, handling outliers through Winsorization, and training machine learning models for customer segmentation and forecasting."
    },
    {
        icon: "fas fa-shield-halved",
        title: "Data Quality & Automation",
        desc: "Adding automated validation rules, anomaly detection, and secure access controls to ensure your business data remains reliable, clean, and audit-ready."
    }
];
