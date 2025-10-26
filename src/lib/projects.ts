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
        ],
        imageUrl:
            "https://res.cloudinary.com/dhl04adhz/image/upload/f_auto,q_auto/mp2rqchpnhy4ngr2qv6l",
    },
]
