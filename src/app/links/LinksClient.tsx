"use client";

import { motion } from "framer-motion";
import PageTransition from "@/components/ui/PageTransition";
import GlowOrb from "@/components/ui/GlowOrb";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  visible: boolean;
}

const iconMap: Record<string, JSX.Element> = {
  youtube: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  soundcloud: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.099-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.192-1.308-.192-1.332c-.014-.057-.047-.094-.104-.094m1.844-1.26c-.06 0-.104.044-.11.1l-.207 2.586.207 2.482c.006.06.05.1.11.1.057 0 .1-.04.11-.1l.232-2.482-.232-2.586c-.01-.06-.053-.1-.11-.1m.925-.442c-.067 0-.12.054-.12.12l-.18 3.148.18 2.983c0 .066.053.12.12.12.063 0 .12-.054.12-.12l.203-2.983-.203-3.148c0-.066-.057-.12-.12-.12m.976-.333c-.073 0-.13.06-.137.13l-.162 3.6.162 3.122c.007.067.064.127.137.127.07 0 .126-.06.133-.127l.186-3.122-.186-3.6c-.007-.07-.063-.13-.133-.13m1.036-.375c-.083 0-.147.066-.147.15l-.15 3.89.15 3.22c0 .08.064.15.147.15.08 0 .144-.07.15-.15l.17-3.22-.17-3.89c-.006-.084-.07-.15-.15-.15m1.063-.477c-.09 0-.157.073-.157.16l-.136 4.294.136 3.248c0 .09.067.16.157.16.087 0 .157-.07.163-.16l.153-3.248-.153-4.294c-.006-.087-.076-.16-.163-.16m1.08-.19c-.094 0-.17.08-.176.17l-.126 4.508.126 3.28c.006.094.082.17.176.17.09 0 .164-.076.17-.17l.142-3.28-.142-4.508c-.006-.09-.08-.17-.17-.17m1.993-.18c-.1 0-.18.08-.186.18l-.105 4.702.105 3.252c.006.1.086.18.186.18.097 0 .177-.08.183-.18l.12-3.252-.12-4.702c-.006-.1-.086-.18-.183-.18m1.086.018c-.105 0-.19.085-.19.19l-.1 4.502.1 3.27c0 .105.085.19.19.19.103 0 .187-.085.193-.19l.112-3.27-.112-4.502c-.006-.105-.09-.19-.193-.19m1.096-.105c-.112 0-.2.09-.207.2l-.087 4.632.087 3.27c.007.11.095.2.207.2.107 0 .195-.09.2-.2l.098-3.27-.098-4.632c-.005-.11-.093-.2-.2-.2m2.192-1.072c-.06-.006-.12-.006-.183-.006a4.968 4.968 0 0 0-1.028.108c-.117 0-.208.095-.214.21l-.072 5.594.072 3.22c.006.12.097.21.214.21.112 0 .2-.09.212-.21l.08-3.22-.08-5.486c-.005-.12-.1-.217-.214-.217l.213-.003zM21.2 7.94c-.345 0-.672.063-.977.18A5.59 5.59 0 0 0 14.66 3c-.66 0-1.297.124-1.884.348-.226.087-.286.178-.29.35v10.478c.005.18.15.33.33.345H21.2a2.88 2.88 0 0 0 2.8-2.882 2.88 2.88 0 0 0-2.8-2.882v-.817z" />
    </svg>
  ),
  spotify: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  instagram: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  tiktok: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
};

const glowColors: Record<string, { glow: string; hover: string }> = {
  youtube: {
    glow: "rgba(255, 0, 0, 0.15)",
    hover: "hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(255,0,0,0.1)]",
  },
  soundcloud: {
    glow: "rgba(255, 136, 0, 0.15)",
    hover:
      "hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(255,136,0,0.1)]",
  },
  spotify: {
    glow: "rgba(30, 215, 96, 0.15)",
    hover:
      "hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(30,215,96,0.1)]",
  },
  instagram: {
    glow: "rgba(225, 48, 108, 0.15)",
    hover:
      "hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(225,48,108,0.1)]",
  },
  tiktok: {
    glow: "rgba(0, 240, 255, 0.15)",
    hover:
      "hover:border-cyber-cyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]",
  },
};

export default function LinksClient({ socials }: { socials: SocialLink[] }) {
  const visibleLinks = socials.filter((s) => s.visible);

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-lg px-6 py-20">
        {/* Background orbs */}
        <GlowOrb
          color="rgba(0, 240, 255, 0.06)"
          size={300}
          top="20%"
          left="20%"
          delay={0}
        />
        <GlowOrb
          color="rgba(184, 41, 255, 0.05)"
          size={250}
          top="70%"
          left="80%"
          delay={2}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12 text-center"
        >
          {/* Avatar */}
          <div className="relative mx-auto mb-6 h-20 w-20">
            <div
              className="flex h-full w-full items-center justify-center border border-cyber-cyan/30 bg-background shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            >
              <span className="font-cyber text-lg font-bold neon-text-cyan">
                JP
              </span>
            </div>
          </div>
          <h1 className="font-cyber text-2xl font-bold tracking-wider text-white">
            JR://PROD
          </h1>
          <p className="mt-2 font-cyber text-[10px] uppercase tracking-[0.3em] text-neutral-600">
            Beat Producer &middot; Sound Designer
          </p>
        </motion.div>

        {/* Social link cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="relative space-y-3"
        >
          {visibleLinks.map((link) => {
            const colors = glowColors[link.id] || {
              glow: "rgba(0, 240, 255, 0.15)",
              hover:
                "hover:border-cyber-cyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]",
            };
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                whileHover={{ x: 4 }}
                className={`group flex items-center gap-4 border border-white/6 bg-white/2 p-5 text-neutral-400 transition-all duration-300 ${colors.hover}`}
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                <div className="text-neutral-500 transition-colors duration-300 group-hover:text-white">
                  {iconMap[link.id] || (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-cyber text-sm font-medium tracking-wider text-neutral-400 transition-colors group-hover:text-white">
                  {link.name}
                </span>
                <svg
                  className="ml-auto h-4 w-4 text-neutral-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </PageTransition>
  );
}
