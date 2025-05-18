"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

import ThemeToggle from "./ThemeToggleBtn";
import  NextLink from "next/link";
import { useState } from "react";

const NavBar = () => {

  const navmenus = [
    { name: "About", path: "/#about" },
    { name: "Projects", path:   "/#projects" },

    { name: "Contact", path: "/#contact" },
  ];

  const navLinks = (
    <div className="flex flex-col items-center justify-center gap-5 w-fit lg:flex-row">
      <NextLink href="/">
        <p className="font-semibold cursor-pointer hover:text-[#9333EA] hover:delay-200 hover:scale-[102%] uppercase tracking-[4px] underline-animation">
         Home
        </p>
      </NextLink> 
      {navmenus.map((item, index) => (
        <NextLink
          key={index}
          href={item.path}
          className=" font-semibold cursor-pointer hover:text-[#9333EA] hover:delay-200 hover:scale-[102%] uppercase tracking-[4px] underline-animation "
        >
          {item.name}
        </NextLink>
      ))}
      <NextLink href="/blogs">
        <p className="font-semibold cursor-pointer hover:text-[#9333EA] hover:delay-200 hover:scale-[102%] uppercase tracking-[4px] underline-animation">
         Blogs
        </p>
      </NextLink> 
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent pointer-events-auto md:top-6 ">
      <div className="max-w-7xl mx-auto px-4 py-4   md:border border-b-[1px] md:rounded-md rounded backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <p className="text-3xl font-extrabold tracking-widest text-primary drop-shadow-md zayed">
                <span className=" bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                  Z
                </span>
                aye
                <span className=" bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#9333EA] ">
                  d
                </span>
              </p>
            </motion.div>
          </div>
          <div className="justify-center flex-grow hidden lg:flex">
            {navLinks}
          </div>
          <div className="lg:hidden">
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 mr-10 mt-6 z-100 dark:bg-[#1E293B] backdrop-blur-sm  dark:text-white rounded-xl bg-gray-50/30">
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="px-4 space-y-2">
                   <NextLink href="/">
        <p className="font-semibold cursor-pointer hover:text-[#9333EA] hover:delay-200 hover:scale-[102%] uppercase tracking-[4px] underline-animation w-fit">
         Home
        </p>
      </NextLink> 
     <div className="flex flex-col gap-2 w-fit ">
       {navmenus.map((item, index) => (
        <NextLink
          key={index}
          href={item.path}
       
          // spy={true}
          // smooth={true}
          // offset={-70}
          // duration={500}
          className=" font-semibold w-fit cursor-pointer hover:text-[#9333EA] hover:delay-200 hover:scale-[102%] uppercase tracking-[4px] underline-animation "
        >
          {item.name}
        </NextLink>
      ))}
     </div>
      <NextLink href="/blogs">
        <p className="font-semibold cursor-pointer hover:text-[#9333EA] hover:delay-200 hover:scale-[102%] uppercase tracking-[4px] mt-2 w-fit underline-animation">
         Blogs
        </p>
      </NextLink> 
                  <DropdownMenuItem>
                  <div className="flex items-center gap-2"> <p className="font-semibold cursor-pointer hover:text-[#9333EA] hover:delay-200 hover:scale-[102%] uppercase tracking-[4px] mt-2 w-fit underline-animation"></p> <ThemeToggle /></div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
