import { GiAtom } from 'react-icons/gi'
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from 'react-icons/io5'; // Example using Ionicons


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return ( 
    <>
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow p-4 flex items-center justify-between">
        <div className="text-xl font-bold text-white drop-shadow-md flex items-center gap-2">
            
            <h1 className="text-3xl font-bold  text-white">
            SciPlay Labs
            </h1>

            <GiAtom className="text-white w-8 h-8 animate-spin" />

        </div>


        {location.pathname !== "/" && (
        <button
            onClick={() => navigate("/")}
            className="relative px-4 py-2 font-semibold text-blue-600 bg-white rounded-lg 
                    border-2 border-transparent 
                    bg-clip-padding 
                    flex items-center gap-2
                    transition-all duration-300 
                    hover:border-blue-600 hover:shadow-[0_0_10px_rgba(59,130,246,0.7)]"
            >
            <IoArrowBack size={24} />Back
            
        </button>
      )}

    </header>
    </> 
    );
}

export default Header;