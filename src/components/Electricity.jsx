import TabLayout from "./TabLayout";
import ElectricitySimulation from "./ElectricitySimulation";
import { motion } from "framer-motion";
import Quiz from "./Quiz";

// Ensure this path is correct for your file structure!
import ElectricityConceptImage from "../assets/electricity-boy1.png"; 

export default function Projectile() {
  return (
    <TabLayout
      concept={
        // This outer div now contains both the white content box (inner div) AND the image.
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden" // Make this container relative for the image positioning
        >
          
          {/* 1. THE WHITE CONTENT BOX (Your original content div) */}
          <div className="text-center p-6 relative z-20 bg-white/90 rounded-b-none"> 
              
              {/* Subtle animated background (still inside the content box for effect) */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"
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
                Electricity 
              </motion.h2>

              {/* Main paragraph — pure black with cyan glow */}
              <motion.p
                className="relative mt-6 text-lg text-black font-medium max-w-2xl mx-auto leading-relaxed [text-shadow:0_0_10px_rgba(0,255,255,0.3)]"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Electricity is a form of energy which is produced by the 
                movement of tiny charged particles called electrons. Electricity flows in a path called
                a circuit. When the circuit is complete or closed, the current flows and makes devices 
                like bulbs glow, and when the circuit is open, the flow stops.
              </motion.p>
          </div>

          {/* 2. THE IMAGE (Now full horizontal width) */}
          <motion.img
            src={ElectricityConceptImage}
            alt="Animated child holding a globe of electricity"
            // KEY CHANGES: max-w-full ensures it spans the entire container width. 
            // Negative margin adjusted for a tighter fit below the text box.
            className="relative max-w-full h-auto pt-3 mx-auto mt-[-0.5rem] z-10 pointer-events-none block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          />
        </motion.div>
      }
      simulation={<ElectricitySimulation />}
      points={
        <Quiz
          title="Electricity Quiz"
          questions={[
            {
              prompt: "Electricity flows easily through which of the following?",
              options: ["Insulators", "Conductors", "Plastics", "Rubber"],
              correctIndex: 1,
            },
            {
              prompt: "The unit of electric current is:",
              options: ["Volt", "Ohm", "Ampere", "Watt"],
              correctIndex: 2,
            },
            {
              prompt: "A circuit allows current to flow when the switch is:",
              options: ["Open", "Off", "Closed/On", "Removed"],
              correctIndex: 2,
            },
            {
              prompt: "A battery typically provides:",
              options: ["AC (Alternating Current)", "DC (Direct Current)", "No current", "Only voltage"],
              correctIndex: 1,
            },
            {
              prompt: "Which of these is an insulator?",
              options: ["Copper", "Aluminum", "Rubber", "Gold"],
              correctIndex: 2,
            },
          ]}
        />
      }
    />
  );
}