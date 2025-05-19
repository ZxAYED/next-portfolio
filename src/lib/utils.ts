import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import docker from "../../public/images/dokcer.png";
import xpress from "../../public/images/expressJs.png";
import graph from "../../public/images/graph-ql.png";
import boot from "../../public/images/icons8-bootstrap-240.png";
import css from "../../public/images/icons8-css3-144.png";
import html from "../../public/images/icons8-html-5-240.png";
import js from "../../public/images/icons8-js-240.png";
import tailwind from "../../public/images/icons8-tailwindcss-240.png";
import jest from "../../public/images/jest.png";
import mate from "../../public/images/material ui.png";
import mongo from "../../public/images/mongodb.png";
import next from "../../public/images/next.png";
import node from "../../public/images/nodeJs.png";
import post from "../../public/images/postgre.png";
import react from "../../public/images/react.png";
import redux from "../../public/images/redux.svg";
import shadcn from "../../public/images/shadcn.png";
import github from "../../public/images/github.jpg";
import cloudinary from "../../public/images/cloudinary.png";
import render from "../../public/images/render.jpg";
import postman from "../../public/images/postman.webp";
import vercel from "../../public/images/Vercel.svg";
import netlify from "../../public/images/netlify.png";


export const skills = [

  { name: "HTML", icon: html, type: "frontend" },
  { name: "CSS", icon: css, type: "frontend"  },
  { name: "Bootstrap", icon: boot , type: "frontend" },
  { name: "Tailwind CSS", icon: tailwind , type: "frontend" },
  { name: "Material UI", icon: mate , type: "frontend" },
  { name: "Shadcn UI", icon: shadcn, type: "frontend"  },
  { name: "JavaScript", icon: js , type: "frontend" },
  {
    name: "TypeScript",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-typescript-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-7-pack-logos-icons-2945272.png?f=webp&w=256",
  },
  { name: "React.js", icon: react },
  {
    name: "Next.js",
    icon: next,
  },
  {
    name: "Redux",
    icon: redux,
  },
  { name: "Node.js", icon: node },
  { name: "Express.js", icon: xpress },
  { name: "MongoDB", icon: mongo },
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
    icon: post,
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
    icon: docker,
  },{
    name :"Cloudinary",
    icon: cloudinary,
  },
 {
    name: "GitHub",
    icon: github,
  },{
    name :"Netlify",
    icon: netlify,
  },
  {
    name :"Vercel",
    icon: vercel,
  },
  {
    name :"Postman",
    icon: postman,
  },{
    name : "Render",
    icon: render,
  }
]




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
