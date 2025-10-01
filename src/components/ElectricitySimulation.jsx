import React, { useState, useEffect } from 'react';

// --- Configuration Constants (Adjusted for larger view) ---
const FAN_CENTER_X = 280; // Adjusted X position
const FAN_CENTER_Y = 200; // Adjusted Y position
const FAN_RADIUS = 50;

// Function to calculate electron position along the circuit path
const getElectronPosition = (time, offset = 0) => {
  // Define the main circuit path coordinates for a larger SVG (450x350)
  const path = [
    [50, 250, 0],   // Start (Battery -)
    [50, 50, 0],    // Up to the corner
    [150, 50, 0],   // Across to the switch
    [350, 50, 0],   // Past the fan connector
    [350, 300, 0],  // Down to the end of the circuit
    [50, 300, 0],   // Back to the battery + side
    [50, 250, 0]    // Final point (Loop back)
  ];

  let totalLength = 0;
  let segmentLengths = [];

  // 1. Calculate length of each segment
  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];
    const length = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    segmentLengths.push(length);
    totalLength += length;
  }

  // Simple animation: loop position from 0 to 1
  let pos = ((time / 50) + offset) % 1; 
  let targetDistance = pos * totalLength;
  let cumulativeLength = 0;
  
  // 2. Find which segment the electron is on
  for (let i = 0; i < segmentLengths.length; i++) {
    let segmentLength = segmentLengths[i];
    
    if (targetDistance <= cumulativeLength + segmentLength) {
      const p1 = path[i];
      const p2 = path[i + 1];
      const distanceIntoSegment = targetDistance - cumulativeLength;
      const ratio = distanceIntoSegment / segmentLength;

      // Linear interpolation to find (x, y)
      const x = p1[0] + (p2[0] - p1[0]) * ratio;
      const y = p1[1] + (p2[1] - p1[1]) * ratio;
      
      return { x, y };
    }
    cumulativeLength += segmentLength;
  }
  return { x: path[0][0], y: path[0][1] }; // Default fallback
};


export default function InteractiveCircuitLab() {
  const [isOn, setIsOn] = useState(false);
  const [fanAngle, setFanAngle] = useState(0);
  const [time, setTime] = useState(0); 

  // --- Fan Rotation and Current Flow Effect ---
  useEffect(() => {
    let animationFrame;
    let lastTime = 0;

    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (isOn) {
        // 1. Rotate Fan ONLY when ON
        setFanAngle(prev => (prev + 10) % 360); 
        
        // 2. Animate Electrons (Current)
        setTime(prev => (prev + 1)); 
      }
      
      // Request the next frame regardless of 'isOn' to keep the clock (time) running
      // but only update states when 'isOn' is true.
      animationFrame = requestAnimationFrame(animate);
    };

    // Start the loop
    animationFrame = requestAnimationFrame(animate);

    // Cleanup function: stop the animation loop
    return () => cancelAnimationFrame(animationFrame);
  }, [isOn]); // Re-run effect only to initialize/cleanup if 'isOn' changes (optional but good practice)

  // --- JSX Rendering ---
  
  // Switch visual position calculation
  const switchX = 150;
  const switchY = 50;
  // If ON, the switch connects to the left wire (x=150). If OFF, it's slightly raised (x=140).
  const switchConnectionX = isOn ? switchX : switchX - 10;
  const switchConnectionY = isOn ? switchY : switchY - 10;

  // Generate 8 electrons for the flow animation
  const electrons = Array.from({ length: 8 }).map((_, index) => {
    const pos = getElectronPosition(time, index / 8); 
    
    return (
      <circle 
        key={index} 
        cx={pos.x} 
        cy={pos.y} 
        r="4" // Slightly larger electrons
        fill="cyan" 
        opacity={isOn ? 1 : 0} 
        style={{ transition: 'opacity 0.5s' }}
      />
    );
  });


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>⚡ Full Circuit Fan Lab (Expanded View)</h1>
      
      {/* Switch Button */}
      <button
        onClick={() => setIsOn(!isOn)}
        style={{
          padding: "10px 20px",
          margin: "20px",
          background: isOn ? "green" : "red",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isOn ? "BREAK Circuit (Switch OFF)" : "CLOSE Circuit (Switch ON)"}
      </button>

      {/* --- SVG Circuit Visualization --- */}
      {/* Increased size and adjusted viewBox */}
      <svg 
        width="100%" 
        height="400" 
        viewBox="0 0 400 350" 
        style={{ border: "2px solid #333", maxWidth: '600px', margin: '0 auto', display: 'block' }}
      >
        
        {/* Wires (Main Circuit Path) */}
        <polyline
          points="50,250 50,50 150,50 350,50 350,300 50,300 50,250"
          fill="none"
          stroke="black"
          strokeWidth="5" // Thicker wires
        />

        {/* --- 1. Battery (Source) --- */}
        <rect x="30" y="250" width="40" height="50" fill="gray" />
        <text x="50" y="275" fontSize="14" textAnchor="middle" fill="white">BATTERY</text>
        <text x="60" y="305" fontSize="18" fill="green">+</text>
        <text x="40" y="245" fontSize="18" fill="red">-</text>

        {/* --- 2. Switch --- */}
        <line x1="150" y1="50" x2="150" y2="60" stroke="black" strokeWidth="5" /> 
        <circle cx="150" cy="50" r="6" fill="black" />
        
        {/* The Moving Switch Arm */}
        <line 
          x1="150" y1="50" 
          x2={switchConnectionX} y2={switchConnectionY} 
          stroke="red" strokeWidth="5" 
          style={{ transition: 'all 0.3s ease' }} 
        /> 
        <circle 
          cx={switchConnectionX} cy={switchConnectionY} 
          r="6" fill="red" 
          style={{ transition: 'all 0.3s ease' }} 
        />

        {/* --- 3. Fan (Load) --- */}
        <circle cx={FAN_CENTER_X} cy={FAN_CENTER_Y} r={FAN_RADIUS + 10} fill="lightblue" stroke="black" strokeWidth="3" />
        
        {/* Blades (Rotation) */}
        <g transform={`rotate(${fanAngle},${FAN_CENTER_X},${FAN_CENTER_Y})`}>
          <rect x={FAN_CENTER_X - 5} y={FAN_CENTER_Y - 50} width="10" height="40" fill="blue" />
          <rect x={FAN_CENTER_X - 5} y={FAN_CENTER_Y + 10} width="10" height="40" fill="blue" />
          <rect x={FAN_CENTER_X - 50} y={FAN_CENTER_Y - 5} width="40" height="10" fill="blue" />
          <rect x={FAN_CENTER_X + 10} y={FAN_CENTER_Y - 5} width="40" height="10" fill="blue" />
        </g>
        
        {/* Fan Center */}
        <circle cx={FAN_CENTER_X} cy={FAN_CENTER_Y} r="15" fill={isOn ? "gold" : "black"} />

        {/* Connections to Fan from main circuit path */}
        <line x1="350" y1="50" x2="350" y2="100" stroke="black" strokeWidth="5" />
        <line x1="350" y1="300" x2="350" y2="250" stroke="black" strokeWidth="5" />
        
        {/* Wires connecting the main path to the fan terminals */}
        <line x1="350" y1="100" x2={FAN_CENTER_X} y2={FAN_CENTER_Y - FAN_RADIUS - 5} stroke="black" strokeWidth="5" />
        <line x1="350" y1="250" x2={FAN_CENTER_X} y2={FAN_CENTER_Y + FAN_RADIUS + 5} stroke="black" strokeWidth="5" />


        {/* --- 4. Current Flow (Electrons) --- */}
        {electrons}

      </svg>

      <p style={{ marginTop: "15px", fontWeight: "bold" }}>
        {isOn 
          ? "✅ Circuit is **CLOSED**. Current is flowing and turning the motor. 🌀" 
          : "🚫 Circuit is **OPEN**. Current stops immediately, and the fan is static. 🛑"
        }
      </p>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        The cyan dots represent the **Current (flow of electrons)**. Notice how the switch visually breaks the connection!
      </p>
    </div>
  );
}