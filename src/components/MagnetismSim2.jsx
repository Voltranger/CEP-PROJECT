import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ClickMagneticObjectsFinal() {
  const magnetCenter = { x: 320, y: 170 };

  const initialObjects = [
    { id: 1, name: "Iron Nail", magnetic: true, x: 120, y: 250 },
    { id: 2, name: "Wood Piece", magnetic: false, x: 250, y: 100 },
    { id: 3, name: "Coin", magnetic: true, x: 550, y: 180 },
    { id: 4, name: "Plastic Toy", magnetic: false, x: 600, y: 270 },
    { id: 5, name: "Paper Clip", magnetic: true, x: 320, y: 320 },
  ];

  const [objects, setObjects] = useState(initialObjects);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const handleClick = (id) => {
    setObjects((prev) =>
      prev.map((obj) => {
        if (obj.id === id) {
          if (obj.magnetic && !obj.collected) {
            setScore((s) => s + 1);
            return {
              ...obj,
              x: magnetCenter.x,
              y: magnetCenter.y,
              collected: true,
              moving: true,
            };
          } else if (!obj.magnetic) {
            // trigger shake animation for non-magnetic objects
            return { ...obj, shake: true };
          }
        }
        return obj;
      })
    );
  };

  // Remove shake after short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setObjects((prev) => prev.map((obj) => ({ ...obj, shake: false })));
    }, 400);
    return () => clearTimeout(timer);
  }, [objects]);

  const handleReset = () => {
    setObjects(initialObjects);
    setScore(0);
    setMessage("");
  };

  // Winning message when all magnetic objects are caught
  useEffect(() => {
    const totalMagnetic = initialObjects.filter((o) => o.magnetic).length;
    const collected = objects.filter((o) => o.collected).length;
    if (collected === totalMagnetic && collected > 0) {
      setMessage("🎉 You found all the magnetic materials!");
    }
  }, [objects]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-indigo-200 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        🧲 Click the Magnetic Objects!
      </h1>
      <p className="text-gray-700 mb-6 text-lg text-center max-w-2xl">
        Click on objects that you think are magnetic. Watch them move toward the magnet if you're right!
      </p>

      <div className="relative bg-white w-[700px] h-[400px] rounded-3xl shadow-lg border-4 border-indigo-300 overflow-hidden">
        {/* Static Magnet */}
        <div
          className="absolute w-24 h-24 bg-red-500 rounded-full border-4 border-gray-700 flex items-center justify-center text-3xl shadow-lg"
          style={{
            left: magnetCenter.x - 40,
            top: magnetCenter.y - 40,
          }}
        >
          🧲
        </div>

        {/* Clickable Objects */}
        {objects.map((obj) => (
          <motion.div
            key={obj.id}
            className={`absolute px-3 py-2 rounded-lg font-bold text-sm cursor-pointer ${
              obj.magnetic
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            animate={
              obj.shake
                ? { x: [obj.x - 6, obj.x + 6, obj.x - 3, obj.x + 3, obj.x], y: obj.y }
                : obj.moving
                ? { x: magnetCenter.x, y: magnetCenter.y }
                : { x: obj.x, y: obj.y }
            }
            transition={{
              type: "spring",
              stiffness: obj.moving ? 50 : 150,
              damping: 12,
              duration: 0.8,
            }}
            onClick={() => handleClick(obj.id)}
          >
            {obj.name}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-6">
        <p className="text-lg font-semibold text-indigo-700">Score: {score}</p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Reset
        </button>
      </div>

      {message && (
        <p className="mt-4 text-green-600 text-xl font-bold">{message}</p>
      )}
    </div>
  );
}
