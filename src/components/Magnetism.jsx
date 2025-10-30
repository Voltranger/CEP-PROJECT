import TabLayout from "./TabLayout";
import MagnetismSimulation from "./MagnetismSimulation";
import { motion } from "framer-motion";

export default function Projectile() {
  return (
    <TabLayout
      concept={
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center p-6 relative overflow-hidden"
        >
          {/* Subtle animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
          />

          {/* Title — gradient blue–purple + glow */}
          <motion.h2
            className="relative text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent [text-shadow:0_0_12px_rgba(120,100,255,0.6)] drop-shadow-[0_0_10px_rgba(100,200,255,0.3)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Magnetism 🧲
          </motion.h2>

          {/* Main paragraph — pure black with cyan glow */}
          <motion.p
            className="relative mt-6 text-lg text-black font-medium max-w-2xl mx-auto leading-relaxed [text-shadow:0_0_10px_rgba(0,255,255,0.3)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Magnets are cool objects that can attract metals like iron and nickel.
            They have two poles — North and South — and an invisible{" "}
            <span className="text-cyan-500 font-semibold [text-shadow:0_0_10px_rgba(0,255,255,0.5)]">
              magnetic field
            </span>{" "}
            around them. Opposites attract, and likes repel!
          </motion.p>

          {/* Second line — black with soft white glow */}
          <motion.p
            className="relative mt-4 text-black font-medium [text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            From fridge magnets to Earth itself — magnetism is everywhere! 🌍
          </motion.p>
        </motion.div>
      }
      simulation={<MagnetismSimulation />}
      points={
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 text-black font-medium">
          {[
            "Magnetism attracts or repels certain materials.",
            "Only iron, nickel, and cobalt are magnetic.",
            "Every magnet has North and South poles.",
            "Like poles repel, unlike poles attract.",
            "Magnetic force is strongest at the poles.",
            "Earth acts like a giant magnet.",
            "A compass works because of Earth’s magnetism.",
            "Heat or hammering can destroy magnetism.",
          ].map((point, i) => (
            <li
              key={i}
              className="p-3 rounded-xl border border-gray-600 bg-white/70 hover:bg-white hover:scale-105 hover:shadow-[0_0_12px_#00f6ff] transition-all duration-300"
            >
              {point}
            </li>
          ))}
        </ul>
      }
    />
  );
}
