import { Link } from "react-router-dom";

const MainDivs = () => {
    return ( 
    // 1. Enhanced Container: Use 'max-w-7xl' and 'mx-auto' for centering and 'px-6' for padding.
    // Use 'gap-8' or 'gap-12' for better spacing than 'gap-40'.
    <div className="flex justify-center gap-12 mt-12 mx-auto max-w-7xl px-6 flex-wrap">

      {/* --- Projectile Motion Card --- */}
      <Link to="/projectile" className="w-full sm:w-1/2 lg:w-1/4 min-w-[280px]">
        <div className="relative bg-gradient-to-br from-blue-700 to-purple-500 rounded-2xl aspect-square shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.05] hover:shadow-purple-500/80 cursor-pointer">
            <img
            src="https://thumbs.dreamstime.com/b/colorful-smoke-projectile-motion-create-dynamic-captivating-visual-effect-launched-vibrant-creating-awe-364002297.jpg"
            alt="Projectile Motion"
            className="w-full h-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100" // Opacity reduced for better text contrast
            />
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent pt-10 text-white font-extrabold text-xl sm:text-2xl">
                <div className="py-4">
                    Projectile Motion
                </div>
            </div>
        </div>
      </Link>
    
      {/* --- Magnetism Card --- */}
      <Link to="/magnetism" className="w-full sm:w-1/2 lg:w-1/4 min-w-[280px]">
        <div className="relative bg-gradient-to-br from-green-600 to-teal-500 rounded-2xl aspect-square shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.05] hover:shadow-green-500/80 cursor-pointer">
            <img
            src="https://cosmosatyourdoorstep.com/wp-content/uploads/2018/02/magnetism.jpg"
            alt="Magnetism"
            className="w-full h-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100"
            />
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent pt-10 text-white font-extrabold text-xl sm:text-2xl">
                <div className="py-4">
                    Magnetism
                </div>
            </div>
        </div>
      </Link>

      {/* --- Electricity Card --- */}
      <Link to="/electricity" className="w-full sm:w-1/2 lg:w-1/4 min-w-[280px]">
        <div className="relative bg-gradient-to-br from-red-600 to-purple-800 rounded-2xl aspect-square shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.05] hover:shadow-red-500/80 cursor-pointer">
            <img
            src="https://img.freepik.com/premium-photo/electric-purple-background-with-lightning-streaks_1170794-143850.jpg"
            alt="Electricity"
            className="w-full h-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100"
            />
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent pt-10 text-white font-extrabold text-xl sm:text-2xl">
                <div className="py-4">
                    Electricity
                </div>
            </div>
        </div>
      </Link>
    </div>
    );
}

export default MainDivs;