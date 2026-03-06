"use client";

export default function Scanlines() {
  return (
    <>
      {/* Horizontal scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-[90] opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.05) 2px, rgba(0, 240, 255, 0.05) 4px)",
        }}
      />
      {/* Moving scanline bar */}
      <div
        className="pointer-events-none fixed left-0 right-0 z-[91] h-[2px] animate-scanline opacity-[0.06]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.4), transparent)",
        }}
      />
    </>
  );
}
