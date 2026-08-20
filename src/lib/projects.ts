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
    _id: "682c7557326c320fd58efbd9",
    projectId: "00",
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
    projectId: "01",
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
