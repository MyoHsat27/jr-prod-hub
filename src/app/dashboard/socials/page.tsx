"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import DashboardShell from "@/components/dashboard/DashboardShell";

interface SocialLink {
  id: string;
  name: string;
  url: string;
  visible: boolean;
}

export default function DashboardSocialsPage() {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchSocials = useCallback(async () => {
    const res = await fetch("/api/dashboard/socials");
    if (res.ok) {
      const data = await res.json();
      setSocials(data.socials);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSocials();
  }, [fetchSocials]);

  const handleUrlChange = (id: string, url: string) => {
    setSocials(socials.map((s) => (s.id === id ? { ...s, url } : s)));
    setSaved(false);
  };

  const handleToggleVisible = (id: string) => {
    setSocials(
      socials.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/dashboard/socials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ socials }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      // silent fail
    }
    setSaving(false);
  };

  const iconMap: Record<string, JSX.Element> = {
    youtube: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    soundcloud: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.049-.1-.099-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.308c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.192-1.308-.192-1.332c-.014-.057-.047-.094-.104-.094m1.844-1.26c-.06 0-.104.044-.11.1l-.207 2.586.207 2.482c.006.06.05.1.11.1.057 0 .1-.04.11-.1l.232-2.482-.232-2.586c-.01-.06-.053-.1-.11-.1m.925-.442c-.067 0-.12.054-.12.12l-.18 3.148.18 2.983c0 .066.053.12.12.12.063 0 .12-.054.12-.12l.203-2.983-.203-3.148c0-.066-.057-.12-.12-.12m.976-.333c-.073 0-.13.06-.137.13l-.162 3.6.162 3.122c.007.067.064.127.137.127.07 0 .126-.06.133-.127l.186-3.122-.186-3.6c-.007-.07-.063-.13-.133-.13m1.036-.375c-.083 0-.147.066-.147.15l-.15 3.89.15 3.22c0 .08.064.15.147.15.08 0 .144-.07.15-.15l.17-3.22-.17-3.89c-.006-.084-.07-.15-.15-.15m1.063-.477c-.09 0-.157.073-.157.16l-.136 4.294.136 3.248c0 .09.067.16.157.16.087 0 .157-.07.163-.16l.153-3.248-.153-4.294c-.006-.087-.076-.16-.163-.16m1.08-.19c-.094 0-.17.08-.176.17l-.126 4.508.126 3.28c.006.094.082.17.176.17.09 0 .164-.076.17-.17l.142-3.28-.142-4.508c-.006-.09-.08-.17-.17-.17m1.993-.18c-.1 0-.18.08-.186.18l-.105 4.702.105 3.252c.006.1.086.18.186.18.097 0 .177-.08.183-.18l.12-3.252-.12-4.702c-.006-.1-.086-.18-.183-.18m1.086.018c-.105 0-.19.085-.19.19l-.1 4.502.1 3.27c0 .105.085.19.19.19.103 0 .187-.085.193-.19l.112-3.27-.112-4.502c-.006-.105-.09-.19-.193-.19m1.096-.105c-.112 0-.2.09-.207.2l-.087 4.632.087 3.27c.007.11.095.2.207.2.107 0 .195-.09.2-.2l.098-3.27-.098-4.632c-.005-.11-.093-.2-.2-.2m2.192-1.072c-.06-.006-.12-.006-.183-.006a4.968 4.968 0 0 0-1.028.108c-.117 0-.208.095-.214.21l-.072 5.594.072 3.22c.006.12.097.21.214.21.112 0 .2-.09.212-.21l.08-3.22-.08-5.486c-.005-.12-.1-.217-.214-.217l.213-.003zM21.2 7.94c-.345 0-.672.063-.977.18A5.59 5.59 0 0 0 14.66 3c-.66 0-1.297.124-1.884.348-.226.087-.286.178-.29.35v10.478c.005.18.15.33.33.345H21.2a2.88 2.88 0 0 0 2.8-2.882 2.88 2.88 0 0 0-2.8-2.882v-.817z" />
      </svg>
    ),
    spotify: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
    instagram: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    tiktok: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  };

  return (
    <DashboardShell>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-cyber text-lg font-bold tracking-wider text-white">
            SOCIAL LINKS
          </h1>
          <p className="mt-1 font-cyber text-[10px] uppercase tracking-[0.2em] text-neutral-600">
            Manage your social profiles
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-2 font-cyber text-[11px] font-bold uppercase tracking-wider text-cyber-cyan transition-all duration-300 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] disabled:opacity-50"
          style={{
            clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
          }}
        >
          {saving ? "Saving..." : saved ? "✓ Saved" : "Save Changes"}
        </button>
      </div>

      {/* Social links list */}
      {loading ? (
        <div className="py-20 text-center font-cyber text-xs text-neutral-600 animate-pulse">
          Loading socials...
        </div>
      ) : (
        <div className="space-y-3">
          {socials.map((social, i) => (
            <motion.div
              key={social.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-4 border p-4 transition-all ${
                social.visible
                  ? "border-white/5 bg-white/[0.015]"
                  : "border-white/[0.02] bg-white/[0.005] opacity-50"
              }`}
            >
              {/* Icon */}
              <div className="shrink-0 text-neutral-400">
                {iconMap[social.id] || (
                  <svg
                    className="h-5 w-5"
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

              {/* Name */}
              <div className="w-24 shrink-0">
                <span className="font-cyber text-xs font-medium tracking-wider text-neutral-300">
                  {social.name}
                </span>
              </div>

              {/* URL input */}
              <div className="min-w-0 flex-1">
                <input
                  value={social.url}
                  onChange={(e) => handleUrlChange(social.id, e.target.value)}
                  className="w-full border border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-xs text-neutral-300 outline-none transition-colors focus:border-cyber-cyan/30 focus:text-white"
                  placeholder="https://..."
                />
              </div>

              {/* Visibility toggle */}
              <button
                onClick={() => handleToggleVisible(social.id)}
                className={`shrink-0 p-2 transition-colors ${
                  social.visible
                    ? "text-cyber-cyan"
                    : "text-neutral-600 hover:text-neutral-400"
                }`}
                title={
                  social.visible
                    ? "Visible — click to hide"
                    : "Hidden — click to show"
                }
              >
                {social.visible ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Help text */}
      <div className="mt-6 border-t border-white/5 pt-4">
        <p className="font-cyber text-[10px] text-neutral-600">
          Toggle the eye icon to show or hide a social link on your public links
          page. Changes are saved when you click &ldquo;Save Changes&rdquo;.
        </p>
      </div>
    </DashboardShell>
  );
}
