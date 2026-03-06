"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardShell from "@/components/dashboard/DashboardShell";

interface Track {
  id: string;
  title: string;
  genre: string;
  cover: string;
  audioUrl: string;
  releaseDate: string;
  featured: boolean;
}

const emptyForm = {
  title: "",
  genre: "",
  cover: "",
  audioUrl: "",
  releaseDate: "",
  featured: false,
};

export default function DashboardTracksPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchTracks = useCallback(async () => {
    const res = await fetch("/api/dashboard/tracks");
    if (res.ok) {
      const data = await res.json();
      setTracks(data.tracks);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (track: Track) => {
    setForm({
      title: track.title,
      genre: track.genre,
      cover: track.cover,
      audioUrl: track.audioUrl,
      releaseDate: track.releaseDate,
      featured: track.featured,
    });
    setEditingId(track.id);
    setError("");
    setShowModal(true);
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);

    try {
      const url = editingId
        ? `/api/dashboard/tracks/${editingId}`
        : "/api/dashboard/tracks";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        setSaving(false);
        return;
      }

      setShowModal(false);
      await fetchTracks();
    } catch {
      setError("Something went wrong");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/dashboard/tracks/${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    await fetchTracks();
  };

  const handleSetFeatured = async (track: Track) => {
    await fetch(`/api/dashboard/tracks/${track.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: true }),
    });
    await fetchTracks();
  };

  return (
    <DashboardShell>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-cyber text-lg font-bold tracking-wider text-white">
            TRACKS
          </h1>
          <p className="mt-1 font-cyber text-[10px] uppercase tracking-[0.2em] text-neutral-600">
            Manage your music library
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-2 font-cyber text-[11px] font-bold uppercase tracking-wider text-cyber-cyan transition-all duration-300 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          style={{
            clipPath: "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)",
          }}
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Track
        </button>
      </div>

      {/* Track list */}
      {loading ? (
        <div className="py-20 text-center font-cyber text-xs text-neutral-600 animate-pulse">
          Loading tracks...
        </div>
      ) : tracks.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-cyber text-xs text-neutral-600">No tracks yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-4 border border-white/5 bg-white/[0.015] p-4 transition-colors hover:border-white/10"
            >
              {/* Track info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-white text-sm">
                    {track.title}
                  </span>
                  {track.featured && (
                    <span className="shrink-0 border border-cyber-cyan/30 bg-cyber-cyan/10 px-2 py-0.5 font-cyber text-[9px] text-cyber-cyan">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <span className="font-cyber text-[10px] text-neutral-500">
                    {track.genre}
                  </span>
                  <span className="text-neutral-700">·</span>
                  <span className="font-mono text-[10px] text-neutral-600">
                    {track.releaseDate}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1 opacity-60 transition-opacity group-hover:opacity-100">
                {!track.featured && (
                  <button
                    onClick={() => handleSetFeatured(track)}
                    className="p-2 text-neutral-500 transition-colors hover:text-cyber-cyan"
                    title="Set as featured"
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => openEdit(track)}
                  className="p-2 text-neutral-500 transition-colors hover:text-white"
                  title="Edit"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteConfirm(track.id)}
                  className="p-2 text-neutral-500 transition-colors hover:text-red-400"
                  title="Delete"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm border border-white/10 bg-[#0a0a0a] p-6"
            >
              <h3 className="font-cyber text-sm font-bold text-white">
                Delete Track?
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                This action cannot be undone.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 font-cyber text-[11px] text-neutral-400 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="border border-red-500/30 bg-red-500/10 px-4 py-2 font-cyber text-[11px] text-red-400 transition-all hover:border-red-500/60 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto border border-white/10 bg-[#0a0a0a] p-6"
            >
              <h3 className="font-cyber text-sm font-bold tracking-wider text-white">
                {editingId ? "EDIT TRACK" : "ADD TRACK"}
              </h3>

              {error && (
                <div className="mt-3 border border-red-500/30 bg-red-500/5 p-3 text-center font-cyber text-xs text-red-400">
                  {error}
                </div>
              )}

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block font-cyber text-[10px] uppercase tracking-wider text-neutral-500">
                    Title *
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-cyber-cyan/40"
                    placeholder="Track title"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-cyber text-[10px] uppercase tracking-wider text-neutral-500">
                    Genre *
                  </label>
                  <input
                    value={form.genre}
                    onChange={(e) =>
                      setForm({ ...form, genre: e.target.value })
                    }
                    className="w-full border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-cyber-cyan/40"
                    placeholder="e.g. EDM, Hip-Hop, R&B"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-cyber text-[10px] uppercase tracking-wider text-neutral-500">
                    Cover Image (Google Drive Link) *
                  </label>
                  <input
                    value={form.cover}
                    onChange={(e) =>
                      setForm({ ...form, cover: e.target.value })
                    }
                    className="w-full border border-white/10 bg-white/[0.03] px-3 py-2.5 font-mono text-xs text-white outline-none transition-colors focus:border-cyber-cyan/40"
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-cyber text-[10px] uppercase tracking-wider text-neutral-500">
                    Audio URL (Google Drive Link) *
                  </label>
                  <input
                    value={form.audioUrl}
                    onChange={(e) =>
                      setForm({ ...form, audioUrl: e.target.value })
                    }
                    className="w-full border border-white/10 bg-white/[0.03] px-3 py-2.5 font-mono text-xs text-white outline-none transition-colors focus:border-cyber-cyan/40"
                    placeholder="https://drive.google.com/file/d/..."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-cyber text-[10px] uppercase tracking-wider text-neutral-500">
                    Release Date *
                  </label>
                  <input
                    type="date"
                    value={form.releaseDate}
                    onChange={(e) =>
                      setForm({ ...form, releaseDate: e.target.value })
                    }
                    className="w-full border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-cyber-cyan/40"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, featured: !form.featured })
                    }
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      form.featured
                        ? "bg-cyber-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                        : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-all ${
                        form.featured
                          ? "translate-x-5 bg-cyber-cyan"
                          : "bg-neutral-500"
                      }`}
                    />
                  </button>
                  <span className="font-cyber text-[10px] uppercase tracking-wider text-neutral-400">
                    Featured Track
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 font-cyber text-[11px] text-neutral-400 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="border border-cyber-cyan/30 bg-cyber-cyan/5 px-5 py-2 font-cyber text-[11px] font-bold uppercase tracking-wider text-cyber-cyan transition-all hover:border-cyber-cyan/60 hover:bg-cyber-cyan/10 disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingId ? "Update" : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
