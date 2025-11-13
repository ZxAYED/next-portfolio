import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";



export const skills = {
  frontend: [
    // Core Frontend
    // { name: "HTML", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753787/next-portfolio/icons8-html-5-240.png.png' },
    // { name: "CSS", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753770/next-portfolio/icons8-css3-144.png.png' },
    // { name: "Bootstrap", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753732/next-portfolio/icons8-bootstrap-240.png.png' },

    { name: "Tailwind CSS", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762144676/tailwind_rk0uxm.png' },
    { name: "Material UI", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762144708/Material_dzjxfa.png' },
    { name: "Shadcn UI", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762144708/Material_dzjxfa.png' },
    { name: "LightsWind", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762144766/lightswind_b89cu9.png' },
    { name: "JavaScript", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762144790/js_fguukg.png' },

    { name: "React.js", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145923/react_y3jcyk.png' },
    { name: "Next.js", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762144996/nextjs_hhhdhr.png' },
  ],

  backend: [
    { name: "Node.js", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145027/nodejs_coeuef.png' },
    { name: "Express.js", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145050/express_pxbl13.png' },
    { name: "Nest.js", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145071/nestjs_mmxdwy.png' },
    { name: "TypeScript", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145105/typescript_z7zvwx.png' },
    { name: "Firebase", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145145/firebase_c3khua.png' },
  ],

  database: [
    { name: "MongoDB", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145183/mongodb_p1swtr.png' },
    { name: "Mongoose", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145255/mongoosejs_lu31vw.png' },
    { name: "Prisma", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145274/prisma_a1zqci.png' },
    { name: "PostgreSQL", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145301/postgresdb_qbqcqm.png' },
    { name: "Redis", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145321/redis_ksmxx8.png' },
    { name: "AWS S3", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145343/s3_fcqgyo.png' },

  ],
};

export const tools = [
  // {
  //   name: "Docker",
  //   icon: "https://res.cloudinary.com/dhl04adhz/image/upload/v1747753304/dokcer.png.png",
  // },
  {
    name: "Cloudinary",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145402/cloudinary_rxkl70.png',
  },
  {
    name: "Supabase",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145419/supabase_o8gkne.png',
  },

  {
    name: "GitHub",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145449/github_zqdgny.png',
  }, {
    name: "Netlify",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145471/netlify_hcpszx.png',
  },
  {
    name: "Vercel",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145524/Vercel_x6wlxw.png',
  },
  {
    name: "Postman",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145782/postman_ao0iva.png',

  },
  {
    name: "Swagger",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145788/swagger_ovfnlr.png',

  },
  {
    name: "Render",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1762145797/render_w5mvde.png',
  }
]
export const techColors: Record<string, string> = {
  // Core Web Tech
  HTML: "from-orange-500 to-orange-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  CSS: "from-blue-500 to-blue-700 hover:from-[#3B82F6] hover:to-[#9333EA]",
  JavaScript: "from-yellow-400 to-yellow-600 hover:from-[#9333EA] hover:to-[#3B82F6]",
  TypeScript: "from-sky-600 to-sky-800 hover:from-[#9333EA] hover:to-[#3B82F6]",

  // React Ecosystem
  React: "from-[#3B82F6] to-[#9333EA] hover:from-[#2563EB] hover:to-[#7E22CE]",
  "React.js": "from-[#3B82F6] to-[#9333EA] hover:from-[#2563EB] hover:to-[#7E22CE]",
  "React Bits": "from-[#3B82F6] to-[#9333EA] hover:from-[#2563EB] hover:to-[#7E22CE]",
  Redux: "from-fuchsia-500 to-fuchsia-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "Redux Toolkit": "from-pink-500 to-fuchsia-700 hover:from-[#9333EA] hover:to-[#3B82F6]",

  // Next.js & Frameworks
  Next: "from-[#9333EA] to-[#3B82F6] hover:from-[#7E22CE] hover:to-[#2563EB]",
  "Next.js": "from-[#9333EA] to-[#3B82F6] hover:from-[#7E22CE] hover:to-[#2563EB]",
  Nuqs: "from-[#3B82F6] to-[#9333EA] hover:from-[#2563EB] hover:to-[#7E22CE]",
  Lightwind: "from-[#9333EA] to-[#3B82F6] hover:from-[#7E22CE] hover:to-[#2563EB]",
  "Framer Motion": "from-rose-500 to-purple-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "ShadCN UI": "from-neutral-500 to-neutral-700 hover:from-[#3B82F6] hover:to-[#9333EA]",
  Tailwind: "from-cyan-400 to-cyan-600 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "Tailwind CSS": "from-cyan-400 to-cyan-600 hover:from-[#9333EA] hover:to-[#3B82F6]",

  // Backend & Database
  Node: "from-emerald-600 to-emerald-800 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "Node.js": "from-emerald-600 to-emerald-800 hover:from-[#9333EA] hover:to-[#3B82F6]",
  Express: "from-lime-500 to-lime-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "Express.js": "from-lime-500 to-lime-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  Prisma: "from-slate-500 to-slate-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  PostgreSQL: "from-indigo-500 to-indigo-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  MongoDB: "from-green-500 to-green-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  Mongoose: "from-amber-500 to-amber-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  Supabase: "from-emerald-500 to-emerald-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "JWT Authentication": "from-gray-700 to-gray-900 hover:from-[#3B82F6] hover:to-[#9333EA]",
  WebSocket: "from-teal-500 to-blue-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "WebSocket (ws)": "from-teal-500 to-blue-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "node-cron": "from-violet-500 to-blue-700 hover:from-[#9333EA] hover:to-[#3B82F6]",

  // APIs / Integrations / Tools
  "Google Maps API": "from-blue-500 to-green-600 hover:from-[#9333EA] hover:to-[#3B82F6]",
  Cloudinary: "from-sky-500 to-sky-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  NodeMailer: "from-lime-500 to-lime-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "MailSlurp API": "from-cyan-600 to-cyan-800 hover:from-[#9333EA] hover:to-[#3B82F6]",

  // Payment & Commerce
  Stripe: "from-indigo-500 to-purple-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  SSLCommerz: "from-indigo-400 to-indigo-600 hover:from-[#9333EA] hover:to-[#3B82F6]",
  ShurjoPay: "from-yellow-400 to-yellow-600 hover:from-[#9333EA] hover:to-[#3B82F6]",

  // Other / Creative
  ThreeJS: "from-[#9333EA] to-[#3B82F6] hover:from-[#7E22CE] hover:to-[#2563EB]",
  Chatbot: "from-teal-500 to-teal-700 hover:from-[#9333EA] hover:to-[#3B82F6]",
  "react-image": "from-purple-400 to-purple-600 hover:from-[#9333EA] hover:to-[#3B82F6]",
};




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
