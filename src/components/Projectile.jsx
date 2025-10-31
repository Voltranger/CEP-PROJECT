import TabLayout from "./TabLayout";
import ProjectileSimulation from "./ProjectileSimulation"; // your simulation component
import { motion } from "framer-motion";
import ProjectileConceptImage from "../assets/projectile-boy.png";
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
            className="relative text-5xl font-extrabold bg-gradient-to-r pb-1 from-blue-400 to-purple-500 bg-clip-text text-transparent [text-shadow:0_0_12px_rgba(120,100,255,0.6)] drop-shadow-[0_0_10px_rgba(100,200,255,0.3)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
           Projectile 
          </motion.h2>

          {/* Main paragraph — pure black with cyan glow */}
          <motion.p
            className="relative mt-6 text-lg text-black font-medium max-w-2xl mx-auto leading-relaxed [text-shadow:0_0_10px_rgba(0,255,255,0.3)]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Projectile motion is a form of motion where an object is thrown near
            the Earth’s surface and moves along a curved path under gravity.
            In projectile motion, the path of the object is parabolic, meaning it curves downward due to gravity.s
          </motion.p>

          {/* Second line — black with soft white glow */}
          
          <motion.img
                      src={ProjectileConceptImage}
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
      simulation={<ProjectileSimulation />}
      points={
        <Quiz
          title="Projectile Motion Quiz"
          questions={[
            {
              prompt: "The trajectory of ideal projectile motion is:",
              options: ["Circular", "Parabolic", "Elliptical", "Straight line"],
              correctIndex: 1,
            },
            {
              prompt: "For maximum range (no air resistance), the launch angle should be:",
              options: ["30°", "45°", "60°", "90°"],
              correctIndex: 1,
            },
            {
              prompt: "Horizontal acceleration in ideal projectile motion is:",
              options: ["g downward", "g upward", "Zero", "Depends on speed"],
              correctIndex: 2,
            },
            {
              prompt: "Vertical acceleration during flight equals:",
              options: ["0", "g upward", "g downward", "Variable"],
              correctIndex: 2,
            },
            {
              prompt: "At the highest point, the vertical component of velocity is:",
              options: ["Maximum", "Zero", "Equal to horizontal", "Negative"],
              correctIndex: 1,
            },
          ]}
        />
      }
    />
  );
}
