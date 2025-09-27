import MainDivs from "./MainDivs";
import { FaArrowDown } from "react-icons/fa";

const Body = () => {
    return ( 
    <main >
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]  text-white p-6">
        <h2 className="text-4xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-lg mb-4">
        Learn As You Play
        </h2>
        <p className="text-lg md:text-2xl text-gray-200 text-center max-w-2xl">
        Explore physics games that make learning it more exciting!
        </p>

        <FaArrowDown className="mt-20 text-white w-20 h-20 animate-bounce" />
        </div>

        <div className="flex flex-row gap-10 p-10 justify-center -mt-20">
            
            <MainDivs/>
        </div>

    </main>
    );
}

export default Body;