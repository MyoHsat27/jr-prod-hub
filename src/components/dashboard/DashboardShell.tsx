"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  {
    href: "/dashboard",
    label: "TRACKS",
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/socials",
    label: "SOCIALS",
    icon: (
      <svg
        className="h-4 w-4"
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
    ),
  },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/check")
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/dashboard/login");
        } else {
          setChecking(false);
        }
      })
      .catch(() => router.replace("/dashboard/login"));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/dashboard/login");
  };

  if (checking) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <span className="font-cyber text-xs uppercase tracking-wider text-neutral-600 animate-pulse">
          Verifying access...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="flex gap-6">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center border border-cyber-cyan/30 bg-background shadow-[0_0_15px_rgba(0,240,255,0.1)] lg:hidden"
          style={{
            clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
          }}
        >
          <svg
            className="h-5 w-5 text-cyber-cyan"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-56 border-r border-white/5 bg-background/95 backdrop-blur-lg p-4 transition-transform duration-300 lg:sticky lg:top-24 lg:z-0 lg:h-auto lg:w-48 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6">
            <span className="font-cyber text-[10px] uppercase tracking-[0.2em] text-neutral-600">
              Dashboard
            </span>
          </div>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive =
                link.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 font-cyber text-[11px] tracking-wider transition-all duration-200 ${
                    isActive
                      ? "border border-cyber-cyan/20 bg-cyber-cyan/5 text-cyber-cyan"
                      : "text-neutral-500 hover:bg-white/[0.02] hover:text-neutral-300"
                  }`}
                  style={{
                    clipPath: isActive
                      ? "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)"
                      : undefined,
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 border-t border-white/5 pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 font-cyber text-[11px] tracking-wider text-neutral-600 transition-colors hover:text-red-400"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              LOGOUT
            </button>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 font-cyber text-[10px] tracking-wider text-neutral-700 transition-colors hover:text-neutral-400"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              BACK TO SITE
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
