import MainDivs from "./MainDivs";
import { FaArrowDown } from "react-icons/fa";
import FloatingSymbols from "./FloatingSymbols";

const Body = () => {
  return (
    <main className="relative overflow-hidden">
      {/* Lively math symbol background */}
      <FloatingSymbols />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-white p-6 relative z-10">
        
        <h2 className="text-4xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-lg mb-4">
          Learn As You Play
        </h2>
        <p className="text-lg md:text-2xl text-gray-200 text-center max-w-2xl">
          Explore physics games that make learning exciting and interactive!
          
        </p>
        
        <FaArrowDown className="mt-20 text-white w-12 h-12 md:w-20 md:h-20 animate-bounce" />
      </div>

      <div className="flex flex-row gap-10 p-10 justify-center -mt-20 flex-wrap relative z-10">
        <MainDivs />
        
      </div>
    </main>
  );
};

export default Body;
