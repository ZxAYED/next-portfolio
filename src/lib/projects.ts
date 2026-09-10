export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  _id: string
  projectId: string
  slug: string
  projectName: string
  tagline: string
  description: string
  role: string
  timeline: string
  category: string
  metrics: ProjectMetric[]
  features: string[]
  githubClientCode: string
  githubServerCode: string
  liveLink: string
  techStack: string[]
  myLearnings: string[]
  imageUrl: string
}

export const projectData: Project[] = [
 {
  "_id": "elite-central-vacuum",
  "projectId": "01",
  "slug": "elite-central-vacuum",
  "projectName": "Elite Central Vacuum",
  "tagline": "Full-Stack Commerce, Field Service & Real-Time Operations Platform",
  "role": "Full Stack Engineer & System Architect",
  "timeline": "2026",
  "category": "SaaS / E-Commerce / Field Service",

  "metrics": [
    {
      "label": "User Roles",
      "value": "3 Portals"
    },
    {
      "label": "API Domains",
      "value": "20+"
    },
    {
      "label": "Realtime",
      "value": "Socket.IO + Redis"
    },
    {
      "label": "Payments",
      "value": "Stripe"
    }
  ],

  "description": "A production-grade full-stack platform combining e-commerce, professional field-service operations, technician dispatch, quotations, invoicing, real-time communication, and AI-assisted diagnostics. Built around three dedicated customer, technician, and admin experiences with a Next.js frontend and a modular NestJS backend powered by PostgreSQL, Prisma, Redis, BullMQ, Socket.IO, Stripe, and Google Gemini.",

  "features": [
    "Multi-Role Platform Architecture: Built dedicated Customer, Technician, and Admin portals on top of a unified authentication and role-based authorization system.",

    "End-to-End Commerce Engine: Implemented product discovery, persistent cart synchronization, inventory-aware checkout, Stripe Checkout, webhook-based payment confirmation, order tracking, returns, and automated refunds.",

    "Field Service & Dispatch Workflow: Engineered the complete service lifecycle from customer intake and quotation approval to technician assignment, scheduling, live ETA updates, job execution, completion reports, and invoicing.",

    "Distributed Concurrency Control: Used Redis-backed locking and Prisma transactions to protect critical workflows including inventory updates, appointment booking, quotation acceptance, and payment settlement from race conditions.",

    "Real-Time Communication Infrastructure: Built Socket.IO notification and live-support gateways with Redis Pub/Sub synchronization, presence tracking, typing indicators, read receipts, and cross-role event delivery.",

    "Asynchronous Background Processing: Integrated BullMQ workers for notification delivery and delayed offline-message handling with retries, rate limiting, and exponential backoff.",

    "AI Diagnostic Assistant: Integrated Google Gemini with streaming SSE responses, structured symptom extraction, urgency analysis, and live database tool access for products, services, and customer equipment.",

    "Unified Billing & Quotation System: Implemented itemized quotations, revision history, customer approval workflows, automated invoice generation, Stripe payments, multi-tender payment records, and refund tracking.",

    "High-Performance Client Data Layer: Built 20+ typed RTK Query API domains with cache tagging, automatic invalidation, local-first cart synchronization, debounced search, and optimized loading states.",

    "Production Security Architecture: Implemented JWT authentication, HttpOnly refresh-token cookies, role guards, ownership validation, layered endpoint throttling, secure CORS, Helmet, and request validation."
  ],

  "githubClientCode": "ADD_FRONTEND_GITHUB_URL",
  "githubServerCode": "https://github.com/ZxAYED/elite-vaccum-backend",
  "liveLink": "https://elite-vaccum-frontend.vercel.app/",

  "techStack": [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS 4",
    "Radix UI",
    "Redux Toolkit",
    "RTK Query",
    "React Hook Form",
    "Zod",
    "Framer Motion",
    "Recharts",
    "NestJS 11",
    "Node.js",
    "PostgreSQL",
    "Prisma ORM",
    "Upstash Redis",
    "BullMQ",
    "Socket.IO",
    "Stripe",
    "Cloudinary",
    "Google Gemini",
    "JWT",
    "Swagger / OpenAPI",
    "Vercel",
    "Render"
  ],

  "myLearnings": [
    "Designed a large modular full-stack architecture spanning commerce, service operations, dispatch, billing, CRM, notifications, and AI-assisted workflows.",

    "Implemented distributed locking and transactional workflows to prevent race conditions across inventory, scheduling, payments, and quotation processing.",

    "Built scalable real-time systems using Socket.IO, Redis Pub/Sub, Redis-backed presence tracking, and multi-channel event delivery.",

    "Engineered resilient asynchronous workflows with BullMQ workers, delayed jobs, retry strategies, concurrency controls, and rate limiting.",

    "Developed secure Stripe payment flows covering Checkout Sessions, PaymentIntents, webhook verification, failed payments, quotation payments, and refunds.",

    "Built a unified authentication architecture supporting Customer, Admin, and Technician roles with JWT access tokens, HttpOnly refresh cookies, and granular role guards.",

    "Integrated generative AI into an application workflow using Gemini streaming responses, structured outputs, and database-backed tool calling.",

    "Designed a scalable frontend data architecture using Redux Toolkit and RTK Query with typed API contracts, cache invalidation, optimistic user experiences, and local-first state synchronization.",

    "Implemented a complete field-service lifecycle including service intake, slot availability, quotation approval, dispatch, technician execution, ETA broadcasting, and automated invoicing.",

    "Strengthened production engineering practices around API security, validation, rate limiting, concurrency, background processing, real-time communication, and deployment."
  ],

  "imageUrl": "https://res.cloudinary.com/dhl04adhz/image/upload/v1789043923/elite_tkkxmz.png"
},{
    _id: "682c7557326c320fd58efbd9",
    projectId: "02",
    slug: "scene-ads",
    projectName: "Scene Ads",
    tagline: "Collaborative Outdoor Advertising Campaign Management Platform",
    role: "Full Stack Lead & Frontend Architect",
    timeline: "2024 / 6 Weeks",
    category: "SaaS / AdTech",
    metrics: [
      { label: "Latency", value: "< 80ms" },
      { label: "Stack", value: "Next.js + Prisma" },
      { label: "Realtime", value: "WebSocket" },
      { label: "Payments", value: "Stripe Webhooks" },
    ],
    description:
      "A modern advertising campaign management platform where brands can collaborate, create, and monitor outdoor ad campaigns with live chat, analytics, and integrated payment support. Designed with seamless interactivity, dynamic URL state management, and real-time synchronization.",
    features: [
      "Real-Time Chat & Collaboration: Built using WebSockets (ws) for sub-100ms multi-user team coordination.",
      "Stripe Payment Gateway: Secure checkout workflow with asynchronous Stripe webhook confirmation handling.",
      "Google Maps Geolocation: Interactive map-based billboard and outdoor screen campaign placement.",
      "Dynamic Query State with Nuqs: Synchronized, bookmarkable URL search parameters for seamless dashboard filtering.",
      "Scalable API Architecture: High-throughput REST endpoints orchestrated via Node.js, Express, and Prisma ORM on PostgreSQL.",
      "Production-Grade Auth: Stateless JSON Web Token (JWT) session lifecycle management with role-based access control.",
    ],
    githubClientCode: "https://github.com/ZxAYED/sceneAds-frontend",
    githubServerCode: "https://github.com/ZxAYED/sceneAds-backend",
    liveLink: "https://scene-ads.netlify.app",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Nuqs",
      "Framer Motion",
      "Stripe",
      "Node.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "JWT Authentication",
      "WebSocket (ws)",
      "node-cron",
      "Google Maps API",
    ],
    myLearnings: [
      "Architected bidirectional WebSocket communication channels between client and server nodes.",
      "Engineered resilient Stripe webhook handlers ensuring idempotent transaction processing.",
      "Mastered URL state synchronization using Nuqs for ultra-responsive search and pagination.",
      "Integrated Google Maps JavaScript SDK with custom clustered map markers for ad assets.",
      "Designed clean relational schemas and indexing strategies with PostgreSQL & Prisma.",
    ],
    imageUrl:
      "https://res.cloudinary.com/dhl04adhz/image/upload/v1763015112/danaj_ixyvny.png",
  },
  {
    _id: "682c7557326c320fd58efbd0",
    projectId: "03",
    slug: "event-planner",
    projectName: "Event Planner & Participation System",
    tagline: "End-to-End Event Management, Invitation & Ticketing Ecosystem",
    role: "Full Stack Engineer",
    timeline: "2024 / 4 Weeks",
    category: "Full Stack Web App",
    metrics: [
      { label: "Performance", value: "98+ Lighthouse" },
      { label: "Architecture", value: "Modular REST" },
      { label: "Gateway", value: "SSLCommerz" },
      { label: "Auth", value: "RBAC + JWT" },
    ],
    description:
      "A full-featured event management application where organizers can publish, moderate, and monetize public or private events with real-time participation tracking, invitation dispatches, and secure multi-currency payment checkout.",
    features: [
      "Role-Based Access Control (RBAC): Granular administrative dashboard and participant permissions.",
      "Event Lifecycle Engine: Dynamic creation, scheduling, capacity caps, and instant registration workflows.",
      "Payment Gateway Integration: Automated transactions and receipt generation via SSLCommerz.",
      "Cloudinary Media Pipeline: Optimized image transformation and direct cloud asset delivery.",
      "Real-Time Messaging: Event-level attendee discussion channels backed by WebSocket communication.",
      "Admin Analytics & Moderation: Comprehensive event metrics, user moderation, and status controls.",
    ],
    githubClientCode: "https://github.com/developersajadur/Next-Event-Client-Side",
    githubServerCode: "https://github.com/developersajadur/Next-Event-Server-Side",
    liveLink: "https://next-event-pro.vercel.app",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "JWT Authentication",
      "Cloudinary",
      "SSLCommerz",
      "WebSocket (ws)",
    ],
    myLearnings: [
      "Implemented comprehensive RBAC security models safeguarding administrative endpoints.",
      "Integrated regional payment gateways with callback verifications and instant status updates.",
      "Structured optimized database migrations and relational joins using Prisma ORM.",
      "Crafted micro-interactive user experiences utilizing Tailwind CSS and Framer Motion.",
      "Collaborated across a multi-developer Git workflow using branch protection and review protocols.",
    ],
    imageUrl:
      "https://res.cloudinary.com/dhl04adhz/image/upload/v1747741417/undefined+1747741415127.png",
  },
]
