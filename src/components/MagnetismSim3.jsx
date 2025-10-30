import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  Magnetic Field Explorer — click-to-place magnet (no drag)
  - Click inside the box to place the magnet instantly
  - Iron filings align smoothly toward the magnet position
  - Reset returns the magnet to center
*/

export default function MagneticFieldExplorerClick() {
  const containerRef = useRef(null);

  // play area size (match CSS below)
  const BOX_W = 700;
  const BOX_H = 400;

  // filings grid (positions are container-local)
  const initialFilings = React.useMemo(() => {
    const list = [];
    const cols = 12;
    const rows = 6;
    const startX = 60;
    const startY = 50;
    const stepX = 50;
    const stepY = 50;
    let id = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          id: id++,
          x: startX + c * stepX,
          y: startY + r * stepY,
        });
      }
    }
    return list;
  }, []);

  // magnet position (container-local coordinates). Start center.
  const [magnet, setMagnet] = useState({ x: BOX_W / 2, y: BOX_H / 2 });
  const [filings, setFilings] = useState(initialFilings);
  const [showArrows, setShowArrows] = useState(false);

  // compute rotation & intensity for a filing given current magnet position
  const computeFor = (f) => {
    const dx = magnet.x - f.x;
    const dy = magnet.y - f.y;
    const angle = Math.atan2(dy, dx); // radians
    const dist = Math.hypot(dx, dy);
    // intensity 0..1 (closer -> stronger)
    const intensity = Math.max(0, 1 - dist / Math.sqrt(BOX_W * BOX_W + BOX_H * BOX_H));
    return { angle, intensity, dist };
  };

  // when magnet changes, update filings' derived states (here we keep filings static positions
  // but use computeFor in render for rotation+opacity; optionally we can set a small state tick
  // to trigger motion re-rendering)
  useEffect(() => {
    // small tick to nudge framer-motion updates if required
    setFilings((s) => s.slice());
  }, [magnet]);

  // place magnet at container-local coords when user clicks play area
  const handlePlaceMagnet = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    // clamp inside box
    const x = Math.max(16, Math.min(BOX_W - 16, localX));
    const y = Math.max(16, Math.min(BOX_H - 16, localY));
    setMagnet({ x, y });
  };

  const handleReset = () => {
    setMagnet({ x: BOX_W / 2, y: BOX_H / 2 });
    setShowArrows(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-100 to-blue-200">
      <h1 className="text-3xl font-bold text-blue-800 mb-3">🧭 Magnetic Field Explorer</h1>
      <p className="text-gray-700 mb-4 text-center max-w-2xl">
        Click anywhere inside the box to place the magnet. The iron filings align to show the field.
        Toggle "Show field lines" to display subtle direction arrows.
      </p>

      <div
        ref={containerRef}
        onClick={handlePlaceMagnet}
        className="relative bg-white w-[700px] h-[400px] rounded-3xl shadow-lg border-4 border-blue-300 overflow-hidden cursor-crosshair"
        style={{ userSelect: "none" }}
      >
        {/* optional field lines arrows */}
        {showArrows && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {filings.map((f) => {
              const { angle, intensity } = computeFor(f);
              const len = 12 + intensity * 18;
              const x1 = f.x;
              const y1 = f.y;
              const x2 = x1 + Math.cos(angle) * len;
              const y2 = y1 + Math.sin(angle) * len;
              const opacity = 0.15 + intensity * 0.6;
              return (
                <line
                  key={`a-${f.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={`rgba(59,130,246, ${opacity})`}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        )}

        {/* filings */}
        {filings.map((f) => {
          const { angle, intensity } = computeFor(f);
          // angle in radians -> convert to degrees for CSS rotate
          const deg = (angle * 180) / Math.PI;
          const opacity = 0.25 + intensity * 0.75; // visible near magnet
          const scale = 0.9 + intensity * 0.6;
          return (
            <motion.div
              key={f.id}
              className="absolute origin-center"
              style={{
                left: f.x,
                top: f.y,
                width: 4,
                height: 16,
                borderRadius: 6,
                background: "#4b5563",
                transformOrigin: "center center",
              }}
              animate={{
                rotate: deg,
                opacity,
                scale,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          );
        })}

        {/* magnet (placed by click) */}
        <div
          className="absolute w-12 h-12 bg-red-500 rounded-full border-4 border-gray-700 flex items-center justify-center text-white text-xl shadow-lg"
          style={{
            left: magnet.x - 24,
            top: magnet.y - 24,
            pointerEvents: "none", // so clicks go to container
          }}
        >
          🧲
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setShowArrows((s) => !s)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          {showArrows ? "Hide field arrows" : "Show field arrows"}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Reset
        </button>

        <p className="text-gray-700 ml-2">Click inside the box to move magnet</p>
      </div>
    </div>
  );
}
