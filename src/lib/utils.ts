import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import img12 from '../../public/images/skills/express.png';
import img1 from '../../public/images/skills/js.png';
import img5 from '../../public/images/skills/Material.png';
import img8 from '../../public/images/skills/mongodb.png';
import img7 from '../../public/images/skills/nextjs.png';

import img19 from '../../public/images/skills/cloudinary.png';
import img25 from '../../public/images/skills/firebase.png';
import img21 from '../../public/images/skills/github.png';
import img27 from '../../public/images/skills/lightswind.png';
import img23 from '../../public/images/skills/mongoosejs.png';
import img18 from '../../public/images/skills/nestjs.png';
import img22 from '../../public/images/skills/netlify.png';
import img10 from '../../public/images/skills/nodejs.png';
import img17 from '../../public/images/skills/postgresdb.png';
import img13 from '../../public/images/skills/postman.png';
import img11 from '../../public/images/skills/prisma.png';
import img26 from '../../public/images/skills/redis.png';
import img6 from '../../public/images/skills/redux.png';
import img15 from '../../public/images/skills/render.png';
import img24 from '../../public/images/skills/s3.png';
import img4 from '../../public/images/skills/shadcn.png';
import img20 from '../../public/images/skills/supabase.png';
import img16 from '../../public/images/skills/swagger.png';
import img3 from '../../public/images/skills/tailwind.png';
import img2 from '../../public/images/skills/typescript.png';
import img14 from '../../public/images/skills/Vercel.png';


export const skills = {
  frontend: [
    // Core Frontend
    // { name: "HTML", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753787/next-portfolio/icons8-html-5-240.png.png' },
    // { name: "CSS", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753770/next-portfolio/icons8-css3-144.png.png' },
    // { name: "Bootstrap", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753732/next-portfolio/icons8-bootstrap-240.png.png' },

    { name: "Tailwind CSS", icon: img3 },
    { name: "Material UI", icon: img5 },
    { name: "Shadcn UI", icon: img4 },
    { name: "LightsWind", icon: img27 },
    { name: "JavaScript", icon: img1 },

    { name: "React.js", icon: img6 },
    { name: "Next.js", icon: img7 },
  ],

  backend: [
    { name: "Node.js", icon: img10 },
    { name: "Express.js", icon: img12 },
    { name: "Nest.js", icon: img18 },
    { name: "TypeScript", icon: img2 },
    { name: "Firebase", icon: img25 },
  ],

  database: [
    { name: "MongoDB", icon: img8 },
    { name: "Mongoose", icon: img23 },
    { name: "Prisma", icon: img11 },
    { name: "PostgreSQL", icon: img17 },
    { name: "Redis", icon: img26 },
    { name: "AWS S3", icon: img24 },

  ],
};

export const tools = [
  // {
  //   name: "Docker",
  //   icon: "https://res.cloudinary.com/dhl04adhz/image/upload/v1747753304/dokcer.png.png",
  // },
  {
    name: "Cloudinary",
    icon: img19,
  },
  {
    name: "Supabase",
    icon: img20,
  },

  {
    name: "GitHub",
    icon: img21,
  }, {
    name: "Netlify",
    icon: img22,
  },
  {
    name: "Vercel",
    icon: img14,
  },
  {
    name: "Postman",
    icon: img13,

  },
  {
    name: "Swagger",
    icon: img16,

  },
  {
    name: "Render",
    icon: img15,
  }
]
export const techColors: Record<string, string> = {
  MongoDB: "from-green-500 to-green-700 hover:from-green-600 hover:to-green-800",
  Express: "from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800",
  "Express.js": "from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800",
  React: "from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
  "React.js": "from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
  TypeScript: "from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900",
  Node: "from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900",
  "Node.js": "from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900",
  Next: "from-[#9333EA] to-[#3B82F6] hover:from-[#7e22ce] hover:to-[#2563eb]",
  "Next.js": "from-[#9333EA] to-[#3B82F6] hover:from-[#7e22ce] hover:to-[#2563eb]",
  Tailwind: "from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700",
  "Tailwind CSS": "from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700",
  Redux: "from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800",
  PostgreSQL: "from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800",
  Prisma: "from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800",
  Mongoose: "from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800",
  "Redux Toolkit": "from-fuchsia-500 to-fuchsia-700 hover:from-fuchsia-600 hover:to-fuchsia-800",
  "Firebase Hosting": "from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700",
  "Firebase CloudStorage": "from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700",
  "Firebase Authentication": "from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700",
  "MailSlurp API": "from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900",
  "JWT Authentication": "from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black",
  "bcrypt.js": "from-zinc-500 to-zinc-700 hover:from-zinc-600 hover:to-zinc-800",
  Cloudinary: "from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800",
  NodeMailer: "from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800",
  "react-image": "from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700",
  ShurjoPay: "from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700",
  SSLCommerz: "from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700",
  "Framer Motion": "from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700",
  "ShadCN UI": "from-neutral-500 to-neutral-700 hover:from-neutral-600 hover:to-neutral-800",
  Chatbot: "from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800",
}



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
