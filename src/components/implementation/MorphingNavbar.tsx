"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Aurora from "../shared/Aurora";


export interface MorphingNavigationLink {
  id: string;
  label: string;
  href: string;
}

const navLinks: MorphingNavigationLink[] = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About", href: "/#about" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "dashboard", label: "Dashboard", href: "/login" },
];

const MorphingNavigation: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sticky morph effect
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY >= 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((s) => !s);

  // Robust smooth scroll + close menu
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
    if (e) e.preventDefault();

    // Close modal immediately
    setIsMenuOpen(false);

    // Smooth scroll if fragment exists
    const fragmentIndex = href.indexOf("#");
    const fragment = fragmentIndex >= 0 ? href.slice(fragmentIndex) : href;

    if (fragment.startsWith("#")) {
      const target = document.querySelector(fragment);
      if (target) {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // fallback navigation
      window.location.href = href;
    }
  };

  return (
    <>
      {/* Blur backdrop for open menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Header is fixed near top so navbar is always reachable */}
      <motion.header
        className="fixed top-4 z-50 w-full"
        animate={{ top: 20 }}
        transition={{ duration: 0.35 }}
      >

        <motion.nav
          ref={navRef}
          className={cn(
            "flex justify-center items-center mx-auto backdrop-blur-md border border-white/10 text-white fixed",
            isSticky || isMobile ? "left-0 right-0 px-4" : "left-1/2 -translate-x-1/2"
          )}
          // Use numeric pixels for animate (Framer expects numbers -> px)
          animate={{
            height: isMobile || isSticky ? 80 : 90,
            width: isMobile || isSticky ? 320 : 1280, // desktop wide, mobile/sticky narrower visually
            borderRadius: 9999,
          }}
          transition={{ duration: 0.28 }}
          style={{ top: isMobile ? 0 : 20 }}
        >

          {/* Full navbar (desktop, not sticky) */}
          <AnimatePresence>
            {!isMobile && !isSticky && (
              <motion.div
                className="flex justify-between items-center gap-8 z-50 px-8 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >

                {/* Brand */}
                <div>

                  <p className="text-3xl font-extrabold tracking-widest text-white drop-shadow-md">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">Z</span>
                    aye
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#9333EA]">d</span>
                  </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">

                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-semibold uppercase tracking-[4px] text-gray-200 hover:text-[#9333EA] hover:scale-[102%] transition-all underline-animation"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div aria-hidden >

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hamburger for mobile or sticky state */}
          {(isSticky || isMobile) && (
            <motion.button
              onClick={toggleMenu}
              aria-label="Open menu"
              className="absolute z-50 w-[60px] h-[60px] rounded-full border border-white/20 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >

              <span className="block w-5 h-0.5 bg-white my-0.5" />
              <span className="block w-5 h-0.5 bg-white my-0.5" />
              <span className="block w-5 h-0.5 bg-white my-0.5" />
            </motion.button>
          )}
        </motion.nav>
      </motion.header>

      {/* Fullscreen modal menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DialogContent asChild>
              <div className="fixed inset-0 flex items-center justify-center z-50 p-0 bg-black/40 backdrop-blur-md">
                <div className="absolute  top-0 w-full left-0 right-0 rounded-full">
                  <Aurora

                    blend={1}
                    amplitude={0.5}
                    speed={2}
                  />
                </div>
                <motion.div
                  className="morphing-menu-modal bg-gradient-to-br from-[#1E1B2E]/90 to-[#0F172A]/90 rounded-3xl border border-[#9333EA]/30 shadow-xl p-10 w-[90%] max-w-sm flex flex-col items-center justify-start space-y-10 relative"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >

                  {/* Close button */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-[#9333EA] p-2"
                  >
                    ✕
                  </button>

                  {/* Branding */}
                  <div>
                    <p className="text-4xl font-extrabold tracking-widest text-white drop-shadow-md mb-6">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                        Z
                      </span>
                      aye
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#9333EA]">
                        d
                      </span>
                    </p>
                  </div>

                  {/* Navigation links */}
                  <div className="flex flex-col gap-6 w-full pb-10 text-center">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="font-semibold uppercase tracking-[4px] w-fit mx-auto text-gray-200 hover:text-[#9333EA] hover:scale-[102%] transition-all underline-animation"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

    </>
  );
};

export default MorphingNavigation;
