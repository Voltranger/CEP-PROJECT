import React, { useState } from "react";
import { motion } from "framer-motion";

export default function EarthMagneticFieldCircle() {
  const [show, setShow] = useState(false);

  // Generate circular outer magnetic field lines
  const outerCircles = Array.from({ length: 10 }).map((_, i) => {
    const radius = 150 + i * 12;
    return radius;
  });

  // Curved orange lines inside the Earth (core field lines)
  const innerCorePaths = Array.from({ length: 5 }).map((_, i) => {
    const offset = (i - 2) * 15;
    const startX = 450 + offset;
    const midX = 450;
    const endX = 450 - offset;
    return `M ${startX},370 Q ${midX},250 ${endX},130`;
  });

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        color: "white",
        marginTop: "30px",
      }}
    >
      <h1
        style={{
          fontSize: "34px",
          background: "linear-gradient(90deg, #00c3ff, #0077ff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        🌍 Earth’s Magnetic Field Visualization
      </h1>

      <p style={{ color: "#b3b3b3", marginBottom: "20px" }}>
        Watch how <b>Earth’s magnetic field</b> surrounds our planet in blue,
        while orange lines show the <b>core magnetic flow</b> inside!
      </p>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          style={{
            background: "#0077ff",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🧲 Show Simulation
        </button>
      ) : (
        <div>
          <div
            style={{
              position: "relative",
              width: "900px",
              height: "500px",
              margin: "auto",
              background: "radial-gradient(circle at center, #001a2e, #000)",
              borderRadius: "20px",
              boxShadow: "0 0 40px rgba(0, 200, 255, 0.2)",
              overflow: "hidden",
            }}
          >
            <svg width="900" height="500" style={{ position: "absolute" }}>
              <defs>
                <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00eaff" />
                  <stop offset="100%" stopColor="#0044ff" />
                </radialGradient>
                <linearGradient id="orangeGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffcc00" />
                  <stop offset="100%" stopColor="#ff6600" />
                </linearGradient>
              </defs>

              {/* Outer circular field lines */}
              {outerCircles.map((r, i) => (
                <motion.circle
                  key={i}
                  cx="450"
                  cy="250"
                  r={r}
                  stroke="url(#blueGlow)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}

              {/* Inner core magnetic lines */}
              {innerCorePaths.map((path, i) => (
                <motion.path
                  key={"core" + i}
                  d={path}
                  stroke="url(#orangeGlow)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </svg>

            {/* Earth Body */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              style={{
                position: "absolute",
                left: "390px",
                top: "200px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #00d4ff, #0040ff)",
                boxShadow: "0 0 50px rgba(0, 255, 255, 0.8)",
              }}
            ></motion.div>

            {/* Inner glowing core */}
            <div
              style={{
                position: "absolute",
                left: "425px",
                top: "235px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #ffcc00, #ff6600, transparent)",
                boxShadow: "0 0 40px rgba(255, 200, 0, 0.8)",
              }}
            ></div>

            {/* Labels */}
            <div
              style={{
                position: "absolute",
                top: "180px",
                left: "440px",
                color: "#ff6666",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              N
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "170px",
                left: "445px",
                color: "#00ffff",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              S
            </div>
          </div>

          <p
            style={{
              marginTop: "25px",
              color: "#ccc",
              fontStyle: "italic",
              fontSize: "16px",
            }}
          >
            “Blue lines show the protective magnetic bubble around Earth — orange lines show how it starts deep in the molten core.” 🌎✨
          </p>
        </div>
      )}
    </div>
  );
}
