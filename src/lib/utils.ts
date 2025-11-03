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
  HTML: "from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800",
  CSS: "from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700",
  JavaScript: "from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700",
  TypeScript: "from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900",

  // React Ecosystem
  React: "from-[#3B82F6] to-[#9333EA] hover:from-[#2563EB] hover:to-[#7E22CE]",
  "React.js": "from-[#3B82F6] to-[#9333EA] hover:from-[#2563EB] hover:to-[#7E22CE]",
  Redux: "from-fuchsia-500 to-fuchsia-700 hover:from-fuchsia-600 hover:to-fuchsia-800",
  "Redux Toolkit": "from-pink-500 to-fuchsia-700 hover:from-pink-600 hover:to-fuchsia-800",

  // Next.js & Frameworks
  Next: "from-[#9333EA] to-[#3B82F6] hover:from-[#7E22CE] hover:to-[#2563EB]",
  "Next.js": "from-[#9333EA] to-[#3B82F6] hover:from-[#7E22CE] hover:to-[#2563EB]",
  "Framer Motion": "from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700",
  "ShadCN UI": "from-neutral-500 to-neutral-700 hover:from-neutral-600 hover:to-neutral-800",
  Tailwind: "from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700",
  "Tailwind CSS": "from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700",

  // Backend
  Node: "from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900",
  "Node.js": "from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900",
  Express: "from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800",
  "Express.js": "from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800",
  Prisma: "from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800",
  PostgreSQL: "from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800",
  MongoDB: "from-green-500 to-green-700 hover:from-green-600 hover:to-green-800",
  Mongoose: "from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800",
  "JWT Authentication": "from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black",
  "bcrypt.js": "from-zinc-500 to-zinc-700 hover:from-zinc-600 hover:to-zinc-800",

  // Cloud / APIs / Tools
  Cloudinary: "from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800",
  NodeMailer: "from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800",
  "MailSlurp API": "from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900",
  "Firebase Hosting": "from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700",
  "Firebase CloudStorage": "from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700",
  "Firebase Authentication": "from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700",

  // Payment
  ShurjoPay: "from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700",
  SSLCommerz: "from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700",

  // Misc / Special
  Chatbot: "from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800",
  "react-image": "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700",
  ThreeJS: "from-[#9333EA] to-[#3B82F6] hover:from-[#7E22CE] hover:to-[#2563EB]",
}




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
