export const personal = {
  name: "Harsha Vardhan Dangeti",
  nameLine1: "Harsha Vardhan",
  nameLine2: "Dangeti",
  initials: "HVD",
  brand: "HVD",
  title: "AI Engineer",
  email: "harsha.vardhan.422812@gmail.com",
  location: "Gachibowli, Hyderabad, IN",
  locationShort: "Gachibowli, Hyderabad",
  resumePdf: "/resume.pdf",
  // Set to image path (e.g. "/profile.jpg") to show your photo; null shows initials placeholder
  avatar: null,
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
};

export const hero = {
  badge: "Gachibowli, Hyderabad · Open to AI Engineering roles",
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
    "The transition to AI engineering is deliberate, not reactive. I'm building systems with measurable outcomes: RAG pipelines evaluated with RAGAS and G-Eval, a schema-aware BigQuery agent using LangGraph that replaces manual SQL queries, and MCP servers that make internal tools LLM-accessible. I delivered a 45-minute internal workshop on RAG evaluation — live demo, benchmarks, failure modes — and a separate AI Trends 2025–2026 presentation to the engineering org.",
    "I care about the gap between \"it works in the notebook\" and \"it works in production.\" That gap is where most AI projects fail, and where I spend my time. Python is leveling up alongside the Rails foundation.",
  ],
  facts: [
    { label: "Location",      value: "Gachibowli, Hyderabad, IN" },
    { label: "Current role",  value: "Software Developer (Rails)" },
    { label: "Focus area",    value: "AI Engineering — RAG, Agents, MCP" },
    { label: "Status",        value: "Open to AI/ML roles", highlight: true },
    { label: "Outside tech",  value: "Distance running, VO₂ max tracking, meal prep, content creation" },
  ],
};

export const experience = [
  {
    role: "Software Developer",
    company: "Qualcomm",
    dates: "2022 — Present · ~3.5 yrs",
    current: true,
    bullets: [
      "Maintained and extended production Ruby on Rails APIs handling high-volume traffic; led zero-downtime schema migrations on live databases.",
      "Built internal RAG evaluation pipeline using RAGAS and HyDE; reduced hallucination rate on schema-sensitive queries by ~40% in A/B testing against the baseline retrieval setup.",
      "Delivered 45-min RAG Evaluation workshop (live demo on production data) and AI Trends 2025–2026 presentation to an engineering org of 50+ engineers.",
    ],
    tags: ["Ruby on Rails", "PostgreSQL", "Python", "LangChain", "RAGAS", "BigQuery"],
  },
  {
    role: "Junior Software Developer",
    company: "[Previous Company]",
    dates: "2021 — 2022 · ~1 yr",
    current: false,
    bullets: [
      "Built and shipped Rails features end-to-end — database design, API implementation, frontend integration.",
      "[Add outcome with impact metric]",
      "[Add outcome with impact metric]",
    ],
    tags: ["Ruby on Rails", "JavaScript", "PostgreSQL"],
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

export const skills = [
  {
    category: "Languages",
    items: ["Python", "Ruby", "TypeScript", "SQL", "JavaScript"],
  },
  {
    category: "AI / ML",
    items: ["LangChain", "LlamaIndex", "LangGraph", "CrewAI", "RAGAS", "HyDE", "Graph RAG", "Embeddings"],
  },
  {
    category: "Backend",
    items: ["Ruby on Rails", "FastAPI", "PostgreSQL", "Redis", "REST APIs"],
  },
  {
    category: "Cloud & Data",
    items: ["BigQuery", "BigQuery ML", "Vector Search", "GCP", "Pinecone"],
  },
  {
    category: "Tools & Protocol",
    items: ["MCP Protocol", "Docker", "Git", "GitHub Actions", "LLM Observability"],
  },
];

export const certifications = [
  {
    issuer: "Google Cloud",
    name: "Professional Data Engineer",
    date: "2024",
    url: "#",
  },
  {
    issuer: "DeepLearning.AI",
    name: "LangChain for LLM Application Development",
    date: "2024",
    url: "#",
  },
  {
    issuer: "",
    name: "",
    date: "",
    url: "#",
  },
];

export const githubStats = {
  username: 'harsha-vardhan-dangeti',
  // Update these whenever you want to highlight different numbers
  highlights: [
    { label: 'Public Repos',    value: '17',   icon: 'folder'    },
    { label: 'Pull Requests',   value: '50+',  icon: 'pr'        },
    { label: 'Commits (2024)',  value: '200+', icon: 'commit'    },
    { label: 'Contributions',   value: '300+', icon: 'activity'  },
  ],
};

export const talks = [
  {
    title: "RAG Evaluation: From Theory to Production",
    meta: "Internal Engineering Talk · 45 min · Live Demo · Audience: 50+ engineers",
    description: "Covered RAGAS framework, G-Eval, HyDE, and custom evaluation metrics for production RAG systems. Included a live evaluation run on a production pipeline demonstrating retrieval quality measurement, hallucination detection, and regression tracking across model changes.",
    icon: "edit",
  },
  {
    title: "AI Engineering Trends 2025–2026",
    meta: "Internal Presentation · Engineering Org",
    description: "Surveyed the evolving AI engineering landscape: agentic frameworks, RAG advancements, MCP protocol adoption, LLM observability tooling, and production deployment patterns. Included concrete takeaways and a framework for evaluating new AI tools before adoption.",
    icon: "monitor",
  },
];
