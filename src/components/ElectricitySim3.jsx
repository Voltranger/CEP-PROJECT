import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ElectricityMatchGame() {
  const leftColumn = [
    { id: "battery", label: "Battery" },
    { id: "switch", label: "Switch" },
    { id: "bulb", label: "Bulb" },
    { id: "wire", label: "Wire" },
  ];

  const rightColumn = [
    { id: "wire", label: "Connects components to complete the path" },
    { id: "bulb", label: "Glows when current flows" },
    { id: "battery", label: "Provides electrical energy" },
    { id: "switch", label: "Controls the current flow" },
  ];

  const [matches, setMatches] = useState({});
  const [dragging, setDragging] = useState(null);

  const handleDrop = (rightId) => {
    if (dragging) {
      setMatches((prev) => ({ ...prev, [dragging]: rightId }));
      setDragging(null);
    }
  };

  const handleReset = () => {
    setMatches({});
  };

  const allCorrect = leftColumn.every((item) => matches[item.id] === item.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-orange-700 mb-4 drop-shadow-md">
        ⚡ Match the Columns — Electricity
      </h1>
      <p className="text-gray-700 mb-8 text-lg text-center max-w-2xl">
        Drag each <span className="font-semibold text-orange-600">component</span> from the left
        and drop it beside its correct <span className="font-semibold text-orange-600">description</span>.
      </p>

      <button
        onClick={handleReset}
        className="mb-6 px-6 py-3 rounded-xl font-bold text-white bg-red-500 shadow-md hover:bg-red-600"
      >
        Reset
      </button>

      <div className="flex gap-16 bg-white p-10 rounded-3xl shadow-xl border-4 border-orange-200">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {leftColumn.map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={() => setDragging(item.id)}
              onDragEnd={() => setDragging(null)}
              whileHover={{ scale: 1.1 }}
              className={`p-4 w-56 rounded-xl text-center text-white font-semibold cursor-grab shadow-md text-lg ${
                matches[item.id]
                  ? "bg-green-400 opacity-80"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {item.label}
            </motion.div>
          ))}
        </div>

        {/* Arrows for visual connection */}
        <div className="flex flex-col justify-between py-2">
          {leftColumn.map((_, i) => (
            <motion.div
              key={i}
              className="text-2xl text-orange-400"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ➡️
            </motion.div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {rightColumn.map((desc) => {
            const matchedItem = Object.keys(matches).find(
              (key) => matches[key] === desc.id
            );
            return (
              <div
                key={desc.id}
                onDrop={() => handleDrop(desc.id)}
                onDragOver={(e) => e.preventDefault()}
                className={`p-4 w-[400px] min-h-[70px] rounded-xl border-2 text-center flex items-center justify-center transition-all duration-200 ${
                  matchedItem
                    ? "bg-green-100 border-green-400"
                    : "bg-orange-50 border-orange-300 hover:border-orange-500 hover:bg-yellow-50"
                }`}
              >
                {matchedItem ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-orange-800 font-semibold"
                  >
                    {leftColumn.find((i) => i.id === matchedItem).label}
                  </motion.div>
                ) : (
                  <p className="text-gray-700 text-base font-medium">
                    {desc.label}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      <motion.div
        className="mt-10 text-3xl font-bold"
        animate={
          allCorrect
            ? { scale: [1, 1.2, 1], color: "#22c55e" }
            : { scale: 1, color: "#333" }
        }
        transition={{ repeat: allCorrect ? Infinity : 0, duration: 1.2 }}
      >
        {allCorrect
          ? "🎉 Excellent! You matched all correctly!"
          : "Match all correctly to complete the game!"}
      </motion.div>
    </div>
  );
}
