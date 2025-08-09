"use client";

import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "../../../public/favicon.svg";
import ReuseableButton from "../Reuseable/ReuseableButton";
export interface MorphingNavigationLink {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const MorphingNavigation: React.FC<{
  links: MorphingNavigationLink[];
}> = ({ links }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 100);
      if (window.scrollY >= 100) setIsMenuOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const morphingNavbar = (
    <motion.header
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 bg-[rgba(0,15,6,0.32)]  transition-all",

        isSticky && "max-w-[1400px] mx-auto lg:rounded-xl md:mt-4"
      )}
      style={{
        boxShadow: isSticky ? "0 8px 32px 0 rgba(0,0,0,0.18)" : undefined,
        minHeight: 80,
      }}
    >
      <div
        className={classNames(
          "flex items-center justify-between w-full",
          "px-4 md:px-6 py-4",
          "lg:max-w-[1400px] lg:mx-auto lg:px-10"
        )}
        style={{ minHeight: 80 }}
      >
        <Link
          href="https://www.fiverr.com/shopify_manir"
          className="flex items-center gap-2"
        >
          <div className="w-[160px] h-[40px]">
            <Image src={logo} alt="logo" quality={100} />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Link href="https://www.fiverr.com/shopify_manir">
              <ReuseableButton title="GET A QUOTE" />
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className="ml-2 flex items-center justify-center w-12 h-12 rounded-full bg-[#6ee42b] cursor-pointer hover:bg-[#42c822] transition-all duration-200"
            aria-label="Open menu"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto"
            >
              <rect x="5" y="7" width="14" height="2" rx="1" fill="#fff" />
              <rect x="5" y="11" width="14" height="2" rx="1" fill="#fff" />
              <rect x="5" y="15" width="14" height="2" rx="1" fill="#fff" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(10,30,14,0.60)] backdrop-blur-[6px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
        flex flex-col items-center justify-center
        bg-gradient-to-br from-[#102616ee] to-[#193c24ee] 
        rounded-3xl border-2 border-[#42c822] shadow-2xl
        max-w-sm w-[90vw] px-8 py-10 relative
      "
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                aria-label="Close Menu"
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-5 right-5 text-white/70 hover:text-[#42c822]  cursor-pointer transition"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>

              <div className="w-[160px] h-[48px] mb-12">
                <Link
                  href="https://www.fiverr.com/shopify_manir"
                  className="block w-full h-full"
                >
                  <Image
                    src={logo}
                    alt="logo"
                    quality={100}
                    className="object-contain w-full h-full"
                  />
                </Link>
              </div>

              <nav className="flex flex-col w-full gap-2">
                {links.map((link) => (
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    key={link.id}
                    href={link.href}
                    passHref
                  >
                    <motion.div
                      whileHover={{ scale: 1.08, color: "#42c822" }}
                      whileTap={{ scale: 0.96 }}
                      className="block py-2 px-4 rounded-lg text-lg font-medium text-white/90 text-center tracking-wide transition-colors duration-200 hover:bg-[linear-gradient(90deg,#42c82222,#193c24_70%)] uppercase"
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        ref={navRef}
        className="fixed top-0  inset-x-0 z-50  "
        animate={{
          borderRadius: isSticky && isMobile ? 9999 : isSticky ? 9999 : 0,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          color: "#fff",
          margin: isSticky ? "0 auto" : "0",
          paddingTop: isSticky ? 10 : 16,
          paddingBottom: isSticky ? 10 : 16,
          // background: isSticky ? "" : "rgba(0, 15, 6, 0.32)",
          // backdropFilter: isSticky ? "" : "blur(8px)",
        }}
      >
        <nav
          className={classNames(
            "flex items-center w-full max-w-[1400px] mx-auto px-4 md:px-6 blur-[6px]",
            {
              "justify-between": isMobile,
              "justify-center": !isMobile && !isSticky,
            }
          )}
        >
          <div
            className={classNames("flex items-center cursor-pointer", {
              "mx-auto": isSticky,
            })}
          >
            <div className=" flex  items-center justify-center cursor-pointer blur">
              {/* {isSticky
                ? morphingNavbar : */}
              {/* // <div className="w-[160px] h-[40px]">
                  //   <Link href="/">
                  //     <Image src={logo} alt="logo" quality={100} />
                  //   </Link>
                  // </div> */}
              {morphingNavbar}
              {/* } */}
            </div>
          </div>

          {isMobile &&
            !isSticky &&
            //   <button
            //     onClick={toggleMenu}
            //     className="block lg:hidden bg-[rgba(0,15,6,0.9)] cursor-pointer"
            //   >
            //     <div className="flex flex-col items-center justify-center">
            //       <span className="w-5 h-0.5 bg-white mb-1" />
            //       <span className="w-5 h-0.5 bg-white mb-1" />
            //       <span className="w-5 h-0.5 bg-white" />
            //     </div>
            //   </button>
            morphingNavbar}

          {/* {!isMobile && !isSticky && (
            <div className="flex-1 flex justify-center space-x-8">
              {links.map((link) => (
                <Link key={link.id} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-xl hover:text-primary"
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </div>
          )} */}

          {/* {!isMobile && !isSticky && (
            <ReuseableButton title=" GET A QUOTE"></ReuseableButton>
          )} */}
        </nav>
      </motion.header>
    </>
  );
};

export default MorphingNavigation;
