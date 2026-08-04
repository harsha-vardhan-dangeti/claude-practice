export const personal = {
  name: "Harsha Vardhan Dangeti",
  nameLine1: "Harsha Vardhan",
  nameLine2: "Dangeti",
  initials: "HVD",
  brand: "HVD",
  title: "Full Stack & AI Engineer",
  email: "harsha.vardhan.422812@gmail.com",
  location: "Gachibowli, Hyderabad, IN",
  locationShort: "Gachibowli, Hyderabad",
  resumePdf: "https://drive.google.com/uc?export=download&id=1JFOjrIYu5S6Q3qrWltE_m1WWS5-rcATQ",
  // Set to image path (e.g. "/profile.jpg") to show your photo; null shows initials placeholder
  avatar: "/profile.png",
  // Tags shown in the home page profile card
  profileStack: ["Python", "Rails", "RAG", "LangGraph", "MCP", "FastAPI", "BigQuery", "RAGAS"],
  linkedin: {
    url: "https://www.linkedin.com/in/harshavardhandangeti/",
    handle: "linkedin.com/in/harshavardhandangeti",
  },
  github: {
    url: "https://github.com/harsha-vardhan-dangeti",
    handle: "github.com/harsha-vardhan-dangeti",
  },
  credly: "harsha-vardhan.c11364e9",
};

export const hero = {
  badge: "Gachibowli, Hyderabad · Open to Full Stack & AI roles · Remote/Hybrid",
  tagline: {
    bold: "3.5 years shipping production Rails.",
    rest: " Now building the systems underneath the LLM — RAG pipelines, schema-aware agents, MCP servers, and the evaluation infrastructure that tells you when they break.",
  },
  stats: [
    { value: "3.5", label: "Yrs production Rails" },
    { value: "45",  label: "Min RAG eval talk" },
    { value: "5+",  label: "AI projects shipped" },
  ],
};

export const about = {
  heading: "Background",
  paragraphs: [
    "I've spent 3.5 years building production Ruby on Rails applications — APIs that handle real load, schema migrations under live traffic, and the kind of debugging sessions that teach you more than any tutorial. That track record gave me strong opinions about API contracts, observability, and what it actually means to ship.",
    "The transition to AI engineering is deliberate, not reactive. I'm building systems with measurable outcomes: RAG pipelines evaluated with RAGAS and G-Eval, a schema-aware BigQuery agent using LangGraph that replaces manual SQL queries, and MCP servers that make internal tools LLM-accessible. I delivered an internal workshop on RAG evaluation — live demo, benchmarks, failure modes — and a separate AI Trends 2025–2026 presentation to the engineering org.",
    "I care about the gap between \"it works in the notebook\" and \"it works in production.\" That gap is where most AI projects fail, and where I spend my time. Python is leveling up alongside the Rails foundation.",
  ],
  facts: [
    { label: "Location",          value: "Gachibowli, Hyderabad, IN" },
    { label: "Current role",      value: "Software Developer (Rails)" },
    { label: "Total experience",  value: "~4.5 yrs (incl. HPE internship)" },
    { label: "Focus area",        value: "Full Stack & AI Engineering — RAG, Agents, MCP" },
    { label: "Status",            value: "Open to Full Stack & AI roles · Remote/Hybrid", highlight: true },
    { label: "Outside tech",      value: "Distance running, VO₂ max tracking, meal prep, content creation" },
  ],
};

export const experience = [
  {
    role: "IT Software Developer",
    company: "Qualcomm",
    dates: "2025 — Present · ~1.5 yrs",
    current: true,
    bullets: [
      "Maintained and extended production Ruby on Rails APIs handling high-volume traffic; led zero-downtime schema migrations on live databases.",
      "Built internal RAG evaluation pipeline using RAGAS and HyDE; reduced hallucination rate on schema-sensitive queries by ~40% in A/B testing against the baseline retrieval setup.",
      "Delivered 45-min RAG Evaluation workshop (live demo on production data) and AI Trends 2025–2026 presentation to an engineering org of 50+ engineers.",
    ],
    tags: ["Ruby on Rails", "PostgreSQL", "Python", "LangChain", "RAGAS", "BigQuery"]
  },
  {
    role: "Associate IT Software Developer",
    company: "Qualcomm",
    dates: "2022 — 2025· ~2.5 yrs",
    current: false,
    bullets: [
      "Built and shipped Rails features end-to-end — database design, API implementation, frontend integration.",
      "Wrote and maintained RSpec test coverage for REST APIs, and used RabbitMQ for asynchronous background job processing.",
      "Used Docker to keep local development environments consistent with production, with Redis for caching and MySQL as the primary datastore.",
    ],
    tags: ["Ruby on Rails", "JavaScript", "MySQL", "Redis", "Rspec", "REST APIs", "RabbitMQ", "Docker"],
  },
  {
    role: "Technical Solution Consultant (GRSB Internship)",
    company: "Hewlett Packard Enterprise",
    dates: "2022 — 2022· ~6 months",
    current: false,
    bullets: [
      "Developed technical solutions that streamlined internal processees, resulting in a 20% increase in team efficiency during project exectuion with the six-month intership period",
      "collaborated with cross-functional teams to identify bottlenecks and implement automation tools, reducing manual effort by 30% and improving overall project delivery timelines.",
    ],
    tags: ["Python", "Shell Scripting", "Automation", "Cross-functional Collaboration"],
  },

];

export const projects = [
  {
    title: "RAG Evaluation Suite",
    description: "End-to-end evaluation pipeline for production RAG systems. Implements RAGAS metrics, HyDE, multi-query expansion, and automated regression testing with a visualization dashboard for retrieval quality over time.",
    github: "#",
    demo: null,
    tags: ["Python", "LangChain", "RAGAS", "LlamaIndex"],
    icon: "activity",
  },
  {
    title: "Schema-Aware SQL Agent",
    description: "Natural language → BigQuery pipeline with schema introspection, query validation, and automatic retry on semantic errors. Multi-table joins via LangGraph orchestration with a self-healing query loop.",
    github: "#",
    demo: null,
    tags: ["LangGraph", "BigQuery", "BigQuery ML", "Python"],
    icon: "database",
  },
  {
    title: "MCP Server Toolkit",
    description: "Production-grade MCP server with tool registration, schema validation, structured error handling, and LLM observability hooks. Makes internal tools LLM-accessible via the Model Context Protocol.",
    github: "#",
    demo: null,
    tags: ["MCP Protocol", "Python", "FastAPI", "TypeScript"],
    icon: "tool",
  },
  {
    title: "Agentic RAG Pipeline",
    description: "Multi-agent RAG system using CrewAI with specialized retrieval, synthesis, and critique agents. Includes Graph RAG for entity-relationship-aware retrieval across large document corpora.",
    github: "#",
    demo: null,
    tags: ["CrewAI", "LlamaIndex", "Graph RAG", "Python"],
    icon: "globe",
  },
  {
    title: "LLM Observability Dashboard",
    description: "Real-time monitoring for LLM applications: token costs, latency tracking, retrieval quality metrics, and hallucination detection. Built for visibility over production RAG deployments.",
    github: "#",
    demo: null,
    tags: ["Python", "FastAPI", "React", "PostgreSQL"],
    icon: "layout",
  },
  {
    title: "BigQuery Vector Search",
    description: "Semantic search layer on top of BigQuery using embeddings and BigQuery ML vector search. Combines structured SQL with unstructured semantic retrieval for a hybrid search experience over enterprise data.",
    github: "#",
    demo: null,
    tags: ["BigQuery ML", "Vector Search", "Python", "GCP"],
    icon: "box",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore, IN",
    dates: "2018 — 2022",
    grade: "CGPA: 8.1/10",          // e.g. "CGPA: 8.4 / 10" — leave empty to hide
    highlights: [],     // e.g. ["Relevant coursework: ...", "Final year project: ..."]
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Ruby", "TypeScript", "SQL", "JavaScript"],
  },
  {
    category: "AI / ML",
    items: ["LangChain", "LlamaIndex", "LangGraph", "RAGAS", "HyDE", "Graph RAG", "Embeddings"],
  },
  {
    category: "Frontend",
    items: ["React", "React Router", "Vite", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["Ruby on Rails", "FastAPI", "MySQL", "Redis", "REST APIs"],
  },
  {
    category: "Testing",
    items: ["RSpec", "Vitest", "React Testing Library"],
  },
  {
    category: "Cloud & Data",
    items: ["Google Cloud Services", "AWS Services", "Vector Search", "Pinecone"],
  },
  {
    category: "Tools & Protocol",
    items: ["MCP Protocol", "Docker", "Git", "GitHub Actions", "LLM Observability"],
  },
];

// Fallback static data — shown in production (Credly API is CORS-restricted).
// The hook in useCreedlyData.js updates this live in development via Vite proxy.
// Run `node scripts/sync-credly.js` to refresh this list from Credly anytime.
export const certifications = [
  {
    issuer: "Google for Developers · Hack2skill",
    name: "PromptWars: Hyderabad — Participant",
    date: "2026-06-02",
    url: "https://certificate.hack2skill.com/claim/6035e10e31e66b03010073e1ecd8da79b9d76fda322bfce5c5da49f802c349a5",
    image: null,
    badge: "🏆",
  },
  {
    issuer: "IBM",
    name: "Docker Essentials: A Developer Introduction",
    date: "2023-09-22",
    url: "https://www.credly.com/badges/bcc7cad1-0b64-4504-b3c4-1e53f0e50df9",
    image: "https://images.credly.com/images/b0c5445a-72a2-46ce-a599-96147e210efb/blob",
  },
  {
    issuer: "Cisco",
    name: "Cybersecurity Essentials",
    date: "2021-05-13",
    url: "https://www.credly.com/badges/3619372b-50d2-40ef-9859-7c7baffabce2",
    image: "https://images.credly.com/images/054913b2-e271-49a2-a1a4-9bf1c1f9a404/CyberEssentials.png",
  },
  {
    issuer: "Cisco",
    name: "Introduction to Cybersecurity",
    date: "2021-04-18",
    url: "https://www.credly.com/badges/bbd7b01f-b893-4886-af1e-52966d5106a7",
    image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
  },
  {
    issuer: "Cisco",
    name: "Introduction to Packet Tracer",
    date: "2021-04-15",
    url: "https://www.credly.com/badges/c100bb20-ac73-4c86-8f27-3a907afe341e",
    image: "https://images.credly.com/images/09b6d58c-763a-4b40-aea1-787d8f46bbcd/Intro2PT.png",
  },
];

export const githubStats = {
  username: 'harsha-vardhan-dangeti',
  // key maps to the property returned by useGithubData
  highlights: [
    { label: 'Public Repos',    key: 'publicRepos',   icon: 'folder' },
    { label: 'Total Stars',     key: 'totalStars',    icon: 'star'   },
    // Label/value resolved at runtime: accurate "Contributions (1y)" when a
    // token is configured, else the "Commits (90d)" events-feed proxy.
    { label: 'Commits (90d)',   key: 'recentCommits', icon: 'commit' },
    { label: 'Followers',       key: 'followers',     icon: 'pr'     },
  ],
};

export const talks = [
  {
    title: "AIBUZZ Hot Finalist — Vision2Code",
    meta: "Qualcomm AIBUZZ · 2025 · Hot Finalist",
    description: "Selected as a Hot Finalist at Qualcomm's internal AIBUZZ innovation competition for Vision2Code — a system that takes Figma mockups and hand-drawn sketch diagrams as input and generates production-ready frontend code in the chosen technology stack. The pipeline interprets visual design intent, understands component hierarchy from the sketch, and outputs structured, framework-specific components ready for integration.",
    icon: "trophy",
  },
  {
    title: "RAG Evaluation: From Theory to Production",
    meta: "Internal Engineering Talk · 45 min · Live Demo · Audience: 50+ engineers",
    description: "Covered RAGAS framework, G-Eval, HyDE, and custom evaluation metrics for production RAG systems. Included a live evaluation run on a production pipeline demonstrating retrieval quality measurement, hallucination detection, and regression tracking across model changes.",
    icon: "edit",
    note: "Internal talk — slides available on request.",
  },
  {
    title: "AI Engineering Trends 2025–2026",
    meta: "Internal Presentation · Engineering Org",
    description: "Surveyed the evolving AI engineering landscape: agentic frameworks, RAG advancements, MCP protocol adoption, LLM observability tooling, and production deployment patterns. Included concrete takeaways and a framework for evaluating new AI tools before adoption.",
    icon: "monitor",
    note: "Internal talk — slides available on request.",
  },
];
