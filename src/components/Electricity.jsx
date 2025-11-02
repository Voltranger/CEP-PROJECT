import { useState } from "react";
import TabLayout from "./TabLayout";
import ElectricitySimulation from "./ElectricitySimulation";
import { motion } from "framer-motion";

// Ensure this path is correct for your file structure!
import ElectricityConceptImage from "../assets/electricity-boy1.png"; 

export default function Projectile() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
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
      quiz={
        <div className="p-4 text-black font-medium space-y-6">
          {[
            {
              question: "What is electricity?",
              options: [
                "A form of energy produced by electron movement",
                "A type of light",
                "A type of heat",
                "A magnetic field"
              ],
              correct: 0
            },
            {
              question: "Which of these is NOT a conductor of electricity?",
              options: [
                "Copper wire",
                "Aluminum foil",
                "Rubber",
                "Iron rod"
              ],
              correct: 2
            },
            {
              question: "What is a circuit?",
              options: [
                "A type of battery",
                "A closed path for electricity to flow",
                "A type of switch",
                "An electrical device"
              ],
              correct: 1
            },
            {
              question: "What are the tiny particles that create electricity when they move?",
              options: [
                "Protons",
                "Neutrons",
                "Electrons",
                "Atoms"
              ],
              correct: 2
            },
            {
              question: "Which of these can produce electricity?",
              options: [
                "Only batteries",
                "Only power stations",
                "Both batteries and power stations",
                "Neither batteries nor power stations"
              ],
              correct: 2
            }
          ].map((q, i) => {
            const isAnswered = selectedAnswers[i] !== undefined;
            const isCorrect = selectedAnswers[i] === q.correct;
            
            return (
              <div key={i} className="bg-white/70 p-4 rounded-xl border border-gray-600">
                <p className="font-bold mb-3">{i + 1}. {q.question}</p>
                {isAnswered && (
                  <div className={`mb-3 p-2 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800 border border-green-500' : 'bg-red-100 text-red-800 border border-red-500'}`}>
                    {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                  </div>
                )}
                <div className="space-y-2">
                  {q.options.map((option, j) => {
                    const isSelected = selectedAnswers[i] === j;
                    const isCorrectOption = j === q.correct;
                    let bgColor = "bg-white";
                    let borderColor = "border-gray-300";
                    let textColor = "text-black";
                    
                    if (isAnswered) {
                      if (isCorrectOption) {
                        bgColor = "bg-green-100";
                        borderColor = "border-green-500";
                        textColor = "text-green-800";
                      } else if (isSelected && !isCorrectOption) {
                        bgColor = "bg-red-100";
                        borderColor = "border-red-500";
                        textColor = "text-red-800";
                      }
                    } else if (isSelected) {
                      bgColor = "bg-blue-100";
                      borderColor = "border-blue-500";
                      textColor = "text-blue-800";
                    }
                    
                    return (
                      <div 
                        key={j} 
                        onClick={() => {
                          if (!isAnswered) {
                            setSelectedAnswers({...selectedAnswers, [i]: j});
                          }
                        }}
                        className={`p-2 ${bgColor} ${borderColor} ${textColor} cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_12px_#00f6ff] transition-all duration-300 rounded-lg border ${!isAnswered ? 'hover:bg-blue-50' : ''}`}
                      >
                        {option}
                        {isAnswered && isCorrectOption && (
                          <span className="ml-2 font-bold">✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      }
    />
  );
}