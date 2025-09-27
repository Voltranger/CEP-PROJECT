import { useState, useRef } from "react";

export default function Projectile() {
  const [angle, setAngle] = useState(45);
  const [speed, setSpeed] = useState(20);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ maxHeight: 0, range: 0, time: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState("");
  const g = 9.8;
  const intervalRef = useRef(null);

  // Scaling factor: 1m → 10px
  const scale = 10;

  // Ball radius in meters (≈ 18px when scaled)
  const ballRadius = 0.9;

  // Basket position in **meters**
  const basket = { 
    x: 60,     // 60m away
    y: 0,      // ground level
    width: 10,  // 3m wide
    height: 2  // 2m tall
  };

  const simulate = () => {
    clearInterval(intervalRef.current);
    setBallPos({ x: 0, y: 0 });
    setIsAnimating(true);
    setMessage("");

    const rad = (angle * Math.PI) / 180;
    const vx = speed * Math.cos(rad);
    const vy = speed * Math.sin(rad);
    const dt = 0.05;
    let t = 0;
    let maxY = 0;
    let scored = false;

    intervalRef.current = setInterval(() => {
      const x = vx * t;
      const y = vy * t - 0.5 * g * t * t;

      if (y < 0) {
        clearInterval(intervalRef.current);
        setIsAnimating(false);
        setStats({
          maxHeight: maxY.toFixed(2),
          range: x.toFixed(2),
          time: t.toFixed(2),
        });

        if (!scored) setMessage("❌ Missed! Try again.");
        return;
      }

      if (y > maxY) maxY = y;

      setBallPos({ x, y });

      // --- Basket bounds in meters ---
      const basketLeft = basket.x;
      const basketRight = basket.x + basket.width;
      const basketBottom = basket.y + basket.height;

      // --- Check if ball is inside basket ---
      if (
        x + ballRadius >= basketLeft &&
        x - ballRadius <= basketRight &&
        y - ballRadius >= basket.y &&
        y + ballRadius <= basketBottom
      ) {
        clearInterval(intervalRef.current);
        setIsAnimating(false);
        setMessage("✅ Correct! The ball went in the basket!");
        scored = true;
      }

      t += dt;
    }, 50);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setBallPos({ x: 0, y: 0 });
    setStats({ maxHeight: 0, range: 0, time: 0 });
    setIsAnimating(false);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>🏀 Projectile Motion Lab</h1>

      {/* Sliders */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Launch Angle: {angle}°<br />
          <input
            type="range"
            min="10"
            max="80"
            value={angle}
            disabled={isAnimating}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Speed: {speed} m/s<br />
          <input
            type="range"
            min="5"
            max="50"
            value={speed}
            disabled={isAnimating}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </label>
      </div>

      {/* Buttons */}
      <button onClick={simulate} disabled={isAnimating} style={{ marginRight: "10px" }}>
        {isAnimating ? "Simulating..." : "Simulate"}
      </button>
      <button onClick={reset}>Reset</button>

      {/* Stats */}
      <div style={{ margin: "20px 0", fontWeight: "bold" }}>
        <p>Max Height: {stats.maxHeight} m</p>
        <p>Range: {stats.range} m</p>
        <p>Time of Flight: {stats.time} s</p>
      </div>

      {/* Message */}
      {message && (
        <div style={{ fontSize: "18px", fontWeight: "bold", color: message.includes("Correct") ? "green" : "red" }}>
          {message}
        </div>
      )}

      {/* Visualization Area */}
      <div
        style={{
          background: "#f0f0f0",
          borderRadius: "10px",
          position: "relative",
          height: "400px",
          overflow: "hidden",
        }}
      >
        {/* Basket */}
        <div
          style={{
            position: "absolute",
            bottom: `${basket.y * scale}px`,
            left: `${basket.x * scale}px`,
            width: `${basket.width * scale}px`,
            height: `${basket.height * scale}px`,
            border: "3px solid brown",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            background: "#514318ff",
          }}
        />

        {/* Ball */}
        <div
          style={{
            position: "absolute",
            width: `${ballRadius * 2 * scale}px`,
            height: `${ballRadius * 2 * scale}px`,
            borderRadius: "50%",
            background: "orange",
            left: `${ballPos.x * scale}px`,
            bottom: `${ballPos.y * scale}px`,
            transition: "all 0.05s linear",
          }}
        />
      </div>
    </div>
  );
}
