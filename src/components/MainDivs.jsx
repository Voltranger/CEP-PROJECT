import { Link } from "react-router-dom";


const MainDivs = () => {
    return ( 

    <div className="flex justify-center gap-40 mt-6 ">

      {/* Projectile Motion */}
      <Link to="/projectile">
    <div className="relative bg-blue-500 rounded-xl w-90 h-90 shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl">
        <img
        src="https://thumbs.dreamstime.com/b/colorful-smoke-projectile-motion-create-dynamic-captivating-visual-effect-launched-vibrant-creating-awe-364002297.jpg"
        alt="Projectile Motion"
        className="w-full h-full object-fit opacity-90"
        />
        <div className="absolute bottom-0 bg-purple bg-opacity-60 w-full text-center py-2 text-white font-bold text-lg">
        Projectile Motion
        </div>
    </div>
    </Link>
    

      {/* Magnetism */}
      <Link to="/magnetism">
    <div className="relative bg-green-500 rounded-xl w-90 h-90 shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl">
        <img
        src="https://cosmosatyourdoorstep.com/wp-content/uploads/2018/02/magnetism.jpg"
        alt="Magnetism"
        className="w-full h-full object-fit opacity-90"
        />
        <div className="absolute bottom-0 bg-purple bg-opacity-60 w-full text-center py-2 text-white font-bold text-lg">
        Magnetism
        </div>
    </div>
    </Link>

      {/* Electricity */}
      <Link to="/electricity">
    <div className="relative bg-red-500 rounded-xl w-90 h-90 shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl">
        <img
        src="https://img.freepik.com/premium-photo/electric-purple-background-with-lightning-streaks_1170794-143850.jpg"
        alt="Electricity"
        className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute bottom-0 bg-purple bg-opacity-60 w-full text-center py-2 text-white font-bold text-lg">
        Electricity
        </div>
    </div>
    </Link>
    </div>
    );
}

export default MainDivs;