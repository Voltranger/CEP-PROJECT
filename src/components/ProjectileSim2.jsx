import React, { useState, useEffect, useRef } from "react";

export default function ProjectileSimulation() {
  const [angle, setAngle] = useState(45);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isShooting, setIsShooting] = useState(false);
  const [message, setMessage] = useState("");

  const g = 9.8;
  const velocity = 50; // fixed m/s
  const targetX = 800; // px from left
  const targetHeight = 120; // px
  const targetWidth = 20; // px
  const scale = 5; // meters -> pixels

  // Gun visuals
  const gunPivot = { x: 20, y: 10 }; // pivot offset from left/bottom of container (px)
  const gunLength = 50; // barrel length (px)

  // Keep the shoot angle and gun tip at shoot start (so changes during flight don't affect the shot)
  const shootAngleRef = useRef(angle);
  const gunTipRef = useRef({ x: gunPivot.x + gunLength, y: gunPivot.y });

  // start a shot: capture current angle and compute gun tip location
  const handleShoot = () => {
    shootAngleRef.current = angle;
    // compute gun tip in px using current angle
    const rad = (angle * Math.PI) / 180;
    const tipX = gunPivot.x + gunLength * Math.cos(rad);
    const tipY = gunPivot.y + gunLength * Math.sin(rad);
    gunTipRef.current = { x: tipX, y: tipY };

    setPosition({ x: tipX, y: tipY }); // initial display pos
    setMessage("");
    setIsShooting(true);
  };

  // animation + physics
  useEffect(() => {
    if (!isShooting) return;

    const angleAtShot = shootAngleRef.current;
    const rad = (angleAtShot * Math.PI) / 180;
    const vX = velocity * Math.cos(rad); // m/s
    const vY = velocity * Math.sin(rad); // m/s

    const startTime = Date.now();
    let hitDetected = false;

    const id = setInterval(() => {
      const t = (Date.now() - startTime) / 1000;
      const x_m = vX * t;
      const y_m = vY * t - 0.5 * g * t * t;

      // display coordinates (px)
      const x_px = gunTipRef.current.x + x_m * scale;
      const y_px = Math.max(0, gunTipRef.current.y + y_m * scale);

      setPosition({ x: x_px, y: y_px });

      // Collision detection: projectile's center inside target block area
      if (
        x_px >= targetX &&
        x_px <= targetX + targetWidth &&
        y_px <= targetHeight
      ) {
        hitDetected = true;
        setMessage("🎯 Target Hit!");
        setIsShooting(false);
        clearInterval(id);
        return;
      }

      // Landed (below starting height)
      if (y_m < 0 && t > 0.01) {
        if (!hitDetected) setMessage("❌ Did Not Hit!");
        setIsShooting(false);
        clearInterval(id);
        return;
      }
    }, 20);

    return () => clearInterval(id);
  }, [isShooting]);

  // handle slider/number sync & clamp
  const handleAngleChange = (val) => {
    const n = Math.max(5, Math.min(85, Number(val || 0))); // clamp 5..85
    setAngle(n);
  };

  // For CSS rotate: positive angle should visually tilt upward.
  // rotate(-angle) is used because CSS rotation is clockwise-positive.
  const barrelRotation = `rotate(${-angle}deg)`;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🎯 Projectile Motion — Inclining Gun</h2>
      <p>Use the slider or number input to incline the gun, then press <b>Shoot</b>.</p>

      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 8 }}>Angle (°):</label>

        <input
          type="number"
          min={5}
          max={85}
          value={angle}
          onChange={(e) => handleAngleChange(e.target.value)}
          style={{ width: "70px", marginRight: "12px" }}
        />

        <input
          type="range"
          min={5}
          max={85}
          value={angle}
          onChange={(e) => handleAngleChange(e.target.value)}
          style={{ verticalAlign: "middle", width: "300px" }}
        />
      </div>

      <button
        onClick={handleShoot}
        disabled={isShooting}
        style={{
          padding: "8px 18px",
          fontWeight: "bold",
          cursor: "pointer",
          backgroundColor: "#2a9d8f",
          color: "white",
          borderRadius: "8px",
          border: "none",
        }}
      >
        🔫 Shoot
      </button>

      <h3
        style={{
          marginTop: "18px",
          color: message.includes("Hit") ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {message}
      </h3>

      {/* Visual Area */}
      <div
        style={{
          position: "relative",
          width: "900px",
          height: "400px",
          margin: "40px auto",
          borderBottom: "3px solid #444",
          overflow: "hidden",
          background: "linear-gradient(to top, #eaf6ff 30%, #ffffff 100%)",
        }}
      >
        {/* ground base */}
        <div
          style={{
            position: "absolute",
            left: `${gunPivot.x - 20}px`,
            bottom: `${gunPivot.y - 10}px`,
            width: "40px",
            height: "20px",
            background: "gray",
            borderRadius: "4px",
          }}
        />

        {/* gun barrel - rotates around left center (the pivot) */}
        <div
          style={{
            position: "absolute",
            left: `${gunPivot.x}px`,
            bottom: `${gunPivot.y}px`,
            width: `${gunLength}px`,
            height: "8px",
            background: "black",
            transformOrigin: "left center",
            transform: barrelRotation,
            borderRadius: "4px",
            transition: "transform 0.12s ease-out", // smooth dynamic incline
          }}
        />

        {/* Projectile (circle) */}
        <div
          style={{
            position: "absolute",
            left: `${position.x}px`,
            bottom: `${position.y}px`,
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "black",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        ></div>

        {/* Target Block */}
        <div
          style={{
            position: "absolute",
            left: `${targetX}px`,
            bottom: "0px",
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            background: "red",
            border: "2px solid darkred",
          }}
        />
      </div>
    </div>
  );
}
