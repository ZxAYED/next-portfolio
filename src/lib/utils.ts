import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";





export const skills = [

  { name: "HTML", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753787/next-portfolio/icons8-html-5-240.png.png' },
  { name: "CSS", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753770/next-portfolio/icons8-css3-144.png.png'  },
  { name: "Bootstrap", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753732/next-portfolio/icons8-bootstrap-240.png.png'  },
  { name: "Tailwind CSS", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753885/next-portfolio/icons8-tailwindcss-240.png.png'  },
  { name: "Material UI", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753936/next-portfolio/material%20ui.png.png'  },
  { name: "Shadcn UI", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754440/next-portfolio/shadcn.png.png'  },
  { name: "JavaScript", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753806/next-portfolio/icons8-js-240.png.png' },
  {
    name: "TypeScript",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-typescript-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-7-pack-logos-icons-2945272.png?f=webp&w=256",
  },
  { name: "React.js", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754218/next-portfolio/react.png.png' },
  {
    name: "Next.js",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754039/next-portfolio/next.png.png',
  },
  {
    name: "Redux",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754374/next-portfolio/redux.png.png',
  },
  { name: "Node.js", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754089/next-portfolio/nodeJs.png.png' },
  { name: "Express.js", icon: "https://res.cloudinary.com/dhl04adhz/image/upload/v1747753596/next-portfolio/expressJs.png.png" },
  { name: "MongoDB", icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753995/next-portfolio/mongodb.png.png' },
  {
    name: "Mongoose",
    icon: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fl8rbs6hk39ei4m4emawr.png",
  },
  {
    name: "Prisma",
    icon: "https://miro.medium.com/v2/resize:fit:1024/1*sRnURmqek5n5ozXwUrp5kQ.jpeg",
  },
  {
    name: "PostgreSQL",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754160/next-portfolio/postgre.png.png',
  },
  // {
  //   name: "GraphQL",
  //   icon: graph,
  // },
  
  // {
  //   name: "AWS",
  //   icon: "https://cdn.iconscout.com/icon/free/png-256/free-aws-logo-icon-download-in-svg-png-gif-file-formats--cloud-computing-network-server-database-brand-pack-logos-icons-1583149.png?f=webp&w=256",
  // },
  // {
  //   name: "Jest",
  //   icon: jest,
  // },
];

export const tools =[
  {
    name: "Docker",
    icon: "https://res.cloudinary.com/dhl04adhz/image/upload/v1747753304/dokcer.png.png",
  },{
    name :"Cloudinary",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754517/next-portfolio/cloudinary.png.png',
  },
 {
    name: "GitHub",
    icon:'https://res.cloudinary.com/dhl04adhz/image/upload/v1747753674/next-portfolio/github.jpg.jpg',
  },{
    name :"Netlify",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754015/next-portfolio/netlify.png.png',
  },
  {
    name :"Vercel",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754495/next-portfolio/Vercel.png.png',
  },
  {
    name :"Postman",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754195/next-portfolio/postman.webp.webp',
  },{
    name : "Render",
    icon: 'https://res.cloudinary.com/dhl04adhz/image/upload/v1747754404/next-portfolio/render.jpg.jpg',
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
