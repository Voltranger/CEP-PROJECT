import React, { useRef, useEffect, useState } from "react";

export default function MagnetAttraction() {
  const canvasRef = useRef(null);
  const [magnetPos, setMagnetPos] = useState({ x: 250, y: 150 });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 400;

    // Objects: some metals, some non-metals
    const objects = [
      { x: 100, y: 300, metal: true },
      { x: 180, y: 90, metal: true },
      { x: 450, y: 300, metal: false },
      { x: 520, y: 140, metal: true },
      { x: 300, y: 70, metal: false },
    ];

    let raf;

    function drawMagnet(ctx, pos) {
      ctx.save();
      ctx.translate(pos.x, pos.y);

      const width = 80, height = 30;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.roundRect(-width / 2, -height / 2, width / 2, height, 6);
      ctx.fill();

      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.roundRect(0, -height / 2, width / 2, height, 6);
      ctx.fill();

      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.strokeRect(-width / 2, -height / 2, width, height);

      ctx.fillStyle = "white";
      ctx.font = "14px sans-serif";
      ctx.fillText("N", -width / 2 + 10, 5);
      ctx.fillText("S", width / 2 - 20, 5);

      ctx.restore();
    }

    function drawObjects() {
      objects.forEach((obj) => {
        if (running && obj.metal) {
          // move slightly towards magnet
          const dx = magnetPos.x - obj.x;
          const dy = magnetPos.y - obj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 5) {
            obj.x += (dx / dist) * 1.2;
            obj.y += (dy / dist) * 1.2;
          }
        }

        // Shiny balls
        const gradient = ctx.createRadialGradient(
          obj.x - 5,
          obj.y - 5,
          5,
          obj.x,
          obj.y,
          15
        );
        if (obj.metal) {
          gradient.addColorStop(0, "#e5e7eb");
          gradient.addColorStop(1, "#6b7280");
        } else {
          gradient.addColorStop(0, "#bbf7d0");
          gradient.addColorStop(1, "#15803d");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#1e293b";
        ctx.stroke();
      });
    }

    function drawBackground() {
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "#f8fafc");
      bg.addColorStop(1, "#e2e8f0");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function animate() {
      drawBackground();
      drawMagnet(ctx, magnetPos);
      drawObjects();

      // Instructions
      ctx.fillStyle = "#334155";
      ctx.font = "16px sans-serif";
      ctx.fillText("Gray = Metal (moves when started)", 20, canvas.height - 40);
      ctx.fillText("Green = Non-metal (always static)", 20, canvas.height - 20);

      raf = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, [magnetPos, running]);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-semibold mb-4">Magnet Attraction Simulation</h2>
      <canvas ref={canvasRef} className="rounded-xl shadow-lg border mb-4" />
      <button
        onClick={() => setRunning(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        Start Simulation
      </button>
    </div>
  );
}
