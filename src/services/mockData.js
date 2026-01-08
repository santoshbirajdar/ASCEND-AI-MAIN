// THE ULTIMATE CAREER DATASET
// 10 Careers | 8-10 Roadmap Steps Each | Tools | Certifications | Real Interview Questions

export const careerPaths = [
    // 1. CLOUD ARCHITECT
    {
        id: '1',
        title: 'Cloud Architect',
        category: 'cloud',
        description: 'Design, secure, and manage complex cloud infrastructure on Azure and AWS. You will be the bridge between code and production.',
        salary_range: '$130k - $210k',
        difficulty_level: 'Advanced',
        required_skills: ['Azure', 'AWS', 'Terraform', 'Kubernetes', 'Python', 'Networking'],
        popular_tools: ['Terraform', 'Docker', 'Azure DevOps', 'Prometheus', 'Grafana', 'Ansible'],
        top_certifications: [
            { name: 'Azure Solutions Architect Expert', provider: 'Microsoft', difficulty: 'Hard' },
            { name: 'AWS Certified Solutions Architect', provider: 'Amazon', difficulty: 'Hard' },
            { name: 'Certified Kubernetes Admin (CKA)', provider: 'CNCF', difficulty: 'Medium' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Networking Core', description: 'Master TCP/IP, DNS, VPNs, Subnetting, and Load Balancing.', duration_weeks: 4, resources: ['CompTIA Network+'] },
            { step_number: 2, title: 'Linux Administration', description: 'Bash scripting, file permissions, SSH, and process management.', duration_weeks: 5, resources: ['Linux Journey'] },
            { step_number: 3, title: 'Azure/AWS Fundamentals', description: 'Compute (EC2/VM), Storage (S3/Blob), and IAM security.', duration_weeks: 6, resources: ['Azure AZ-900'] },
            { step_number: 4, title: 'Infrastructure as Code', description: 'Automate provisioning with Terraform or Bicep.', duration_weeks: 5, resources: ['HashiCorp Learn'] },
            { step_number: 5, title: 'Containerization', description: 'Docker images, registries, and multi-stage builds.', duration_weeks: 3, resources: ['Docker Deep Dive'] },
            { step_number: 6, title: 'Orchestration (K8s)', description: 'Kubernetes Pods, Services, Deployments, and Helm charts.', duration_weeks: 8, resources: ['Kubernetes.io'] },
            { step_number: 7, title: 'CI/CD Pipelines', description: 'Automated testing and deployment with GitHub Actions.', duration_weeks: 4, resources: ['GitHub Docs'] },
            { step_number: 8, title: 'Cloud Security', description: 'Zero Trust architecture, compliance, and secrets management.', duration_weeks: 4, resources: ['Azure Security Path'] }
        ],
        interview_topics: ['CAP Theorem', 'Disaster Recovery', 'Microservices Patterns']
    },

    // 2. FULL STACK DEVELOPER
    {
        id: '2',
        title: 'Full Stack Developer',
        category: 'fullstack',
        description: 'Build end-to-end web applications. Master the frontend UI, backend logic, and database management.',
        salary_range: '$100k - $180k',
        difficulty_level: 'Intermediate',
        required_skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'System Design'],
        popular_tools: ['VS Code', 'Postman', 'Git', 'Docker', 'Figma', 'Prisma'],
        top_certifications: [
            { name: 'Meta Full Stack Professional', provider: 'Coursera', difficulty: 'Medium' },
            { name: 'MongoDB Associate Developer', provider: 'MongoDB', difficulty: 'Medium' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Web Standards', description: 'Semantic HTML, CSS Grid/Flexbox, and Responsive Design.', duration_weeks: 3 },
            { step_number: 2, title: 'JavaScript Deep Dive', description: 'ES6+, Closures, Async/Await, and the Event Loop.', duration_weeks: 5 },
            { step_number: 3, title: 'React Framework', description: 'Hooks, Context API, State Management (Redux/Zustand).', duration_weeks: 6 },
            { step_number: 4, title: 'Backend APIs', description: 'RESTful services with Node.js & Express. Auth with JWT.', duration_weeks: 5 },
            { step_number: 5, title: 'Database Design', description: 'SQL (Postgres) vs NoSQL. Normalization and indexing.', duration_weeks: 4 },
            { step_number: 6, title: 'TypeScript', description: 'Static typing, interfaces, and generics.', duration_weeks: 3 },
            { step_number: 7, title: 'Deployment', description: 'CI/CD with Vercel/Netlify. Caching with Redis.', duration_weeks: 2 },
            { step_number: 8, title: 'System Design', description: 'Scalability, Load Balancing, and Caching strategies.', duration_weeks: 4 }
        ],
        interview_topics: ['Event Loop', 'Database Indexing', 'React Lifecycle']
    },

    // 3. AI/ML ENGINEER
    {
        id: '3',
        title: 'AI/ML Engineer',
        category: 'ai_ml',
        description: 'Build the future with Artificial Intelligence. Train models, fine-tune LLMs, and deploy scalable AI solutions.',
        salary_range: '$140k - $240k',
        difficulty_level: 'Very Hard',
        required_skills: ['Python', 'PyTorch', 'Transformers', 'NLP', 'RAG', 'Math'],
        popular_tools: ['Jupyter', 'Hugging Face', 'LangChain', 'OpenAI API', 'WandB'],
        top_certifications: [
            { name: 'Azure AI Engineer Associate', provider: 'Microsoft', difficulty: 'Medium' },
            { name: 'TensorFlow Developer', provider: 'Google', difficulty: 'Hard' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Math Foundations', description: 'Linear Algebra, Calculus, Probability & Statistics.', duration_weeks: 6 },
            { step_number: 2, title: 'Python for Data', description: 'NumPy, Pandas, and Matplotlib mastery.', duration_weeks: 4 },
            { step_number: 3, title: 'Classic ML', description: 'Regression, Classification, Decision Trees, Clustering.', duration_weeks: 5 },
            { step_number: 4, title: 'Deep Learning', description: 'Neural Networks, Backpropagation, CNNs with PyTorch.', duration_weeks: 8 },
            { step_number: 5, title: 'NLP & Transformers', description: 'Tokenization, Embeddings, BERT, GPT architectures.', duration_weeks: 6 },
            { step_number: 6, title: 'Generative AI', description: 'Prompt Engineering, Fine-Tuning, and RAG.', duration_weeks: 5 },
            { step_number: 7, title: 'ML Ops', description: 'Model deployment, versioning, and monitoring.', duration_weeks: 4 }
        ],
        interview_topics: ['Bias-Variance', 'Attention Mechanism', 'Gradient Descent']
    },

    // 4. CYBERSECURITY ANALYST
    {
        id: '4',
        title: 'Cybersecurity Analyst',
        category: 'cybersecurity',
        description: 'Defend organizations against cyber threats. Monitor networks, identify vulnerabilities, and respond to incidents.',
        salary_range: '$110k - $190k',
        difficulty_level: 'Advanced',
        required_skills: ['Network Security', 'Linux', 'SIEM', 'Ethical Hacking', 'Forensics'],
        popular_tools: ['Wireshark', 'Metasploit', 'Splunk', 'Nmap', 'Burp Suite'],
        top_certifications: [
            { name: 'CompTIA Security+', provider: 'CompTIA', difficulty: 'Medium' },
            { name: 'Certified Ethical Hacker', provider: 'EC-Council', difficulty: 'Hard' },
            { name: 'CISSP', provider: 'ISC2', difficulty: 'Very Hard' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'IT Fundamentals', description: 'OS Architecture, Hardware, and troubleshooting.', duration_weeks: 3 },
            { step_number: 2, title: 'Networking Core', description: 'OSI Model, TCP/IP, Ports, and Protocols.', duration_weeks: 5 },
            { step_number: 3, title: 'Linux Proficiency', description: 'Command line, permissions, and system hardening.', duration_weeks: 4 },
            { step_number: 4, title: 'Security Basics', description: 'CIA Triad, Encryption, Authentication.', duration_weeks: 4 },
            { step_number: 5, title: 'Vulnerability Scanning', description: 'Using tools like Nessus to find weak points.', duration_weeks: 4 },
            { step_number: 6, title: 'Penetration Testing', description: 'Reconnaissance, Exploitation, and Reporting.', duration_weeks: 6 },
            { step_number: 7, title: 'Blue Teaming', description: 'Log analysis, SIEM tools, and Incident Response.', duration_weeks: 5 }
        ],
        interview_topics: ['OWASP Top 10', 'XSS vs CSRF', 'Public Key Infrastructure']
    },

    // 5. FRONTEND SPECIALIST
    {
        id: '5',
        title: 'Frontend Specialist',
        category: 'frontend',
        description: 'Craft pixel-perfect, accessible, and performant user interfaces. Expert in React and modern CSS.',
        salary_range: '$90k - $160k',
        difficulty_level: 'Intermediate',
        required_skills: ['React', 'Tailwind', 'Next.js', 'Accessibility', 'Performance'],
        popular_tools: ['Figma', 'Chrome DevTools', 'Storybook', 'Vite', 'ESLint'],
        top_certifications: [
            { name: 'Meta Frontend Developer', provider: 'Coursera', difficulty: 'Easy' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'HTML5 & CSS3', description: 'Semantic markup, Flexbox, Grid, and Animations.', duration_weeks: 4 },
            { step_number: 2, title: 'JavaScript ES6+', description: 'DOM manipulation, Fetch API, Modules.', duration_weeks: 5 },
            { step_number: 3, title: 'React Core', description: 'Components, Props, State, Effects.', duration_weeks: 6 },
            { step_number: 4, title: 'Styling', description: 'Tailwind CSS, CSS-in-JS, and Dark Mode.', duration_weeks: 3 },
            { step_number: 5, title: 'Advanced React', description: 'Custom Hooks, Context, Performance Optimization.', duration_weeks: 4 },
            { step_number: 6, title: 'Meta-Frameworks', description: 'Next.js 14, SSR, Server Components.', duration_weeks: 5 },
            { step_number: 7, title: 'Accessibility (a11y)', description: 'ARIA, keyboard navigation, screen readers.', duration_weeks: 2 }
        ],
        interview_topics: ['CSS Box Model', 'React Reconciliation', 'Web Vitals']
    },

    // 6. BACKEND ENGINEER
    {
        id: '6',
        title: 'Backend Engineer',
        category: 'backend',
        description: 'Power the logic behind the web. Build scalable APIs, microservices, and manage high-performance databases.',
        salary_range: '$110k - $190k',
        difficulty_level: 'Advanced',
        required_skills: ['Java/Go', 'Microservices', 'Redis', 'Kafka', 'SQL'],
        popular_tools: ['Docker', 'Postman', 'IntelliJ IDEA', 'Redis', 'Apache Kafka'],
        top_certifications: [
            { name: 'Oracle Certified Professional (Java)', provider: 'Oracle', difficulty: 'Hard' },
            { name: 'AWS Developer Associate', provider: 'Amazon', difficulty: 'Medium' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Language Mastery', description: 'Java (Spring Boot) or Go (Gin/Echo).', duration_weeks: 6 },
            { step_number: 2, title: 'API Design', description: 'REST standards, GraphQL, and gRPC.', duration_weeks: 4 },
            { step_number: 3, title: 'Databases', description: 'Advanced SQL, ACID transactions, Indexing.', duration_weeks: 5 },
            { step_number: 4, title: 'Caching', description: 'Redis strategies, Cache-aside, Write-through.', duration_weeks: 3 },
            { step_number: 5, title: 'Message Queues', description: 'RabbitMQ or Kafka for async processing.', duration_weeks: 4 },
            { step_number: 6, title: 'Microservices', description: 'Service discovery, Circuit Breakers, API Gateway.', duration_weeks: 6 },
            { step_number: 7, title: 'Testing', description: 'Unit, Integration, and Load testing.', duration_weeks: 3 }
        ],
        interview_topics: ['CAP Theorem', 'Database Sharding', 'Concurrency']
    },

    // 7. MOBILE DEVELOPER
    {
        id: '7',
        title: 'Mobile Developer (Flutter)',
        category: 'mobile',
        description: 'Build native-quality apps for iOS and Android from a single codebase using Flutter.',
        salary_range: '$95k - $170k',
        difficulty_level: 'Intermediate',
        required_skills: ['Flutter', 'Dart', 'Firebase', 'State Mgmt', 'Native APIs'],
        popular_tools: ['Android Studio', 'Xcode', 'Firebase', 'Codemagic'],
        top_certifications: [
            { name: 'Google Associate Android Developer', provider: 'Google', difficulty: 'Medium' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Dart Language', description: 'Variables, Functions, OOP, Async programming.', duration_weeks: 3 },
            { step_number: 2, title: 'Flutter Widgets', description: 'Stateless vs Stateful, Layouts, Material Design.', duration_weeks: 5 },
            { step_number: 3, title: 'Navigation & Routing', description: 'Push/Pop, Named routes, GoRouter.', duration_weeks: 2 },
            { step_number: 4, title: 'State Management', description: 'Provider, Riverpod, or BLoC pattern.', duration_weeks: 4 },
            { step_number: 5, title: 'API Integration', description: 'HTTP requests, JSON parsing, Error handling.', duration_weeks: 3 },
            { step_number: 6, title: 'Local Storage', description: 'SQLite, Hive, Shared Preferences.', duration_weeks: 3 },
            { step_number: 7, title: 'Native Features', description: 'Camera, GPS, Permissions, Push Notifications.', duration_weeks: 4 }
        ],
        interview_topics: ['Widget Lifecycle', 'Isolates vs Async', 'BLoC Pattern']
    },

    // 8. DATA SCIENTIST
    {
        id: '8',
        title: 'Data Scientist',
        category: 'data_science',
        description: 'Turn raw data into business value. Extract insights using statistics, visualization, and machine learning.',
        salary_range: '$120k - $200k',
        difficulty_level: 'Advanced',
        required_skills: ['Python', 'Pandas', 'SQL', 'Statistics', 'Tableau'],
        popular_tools: ['Jupyter', 'Tableau', 'PowerBI', 'Spark', 'Excel'],
        top_certifications: [
            { name: 'IBM Data Science Professional', provider: 'Coursera', difficulty: 'Medium' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Python Programming', description: 'Syntax, Data Structures, and Algorithms.', duration_weeks: 4 },
            { step_number: 2, title: 'Data Wrangling', description: 'Pandas & NumPy for cleaning and manipulation.', duration_weeks: 5 },
            { step_number: 3, title: 'Visualization', description: 'Matplotlib, Seaborn, and Storytelling.', duration_weeks: 3 },
            { step_number: 4, title: 'Statistics', description: 'Hypothesis testing, Distributions, A/B Testing.', duration_weeks: 5 },
            { step_number: 5, title: 'SQL for Data', description: 'Complex Joins, Window Functions, Aggregations.', duration_weeks: 4 },
            { step_number: 6, title: 'Machine Learning', description: 'Scikit-Learn for predictive modeling.', duration_weeks: 6 },
            { step_number: 7, title: 'Big Data', description: 'Intro to Spark and Hadoop ecosystem.', duration_weeks: 4 }
        ],
        interview_topics: ['A/B Testing', 'SQL Joins', 'Feature Engineering']
    },

    // 9. DEVOPS ENGINEER
    {
        id: '9',
        title: 'DevOps Engineer',
        category: 'devops',
        description: 'Automate everything. Bridge the gap between development and operations with CI/CD and Infrastructure as Code.',
        salary_range: '$115k - $195k',
        difficulty_level: 'Intermediate',
        required_skills: ['CI/CD', 'Linux', 'AWS/Azure', 'Scripting', 'Monitoring'],
        popular_tools: ['Jenkins', 'Ansible', 'Prometheus', 'Grafana', 'Terraform'],
        top_certifications: [
            { name: 'AWS Certified DevOps Engineer', provider: 'Amazon', difficulty: 'Hard' },
            { name: 'Microsoft DevOps Engineer Expert', provider: 'Microsoft', difficulty: 'Hard' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Linux Administration', description: 'Shell scripting, Cron jobs, User management.', duration_weeks: 4 },
            { step_number: 2, title: 'Version Control', description: 'Git branching strategies (GitFlow).', duration_weeks: 2 },
            { step_number: 3, title: 'Cloud Basics', description: 'AWS EC2/S3 or Azure VM/Blob.', duration_weeks: 4 },
            { step_number: 4, title: 'CI/CD', description: 'Building pipelines with Jenkins or GitHub Actions.', duration_weeks: 5 },
            { step_number: 5, title: 'Infrastructure as Code', description: 'Terraform state management and modules.', duration_weeks: 5 },
            { step_number: 6, title: 'Containers', description: 'Docker and Kubernetes fundamentals.', duration_weeks: 6 },
            { step_number: 7, title: 'Monitoring', description: 'ELK Stack, Prometheus, Grafana dashboards.', duration_weeks: 3 }
        ],
        interview_topics: ['Blue/Green Deployment', 'GitOps', 'Inode vs Block']
    },

    // 10. PRODUCT MANAGER
    {
        id: '10',
        title: 'Technical Product Manager',
        category: 'product',
        description: 'Lead cross-functional teams to build products customers love. Define strategy, roadmap, and requirements.',
        salary_range: '$130k - $220k',
        difficulty_level: 'Intermediate',
        required_skills: ['Agile', 'User Research', 'SQL', 'Strategy', 'Communication'],
        popular_tools: ['Jira', 'Figma', 'Mixpanel', 'Notion', 'Linear'],
        top_certifications: [
            { name: 'Project Management Professional (PMP)', provider: 'PMI', difficulty: 'Hard' },
            { name: 'Certified Scrum Product Owner', provider: 'Scrum Alliance', difficulty: 'Easy' }
        ],
        roadmap_steps: [
            { step_number: 1, title: 'Product Lifecycle', description: 'From ideation to launch and retirement.', duration_weeks: 3 },
            { step_number: 2, title: 'Agile & Scrum', description: 'Sprints, Standups, Backlog refinement.', duration_weeks: 2 },
            { step_number: 3, title: 'User Research', description: 'Interviews, Personas, and Empathy mapping.', duration_weeks: 4 },
            { step_number: 4, title: 'Technical Literacy', description: 'Understanding APIs, Databases, and Architecture.', duration_weeks: 5 },
            { step_number: 5, title: 'Data Analytics', description: 'SQL, A/B Testing, and Success Metrics (KPIs).', duration_weeks: 4 },
            { step_number: 6, title: 'Strategy', description: 'Market analysis, SWOT, and Roadmapping.', duration_weeks: 4 }
        ],
        interview_topics: ['Prioritization Frameworks', 'Metrics (North Star)', 'Stakeholder Mgmt']
    }
];

export const interviewQuestions = [
    {
        id: 'q1',
        question: 'What is the "Virtual DOM" in React?',
        career_category: 'frontend',
        question_type: 'technical',
        difficulty: 'medium',
        answer_guide: 'Lightweight copy of DOM for performance optimization.',
        tips: ['Mention Reconciliation'],
        topic: 'React'
    },
    {
        id: 'q2',
        question: 'Explain CAP Theorem.',
        career_category: 'backend',
        question_type: 'system_design',
        difficulty: 'hard',
        answer_guide: 'Consistency, Availability, Partition Tolerance - pick two.',
        tips: ['Relate to SQL vs NoSQL'],
        topic: 'System Design'
    },
    {
        id: 'q3',
        question: 'What is Overfitting?',
        career_category: 'ai_ml',
        question_type: 'technical',
        difficulty: 'medium',
        answer_guide: 'Model learns noise instead of signal. Fix with regularization.',
        tips: ['Bias-Variance Tradeoff'],
        topic: 'Machine Learning'
    },
    {
        id: 'q4',
        question: 'Explain CI/CD.',
        career_category: 'devops',
        question_type: 'technical',
        difficulty: 'medium',
        answer_guide: 'Continuous Integration (merging code) and Continuous Deployment (releasing code).',
        tips: ['Mention automated testing'],
        topic: 'DevOps'
    }
];

export const userProgress = {
    id: 'prog1',
    user_email: 'demo@student.com',
    selected_career_path: '1',
    completed_steps: [1, 2],
    skills_assessment: { 'Azure': 2, 'Networking': 3 },
    bookmarked_questions: [],
    target_date: '2026-12-31'
};
