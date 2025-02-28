import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import xpress from "../../public/images/expressJs.png";
import boot from "../../public/images/icons8-bootstrap-240.png";
import css from "../../public/images/icons8-css3-144.png";
import html from "../../public/images/icons8-html-5-240.png";
import js from "../../public/images/icons8-js-240.png";
import tailwind from "../../public/images/icons8-tailwindcss-240.png";
import mate from "../../public/images/material ui.png";
import mongo from "../../public/images/mongodb.png";
import node from "../../public/images/nodeJs.png";
import react from "../../public/images/react.png";


export const skills = [

  { name: "HTML", icon: html },
  { name: "CSS", icon: css },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Bootstrap", icon: boot },
  { name: "Material UI", icon: mate },
  { name: "JavaScript", icon: js },
  {
    name: "TypeScript",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-typescript-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-7-pack-logos-icons-2945272.png?f=webp&w=256",
  },
  { name: "React.js", icon: react },
  {
    name: "Next.js",
    icon: "https://logowik.com/content/uploads/images/nextjs7685.logowik.com.webp",
  },
  {
    name: "Redux",
    icon: "https://miro.medium.com/v2/resize:fit:1400/1*AJpFZrofvxMn3MHh9p3i_Q.jpeg",
  },
  { name: "Node.js", icon: node },
  { name: "Express.js", icon: xpress },
  { name: "MongoDB", icon: mongo },
  {
    name: "Mongoose",
    icon: "https://miro.medium.com/v2/resize:fit:1050/1*OYpEW3PMltGC2MVvJ-5QTw.png",
  },
  {
    name: "Prisma",
    icon: "https://miro.medium.com/v2/resize:fit:1024/1*sRnURmqek5n5ozXwUrp5kQ.jpeg",
  },
  {
    name: "PostgreSQL",
    icon: "https://w7.pngwing.com/pngs/441/460/png-transparent-postgresql-plain-wordmark-logo-icon-thumbnail.png",
  },
  {
    name: "GraphQL",
    icon: "https://w7.pngwing.com/pngs/47/318/png-transparent-graphql-playground-macos-bigsur-icon-thumbnail.png",
  },
  {
    name: "Docker",
    icon: "https://e7.pngegg.com/pngimages/219/411/png-clipart-docker-logo-kubernetes-microservices-cloud-computing-dockers-logo-text-logo-thumbnail.png",
  },
  {
    name: "AWS",
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-aws-logo-icon-download-in-svg-png-gif-file-formats--cloud-computing-network-server-database-brand-pack-logos-icons-1583149.png?f=webp&w=256",
  },
  {
    name: "Jest",
    icon: "https://e7.pngegg.com/pngimages/755/519/png-clipart-jest-logo-tech-companies-thumbnail.png",
  },
];






export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
