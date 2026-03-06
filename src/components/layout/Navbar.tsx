"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/music", label: "MUSIC" },
  { href: "/about", label: "ABOUT" },
  { href: "/links", label: "LINKS" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-cyber-cyan/0 ${
        scrolled
          ? "glass-panel-strong border-b border-cyber-cyan/10 shadow-lg shadow-cyber-cyan/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group relative">
          <span className="font-cyber text-lg font-bold tracking-widest neon-text-cyan">
            J.P
          </span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.5)] transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 border border-cyber-cyan/20 bg-cyber-cyan/5"
                    style={{
                      clipPath:
                        "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 font-cyber text-[11px] font-medium tracking-wider transition-colors duration-300 ${
                    isActive
                      ? "neon-text-cyan"
                      : "text-neutral-600 hover:text-cyber-cyan/70"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
        >
          <div className="relative h-4 w-5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="absolute top-0 left-0 h-[1.5px] w-full bg-cyber-cyan shadow-[0_0_6px_rgba(0,240,255,0.5)]"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={
                mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }
              }
              className="absolute top-[6px] left-0 h-[1.5px] w-full bg-cyber-cyan shadow-[0_0_6px_rgba(0,240,255,0.5)]"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="absolute top-[12px] left-0 h-[1.5px] w-full bg-cyber-cyan shadow-[0_0_6px_rgba(0,240,255,0.5)]"
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center bg-[#050505]/98 md:hidden"
          >
            {/* Background grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="relative flex flex-col items-center gap-2"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-8 py-4 text-center font-cyber text-3xl font-bold tracking-wider transition-colors ${
                      pathname === link.href
                        ? "neon-text-cyan"
                        : "text-neutral-600 hover:neon-text-cyan"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
