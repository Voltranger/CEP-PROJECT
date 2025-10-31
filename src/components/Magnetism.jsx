import TabLayout from "./TabLayout";
import MagnetismSimulation from "./MagnetismSimulation";
import { motion } from "framer-motion";
import MagnetConceptImage from "../assets/magnet-boy.png";
import Quiz from "./Quiz";
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
            className="relative text-5xl font-extrabold pb-1 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent [text-shadow:0_0_12px_rgba(120,100,255,0.6)] drop-shadow-[0_0_10px_rgba(100,200,255,0.3)]"
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
          <motion.img
                      src={MagnetConceptImage}
                      alt="Animated child holding a globe of electricity"
                      // KEY CHANGES: max-w-full ensures it spans the entire container width. 
                      // Negative margin adjusted for a tighter fit below the text box.
                      className="relative w-full max-w-full h-[375px] pl-0 pr-0  pt-8 mx-auto mt-[-0.5rem] z-10 pointer-events-none block"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 1.5 }}
                    />
        </motion.div>
      }
      simulation={<MagnetismSimulation />}
      points={
        <Quiz
          title="Magnetism Quiz"
          questions={[
            {
              prompt: "A magnet has two poles called:",
              options: ["East and West", "Positive and Negative", "North and South", "Top and Bottom"],
              correctIndex: 2,
            },
            {
              prompt: "Like poles of two magnets:",
              options: ["Attract", "Repel", "Neither", "Become neutral"],
              correctIndex: 1,
            },
            {
              prompt: "A compass needle aligns with:",
              options: ["Wind direction", "Earth's magnetic field", "Sunlight", "Gravity"],
              correctIndex: 1,
            },
            {
              prompt: "Common magnetic materials include:",
              options: ["Iron, Nickel, Cobalt", "Copper, Aluminum, Silver", "Plastic, Wood, Glass", "Gold, Silver, Platinum"],
              correctIndex: 0,
            },
            {
              prompt: "Magnetic force is strongest at the:",
              options: ["Center", "Edges", "Poles", "Entire surface equally"],
              correctIndex: 2,
            },
          ]}
        />
      }
    />
  );
}
