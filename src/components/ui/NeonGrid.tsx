"use client";

export default function NeonGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Perspective grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60vh] animate-grid-scroll opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center bottom",
        }}
      />
      {/* Vertical grid lines (flat) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
