import { useState } from "react";
import TabLayout from "./TabLayout";
import ProjectileSimulation from "./ProjectileSimulation"; // your simulation component
import { motion } from "framer-motion";
import ProjectileConceptImage from "../assets/projectile-boy.png";
export default function Projectile() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
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
      quiz={
        <div className="p-4 text-black font-medium space-y-6">
          {[
            {
              question: "What is projectile motion?",
              options: [
                "Motion of an object thrown into the air under gravity",
                "Motion of an object in space",
                "Motion of an object underwater",
                "Motion of an object on a flat surface"
              ],
              correct: 0
            },
            {
              question: "In which dimensions does projectile motion occur?",
              options: [
                "Only horizontal",
                "Only vertical",
                "Both horizontal and vertical",
                "Three dimensions"
              ],
              correct: 2
            },
            {
              question: "What is the acceleration in horizontal motion of a projectile?",
              options: [
                "9.8 m/s²",
                "Variable",
                "Zero (no acceleration)",
                "Depends on initial velocity"
              ],
              correct: 2
            },
            {
              question: "What is the value of acceleration due to gravity on Earth?",
              options: [
                "5.8 m/s²",
                "7.8 m/s²",
                "8.8 m/s²",
                "9.8 m/s²"
              ],
              correct: 3
            },
            {
              question: "At what angle of projection is the range maximum?",
              options: [
                "30 degrees",
                "45 degrees",
                "60 degrees",
                "90 degrees"
              ],
              correct: 1
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
