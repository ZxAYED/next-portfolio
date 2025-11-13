export interface Project {
    _id: string
    projectId: string
    projectName: string
    description: string
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
        projectName: "Scene Ads ( Team collaboration )",
        description:
            "A modern advertising campaign management platform where brands can collaborate, create, and monitor ad campaigns with live chat, analytics, and integrated payment support. Designed with seamless interactivity using Next.js and TypeScript.",
        features: [
            "Real-Time Chat System: Implemented using WebSocket for instant communication.",
            "Stripe Payment Integration: Includes secure payment flow and Stripe webhook handling.",
            "Location Integration: Integrated Google Maps for precise location-based campaign management.",
            "Dynamic Query State: Implemented with Nuqs for efficient URL-based state management.",
            "Responsive Dashboard: Designed with Tailwind CSS and ShadCN UI.",
            "Optimized API: Built with Node.js, Express, and Prisma for scalability.",
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
            "Implemented real-time chat system using WebSocket in both frontend and backend.",
            "Learned and integrated Stripe webhook for secure payment confirmation.",
            "Implemented Nuqs for dynamic and shareable URL state management.",
            "Learned Google Maps API and successfully integrated map-based campaign features.",
            "Enhanced understanding of server-client communication and async event handling.",
            "Improved full-stack TypeScript and Prisma implementation skills.",
        ],
        imageUrl:
            "https://res.cloudinary.com/dhl04adhz/image/upload/v1763015112/danaj_ixyvny.png",
    },

    {
        _id: "682c7557326c320fd58efbd0",
        projectId: "01",
        projectName: "Event Planner & Participation System",
        description:
            "A full-featured event management app where users can create, join, and manage events with payments, invitations, and admin moderation. Designed with secure authentication and a modern UI using Next.js and Tailwind CSS.",
        features: [
            "Role-Based Access: Admin and user roles with different permissions.",
            "Event Management: Create, edit, and join public or private events.",
            "Payment Integration: Seamless event payments via SSLCommerz.",
            "Invitation System: Send and manage event invites easily.",
            "Admin Dashboard: Moderate users and events effectively.",
            "Cloud Image Uploads: Managed securely with Cloudinary.",
        ],
        githubClientCode: "https://github.com/developersajadur/Next-Event-Client-Side",
        githubServerCode: "https://github.com/developersajadur/Next-Event-Server-Side",
        liveLink: "https://next-event-pro.vercel.app",
        techStack: [
            "Next.js",
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
        ],
        myLearnings: [
            "Improved collaboration and version control using GitHub.",
            "Strengthened backend skills with Prisma & PostgreSQL.",
            "Learned to integrate payment gateways securely.",
            "Enhanced frontend animations using Framer Motion.",
            "Developed scalable API with proper error handling.",
            "Gained experience in team-based agile development.",
            "Implemented chat system using WebSocket for event communication.",
            "Learned Stripe webhook fundamentals for payment confirmation handling.",
            "Applied Nuqs for dynamic event filtering and search states.",
            "Integrated Google Maps for location-based event tracking.",
        ],
        imageUrl:
            "https://res.cloudinary.com/dhl04adhz/image/upload/v1747741417/undefined+1747741415127.png",
    },

    {
        _id: "682c7557326c320fd58efbd1",
        projectId: "02",
        projectName: "The Pencil Palace",
        description:
            "An e-commerce platform for stationery and office supplies with secure payments, admin management, and optimized performance using React and Node.js.",
        features: [
            "User Authentication with Firebase and JWT.",
            "Payment Gateway Integration via ShurjoPay.",
            "Admin Panel to manage products, users, and orders.",
            "Cloudinary for secure image hosting.",
            "Responsive and optimized UI with Tailwind CSS.",
            "Global Error Handling and consistent API structure.",
        ],
        githubClientCode: "https://github.com/ZxAYED/the-pencil-palace-frontend",
        githubServerCode: "https://github.com/ZxAYED/the-pencil-palace",
        liveLink: "https://the-pencil-palace.netlify.app",
        techStack: [
            "React.js",
            "Redux Toolkit",
            "Tailwind CSS",
            "Firebase Authentication",
            "ShurjoPay",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Mongoose",
            "Cloudinary",
            "JWT Authentication",
        ],
        myLearnings: [
            "Built and deployed full e-commerce app solo.",
            "Mastered Redux Toolkit for state management.",
            "Integrated ShurjoPay for secure transactions.",
            "Refined backend API and error handling structure.",
            "Improved Firebase auth and password reset flow.",
            "Enhanced deployment knowledge with Netlify & Render.",
            "Learned Stripe webhook and payment event handling process.",
            "Implemented WebSocket basics for potential real-time updates.",
            "Explored Nuqs for cleaner state and query management.",
            "Learned and tested Google Maps integration basics.",
        ],
        imageUrl:
            "https://res.cloudinary.com/dhl04adhz/image/upload/f_auto,q_auto/mp2rqchpnhy4ngr2qv6l",
    },
];
