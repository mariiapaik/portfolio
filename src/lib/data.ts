export const profile = {
  name: "Mariia Paik",
  first: "MARIIA",
  last: "PAIK",
  role: "Full-Stack Engineer",
  location: "Kraków, Poland",
  eyebrow: "FULL-STACK ENGINEER · KRAKÓW, PL",
  email: "mariyapaik3@gmail.com",
  phone: "+48 732 862 578",
  github: "https://github.com/mariiapaik",
  linkedin: "https://linkedin.com/in/mariia-paik",
  cv: "/Mariia_Paik_CV.pdf",
};

export const typewriterLines = [
  "Backend-Focused Full-Stack Engineer",
  "Building Autonomous AI Agents",
  "NestJS · Multi-LLM Routing · AWS",
  "Architecting Resilient Backend Systems",
];

export const heroStats = [
  { n: "3+", l: "YEARS EXPERIENCE" },
  { n: "200+", l: "USERS SCALED" },
  { n: "10+", l: "AD-NETWORK INTEGRATIONS" },
];

export const coreProject = {
  badge: "CORE PROJECT",
  title: "TrackBoost",
  desc: "AI-powered ads-optimization platform for media buyers, affiliates and agencies serving clients including Pepsi and Starbucks. Co-built two products from scratch in a team of 8 engineers + QA.",
  archTitle: "System Architecture",
  arch: [
    "Autonomous AI campaign-launching agent (OpenAI creatives)",
    "LLM-based campaign optimization & rules engine",
    "Scheduled stats layer over a 70 GB MongoDB store via BullMQ",
  ],
  chips: ["NODE.JS", "NESTJS", "OPENAI", "CLAUDE", "MONGODB", "AWS"],
};

export const cta = {
  title: "Ready to Build Something Real?",
  sub: "Open to backend or full-stack roles — remote, hybrid, B2B or employment. I reply within 24h.",
  button: "INITIALIZE CONTACT",
};

export const techWeb = [
  "Node.js",
  "NestJS",
  "TypeScript",
  "Python",
  "React",
  "Redux",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "BullMQ",
  "Docker",
  "AWS",
  "GCP",
  "Claude",
  "OpenAI",
  "Gemini",
  "RAG",
  "n8n",
  "Fastify",
  "WebSockets",
];

export const aboutBio = [
  "<strong>Full-Stack Developer</strong> with 3 years of production experience building AI-powered SaaS platforms end-to-end — from greenfield architecture to scaled features used by <strong>200+ media buyers</strong> and agencies serving brands such as <strong>Pepsi</strong> and <strong>Starbucks</strong>.",
  "Backend-leaning generalist across <strong>Node.js, NestJS, Express</strong> and Python, with strong React/Redux on the frontend and confident handling of MongoDB, PostgreSQL, Redis, BullMQ and AWS/GCP. Shipped multiple <strong>LLM-driven features</strong> in production — an autonomous campaign-launching agent and a Claude-powered content pipeline. Comfortable owning a feature from spec through deployment.",
];

export const terminalLog: { ts: string; msg: string; hi?: boolean }[] = [
  { ts: "[09:41:22]", msg: "INITIALIZING_AGENT: MARIIA_PAIK" },
  {
    ts: "[09:41:23]",
    msg: "DEPLOYED: Autonomous AI campaign-launching agent (multi-LLM routing)",
    hi: true,
  },
  {
    ts: "[09:41:24]",
    msg: "DEPLOYED: n8n + Claude Opus content pipeline (RSOC at scale)",
  },
  {
    ts: "[09:41:25]",
    msg: "INTEGRATED: 9+ traffic sources — Facebook, TikTok, MGID, Taboola, Outbrain",
    hi: true,
  },
  {
    ts: "[09:41:26]",
    msg: "SCALED: 70 GB MongoDB store · thousands of ads · BullMQ schedulers",
  },
  {
    ts: "[09:41:27]",
    msg: "OPTIMIZED: key dashboard load ~30s → near-instant",
    hi: true,
  },
  { ts: "[09:41:28]", msg: "STATUS: OPEN_TO_WORK · REMOTE / HYBRID" },
];

export const aboutFacts: [string, string][] = [
  ["LOCATION", "Kraków, Poland"],
  ["FOCUS", "Full-Stack · Backend-leaning"],
  ["EXPERIENCE", "3 years · production SaaS"],
  ["EDUCATION", "BSc Intelligent Systems · TUKE"],
  ["CONTRACT", "B2B (JDG) · Employment"],
  ["AVAILABILITY", "Remote / Hybrid"],
  ["LANGUAGES", "RU · UA · SK (C1) · EN (B2)"],
];

/** Technical skills grouped by category — straight from the resume. */
export const skillGroups: { cat: string; items: string[] }[] = [
  { cat: "LANGUAGES", items: ["JavaScript", "TypeScript", "Python"] },
  {
    cat: "BACKEND",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Django",
      "REST APIs",
      "Microservices",
      "BullMQ",
      "WebSockets",
    ],
  },
  {
    cat: "FRONTEND",
    items: ["React", "Redux", "Astro", "React Native", "HTML", "CSS"],
  },
  {
    cat: "DATABASES",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    cat: "CLOUD & DEVOPS",
    items: ["AWS", "GCP", "Docker", "CI/CD", "Linux", "VPS"],
  },
  {
    cat: "AI & AUTOMATION",
    items: [
      "OpenAI API",
      "Anthropic Claude",
      "RAG",
      "Vector DBs",
      "Prompt Engineering",
      "n8n",
    ],
  },
  {
    cat: "INTEGRATIONS",
    items: [
      "Facebook Ads",
      "TikTok Ads",
      "Instagram",
      "YouTube",
      "MGID",
      "Taboola",
      "Outbrain",
      "Revcontent",
      "Line",
      "Tonic",
      "Google APIs",
      "PayPal",
    ],
  },
  {
    cat: "TESTING & TOOLS",
    items: ["Jest", "Git", "GitHub", "Postman", "Agile/Scrum"],
  },
];

export const projects = [
  {
    num: "001",
    title: "Autonomous Ad Agent",
    desc: "End-to-end campaign launcher for affiliate marketers: takes an offer + reference, generates images and headlines via OpenAI, assembles creatives, and pushes them live to traffic sources. Replaced hours of manual creative production per buyer.",
    chips: ["OpenAI", "Node.js", "Agent", "BullMQ"],
  },
  {
    num: "002",
    title: "LLM Optimization Engine",
    desc: "Campaign optimization engine that analyzes live performance against affiliate-marketing rules and recommends concrete actions — budget adjustments, pausing underperforming creatives, and generating new variations.",
    chips: ["LLM", "NestJS", "Rules Engine"],
  },
  {
    num: "003",
    title: "Claude Content Pipeline",
    desc: "n8n + Claude Opus pipeline auto-generating RSOC articles for Tonic at scale. Ran in production for several months, producing multiple campaigns per day with zero manual writing.",
    chips: ["Claude API", "n8n", "Automation"],
  },
  {
    num: "004",
    title: "Real-time Analytics Dashboard",
    desc: "Live dashboard with charts aggregating a 70 GB MongoDB store and multiple SQL databases across all integrated traffic sources and campaigns. Cut key dashboard load times from ~30s to near-instant.",
    chips: ["MongoDB", "Redis", "Charts", "Node.js"],
  },
  {
    num: "005",
    title: "AI Creative Editor & CRM",
    desc: "In-app AI creative editor to generate and refine ad images and copy, removing dependency on external design tools — plus an influencer-management system for agencies with talent CRM, campaign tracking and reporting.",
    chips: ["OpenAI", "React", "NestJS"],
  },
  {
    num: "006",
    title: "RAG Pipeline (BSc Thesis)",
    desc: "Retrieval-augmented generation over a custom knowledge base — vector-search retrieval combined with LLM generation, built into an IDE for working with LLMs. Core technical contribution of the thesis.",
    chips: ["Python", "RAG", "Vector DB", "LLM"],
  },
];

/** Freelance / client work from the Upwork portfolio. */
export const freelance: {
  title: string;
  role: string;
  desc: string;
  stack: string[];
  links?: { label: string; href: string }[];
  wip?: boolean;
}[] = [
  {
    title: "Fitness Coach Website",
    role: "Full site development",
    desc: "Modern, high-converting website for a fitness coach — full-cycle UI/UX, responsive frontend, backend & integrations, contact / lead-generation forms and SEO. A clean, engaging presence supporting the coach's personal brand and growth.",
    stack: ["React", "Node.js", "UI/UX", "Responsive", "SEO"],
    links: [{ label: "stefit.sk", href: "https://stefit.sk" }],
  },
  {
    title: "Dance Course Landing",
    role: "Full-Stack · End-to-End",
    desc: "Conversion-optimized landing page for a dance course — clear course presentation, emotional engagement and a simple flow from first visit to registration, with a data-collecting form wired to backend storage.",
    stack: ["React", "API Integration", "Web Design"],
    links: [{ label: "thesdds.com", href: "https://thesdds.com" }],
  },
  {
    title: "Podiatry / Beauty Website",
    role: "Full-Stack · End-to-End",
    desc: "Modern website for a podiatry / beauty business focused on clear service presentation and building client trust — responsive frontend, organized service content and integrated contact / lead-generation forms.",
    stack: ["React", "UI/UX", "API Integration", "SEO"],
  },
  {
    title: "Course Signup Page",
    role: "Full-Stack · End-to-End",
    desc: "Fast, visually appealing signup page that makes registration effortless — an effective tool for promoting the client's course and managing registrations.",
    stack: ["React", "API Integration", "Lead Gen"],
  },
  {
    title: "Sales & Content Platform",
    role: "Full-Stack · End-to-End",
    desc: "Platform for managing sales and gated access to content, built with React, Stripe payments and a user-authorization system. Currently under active development.",
    stack: ["React", "Node.js", "Stripe", "Firebase", "GAE"],
    wip: true,
  },
];

export const experience = [
  {
    company: "TrackBoost",
    role: "Full-Stack Developer",
    period: "Jun 2023 — May 2026",
    mode: "Hybrid · Kraków",
    summary:
      "AI-powered ads-optimization platform for media buyers, affiliates and agencies. Co-built two products from scratch — trackboost.com (AI co-pilot for advertisers) and digital.trackboost.com (analytics & team-management dashboard) — in a team of 8 engineers + QA, serving clients including Pepsi and Starbucks.",
    points: [
      "Built an autonomous AI agent that takes an offer + reference and launches a full ad campaign end-to-end — generating images and headlines via OpenAI and pushing creatives live to traffic sources.",
      "Designed an LLM-based campaign optimization engine that analyzes live performance against affiliate-marketing rules and recommends budget changes, pausing, and new creative variations.",
      "Built integrations with 9+ traffic sources & affiliate networks (Facebook, TikTok, Instagram, YouTube, MGID, Taboola, Outbrain, Revcontent, Line, Tonic).",
      "Designed an n8n + Claude Opus content pipeline auto-generating RSOC articles for Tonic at scale; ran in production for months.",
      "Architected the scheduled stats-collection layer — hourly/daily BullMQ jobs across hundreds of campaigns and thousands of ads.",
      "Built a real-time analytics dashboard over a 70 GB MongoDB store + multiple SQL databases; cut key dashboard load times from ~30s to near-instant.",
      "Shipped an AI ad-creative editor and an influencer-management system (talent CRM, campaign tracking, reporting) for agencies.",
    ],
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "2024 — Present",
    mode: "Remote",
    summary:
      "Designed and shipped websites, booking systems and a Telegram bot for independent clients across fitness, wellness and education — owning the full delivery cycle from requirements and design to deployment and handover.",
    points: [
      "Fitness-coach booking site with service signup, lead capture & email notifications (React + Node.js).",
      "Dance-course landing & registration platform (React, Node.js, Astro).",
      "Podiatry-clinic site with appointment booking and contact functionality.",
      "Telegram bot with full PayPal payment flow + Google services integration.",
      "Cross-platform mobile app (side project) with React Native and a Node.js backend.",
    ],
  },
  {
    company: "Technical University of Košice (TUKE)",
    role: "BSc, Intelligent Systems",
    period: "2022 — 2025",
    mode: "Slovakia",
    summary:
      'Thesis: "Integrated Development Environments for Work with Large Language Models." Designed and implemented a Retrieval-Augmented Generation (RAG) pipeline as the core technical contribution, grounding LLM responses in a custom knowledge base.',
    points: [],
  },
];

export const languages = [
  { name: "Russian", level: "Native" },
  { name: "Ukrainian", level: "Native" },
  { name: "Slovak", level: "C1 · Near-fluent" },
  { name: "English", level: "B2 · Upper-Intermediate" },
];

export const contactMethods = [
  { label: "EMAIL", value: "mariyapaik3@gmail.com", href: "mailto:mariyapaik3@gmail.com" },
  { label: "PHONE", value: "+48 732 862 578", href: "tel:+48732862578" },
  { label: "LINKEDIN", value: "in/mariia-paik", href: "https://linkedin.com/in/mariia-paik" },
  { label: "GITHUB", value: "github.com/mariiapaik", href: "https://github.com/mariiapaik" },
];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#freelance", label: "Freelance" },
  { href: "#stack", label: "Tech Stack" },
  { href: "#contact", label: "Contact" },
];
