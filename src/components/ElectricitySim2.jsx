import React, { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveCircuit() {
  const components = [
    { id: "battery", label: "🔋 Battery" },
    { id: "switch", label: "🎚️ Switch" },
    { id: "bulb", label: "💡 Bulb" },
    { id: "wire", label: "🧵 Wire" },
  ];

  const placeholders = [
    { id: "battery", label: "Battery", x: 100, y: 200 },
    { id: "wire1", label: "Wire", x: 300, y: 100 },
    { id: "switch", label: "Switch", x: 500, y: 100 },
    { id: "wire2", label: "Wire", x: 700, y: 200 },
    { id: "bulb", label: "Bulb", x: 400, y: 300 },
  ];

  const [placed, setPlaced] = useState({});
  const [dragging, setDragging] = useState(null);
  const [switchOn, setSwitchOn] = useState(false);

  const handleDrop = (targetId) => {
    if (dragging) {
      setPlaced((prev) => ({ ...prev, [targetId]: dragging }));
      setDragging(null);
    }
  };

  const handleReset = () => {
    setPlaced({});
    setSwitchOn(false);
  };

  const allCorrect =
    placed["battery"] === "battery" &&
    placed["switch"] === "switch" &&
    placed["bulb"] === "bulb" &&
    placed["wire1"] === "wire" &&
    placed["wire2"] === "wire";

  const circuitComplete = allCorrect && switchOn;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 flex flex-col items-center p-6 relative">
      <h1 className="text-4xl font-bold text-indigo-800 mb-4 drop-shadow-md">
        ⚡ Build and Control Your Circuit
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center max-w-xl">
        Drag each component into its correct place. Once the circuit is complete,
        use the switch to turn it ON and make the bulb glow!
      </p>

      {/* Reset Button - Always Visible */}
      <button
        onClick={handleReset}
        className="absolute top-6 right-8 px-6 py-3 rounded-xl font-bold text-white bg-red-500 shadow-md hover:bg-red-600"
      >
        Reset
      </button>

      {/* Circuit Board */}
      <div className="relative bg-white rounded-3xl shadow-lg p-8 w-[900px] h-[500px] border-4 border-dashed border-indigo-400">
        {/* Circuit Wires */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        >
          {[
            ["battery", "wire1"],
            ["wire1", "switch"],
            ["switch", "wire2"],
            ["wire2", "bulb"],
            ["bulb", "battery"],
          ].map(([a, b], i) => {
            const start = placeholders.find((p) => p.id === a);
            const end = placeholders.find((p) => p.id === b);
            return (
              <line
                key={i}
                x1={start.x + 60}
                y1={start.y + 40}
                x2={end.x + 40}
                y2={end.y + 40}
                stroke={circuitComplete ? "#FFD700" : "#999"}
                strokeWidth="6"
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* Placeholders */}
        {placeholders.map((slot) => {
          const isBulb = slot.id === "bulb";
          const isPlaced = placed[slot.id];

          return (
            <div
              key={slot.id}
              style={{
                position: "absolute",
                left: slot.x,
                top: slot.y,
              }}
              onDrop={() => handleDrop(slot.id)}
              onDragOver={(e) => e.preventDefault()}
              className={`w-32 h-32 flex flex-col items-center justify-center rounded-2xl border-2 text-center cursor-pointer ${
                isPlaced
                  ? "bg-green-100 border-green-400"
                  : "bg-indigo-50 border-indigo-300"
              }`}
            >
              {isPlaced ? (
                <motion.div
                  className="text-4xl"
                  animate={
                    isBulb && circuitComplete
                      ? {
                          scale: [1, 1.15, 1],
                          filter: "drop-shadow(0 0 30px yellow)",
                        }
                      : { filter: "drop-shadow(0 0 0px transparent)", scale: 1 }
                  }
                  transition={{
                    repeat: isBulb && circuitComplete ? Infinity : 0,
                    duration: 1.2,
                  }}
                >
                  {components.find((c) => c.id === placed[slot.id]).label}
                </motion.div>
              ) : (
                <p className="text-sm font-medium text-indigo-700">
                  {slot.label}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {allCorrect ? (
          <button
            onClick={() => setSwitchOn(!switchOn)}
            className={`px-6 py-3 rounded-xl font-bold text-white shadow-md ${
              switchOn ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {switchOn ? "Turn OFF" : "Turn ON"}
          </button>
        ) : (
          <p className="text-gray-600 font-medium">
            Complete the circuit to use the switch!
          </p>
        )}
      </div>

      {/* Component Tray */}
      <h2 className="text-xl font-semibold mt-8 text-indigo-800">
        Components
      </h2>
      <div className="flex gap-4 mt-3 flex-wrap justify-center">
        {components.map((comp) => (
          <motion.div
            key={comp.id}
            draggable
            onDragStart={() => setDragging(comp.id)}
            onDragEnd={() => setDragging(null)}
            whileHover={{ scale: 1.1 }}
            className="p-3 rounded-xl bg-indigo-300 text-3xl cursor-grab shadow-md"
          >
            {comp.label}
          </motion.div>
        ))}
      </div>

      {/* Feedback */}
      <p className="mt-6 text-lg font-semibold text-indigo-700">
        {!allCorrect
          ? "Drag all components to their correct places to build your circuit!"
          : switchOn
          ? "⚡ The circuit is ON! The bulb is glowing brightly!"
          : "Circuit complete! Turn on the switch to make the bulb glow."}
      </p>
    </div>
  );
}
