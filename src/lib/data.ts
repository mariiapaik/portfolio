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
  desc: "AI-powered ads-optimization platform for media buyers and agencies serving clients including Pepsi and Starbucks. Co-built two products from scratch in a team of 8 engineers + QA.",
  archTitle: "System Architecture",
  arch: [
    "NestJS backend · 37+ modules · polyglot persistence",
    "Multi-LLM routing — Anthropic Claude, GPT-4o, Gemini",
    "Autonomous AI campaign-launching agent via tool calling",
  ],
  chips: ["NODE.JS", "NESTJS", "CLAUDE", "MONGODB", "AWS"],
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
  "I build <strong>backend systems that scale</strong> — real-time queues, AI pipelines, cloud infrastructure. Three years shipping production code at an AI SaaS used by 200+ media buyers serving brands like <strong>Pepsi</strong> and <strong>Starbucks</strong>, integrating <strong>LLMs</strong> before it was cool.",
  "BSc in <strong>Intelligent Systems</strong> from TUKE, thesis on <strong>RAG pipelines</strong>. I've shipped an autonomous campaign-launching agent and a Claude-powered content pipeline to production. Open to backend or full-stack roles, remote or hybrid, on B2B or employment.",
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
    msg: "ARCHITECTED: NestJS backend · 37+ modules · polyglot persistence",
  },
  {
    ts: "[09:41:25]",
    msg: "INTEGRATED: 10+ ad platforms — Facebook, TikTok, MGID, Taboola, Outbrain",
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
  ["FOCUS", "Full-Stack / Backend"],
  ["STACK", "Node.js · NestJS · TypeScript"],
  ["AI / LLM", "OpenAI · Anthropic · RAG"],
  ["INFRA", "AWS · GCP · Docker · Redis"],
  ["CONTRACT", "B2B (JDG) · Employment"],
  ["LANGUAGES", "RU · UA · SK · EN"],
];

export const skillCards = [
  { cat: "BACKEND", name: "NestJS / Node.js", pct: 92 },
  { cat: "LANGUAGE", name: "TypeScript", pct: 90 },
  { cat: "LANGUAGE", name: "Python", pct: 80 },
  { cat: "DATABASE", name: "PostgreSQL", pct: 86 },
  { cat: "DATABASE", name: "MongoDB", pct: 84 },
  { cat: "QUEUE", name: "Redis / BullMQ", pct: 85 },
  { cat: "AI", name: "LLM · RAG · Agents", pct: 86 },
  { cat: "FRONTEND", name: "React / Redux", pct: 82 },
  { cat: "CLOUD", name: "AWS / GCP", pct: 74 },
  { cat: "DEVOPS", name: "Docker / CI", pct: 74 },
  { cat: "BACKEND", name: "REST · WebSockets", pct: 85 },
  { cat: "AUTOMATION", name: "n8n · OpenAI · Claude", pct: 83 },
];

export const projects = [
  {
    num: "001",
    title: "TrackBoost AI Platform",
    desc: "Co-built the backend of an AI-powered ads-optimization SaaS — scheduled stats-collection layer, BullMQ queues pulling thousands of ads, OpenAI & Anthropic integrations, 9+ traffic-source integrations, multi-tenant architecture.",
    chips: ["NestJS", "BullMQ", "Redis", "OpenAI", "PostgreSQL", "AWS"],
  },
  {
    num: "002",
    title: "Autonomous Ad Agent",
    desc: "End-to-end campaign launcher: takes an offer + reference, generates images and headlines via OpenAI, assembles creatives, and pushes them live to traffic sources. Replaced hours of manual work per buyer.",
    chips: ["OpenAI", "Node.js", "Agent", "BullMQ"],
  },
  {
    num: "003",
    title: "Claude Content Pipeline",
    desc: "n8n + Claude Opus pipeline auto-generating RSOC articles for Tonic at scale. Ran in production for months, producing multiple campaigns per day with zero manual writing.",
    chips: ["Claude API", "n8n", "Automation"],
  },
  {
    num: "004",
    title: "Real-time Analytics",
    desc: "Live dashboard aggregating a 70 GB MongoDB store and multiple SQL databases into real-time charts. Cut key dashboard load times from ~30s to near-instant on hot paths.",
    chips: ["MongoDB", "Redis", "Charts", "Node.js"],
  },
  {
    num: "005",
    title: "RAG Pipeline Research",
    desc: "BSc thesis core — retrieval-augmented generation over a custom knowledge base. Vector-search retrieval combined with LLM generation, built into an IDE for working with LLMs.",
    chips: ["Python", "RAG", "Vector DB", "LLM"],
  },
  {
    num: "006",
    title: "Freelance Client Builds",
    desc: "End-to-end delivery for independent clients: booking sites, a dance-course registration platform, and a Telegram bot with full PayPal payment flow. Requirements to deployment.",
    chips: ["React", "Astro", "PayPal", "React Native"],
  },
];

export const experience = [
  {
    company: "TrackBoost",
    role: "Full-Stack Developer",
    period: "Jun 2023 — May 2026",
    mode: "Hybrid · Kraków",
    summary:
      "AI-powered ads-optimization platform for media buyers, affiliates and agencies. Co-built two products from scratch in a team of 8 engineers + QA, serving clients including Pepsi and Starbucks.",
    points: [
      "Built integrations with 9+ traffic sources & affiliate networks (Facebook, TikTok, MGID, Taboola, Outbrain, Revcontent, Tonic).",
      "Architected the scheduled stats-collection layer — hourly/daily BullMQ jobs across hundreds of campaigns and thousands of ads.",
      "Built a real-time analytics dashboard over a 70 GB MongoDB store + multiple SQL databases; cut load times from ~30s to near-instant.",
      "Shipped an AI ad-creative editor and an influencer-management CRM for agencies.",
    ],
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "2024 — Present",
    mode: "Remote",
    summary:
      "Designed and shipped websites, booking systems and a Telegram bot across fitness, wellness and education — owning the full cycle from requirements to deployment.",
    points: [
      "Booking sites with lead capture & email notifications (React + Node.js).",
      "Dance-course landing & registration platform (React, Node.js, Astro).",
      "Telegram bot with full PayPal payment flow + Google services.",
    ],
  },
  {
    company: "Technical University of Košice (TUKE)",
    role: "BSc, Intelligent Systems",
    period: "2022 — 2025",
    mode: "Slovakia",
    summary:
      'Thesis: "Integrated Development Environments for Work with Large Language Models." Designed and implemented a RAG pipeline as the core technical contribution.',
    points: [],
  },
];

export const languages = [
  { name: "Russian", level: "Native" },
  { name: "Ukrainian", level: "Native" },
  { name: "Slovak", level: "C1 · Near-fluent" },
  { name: "English", level: "B2" },
];

export const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Tech Stack" },
  { href: "#experience", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
