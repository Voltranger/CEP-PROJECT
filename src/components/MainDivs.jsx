import { Link } from "react-router-dom";
import FloatingSymbols from "./FloatingSymbols";

const MainDivs = () => {
  const cards = [
    {
      title: "Projectile Motion",
      link: "/projectile",
      image: "https://thumbs.dreamstime.com/b/colorful-smoke-projectile-motion-create-dynamic-captivating-visual-effect-launched-vibrant-creating-awe-364002297.jpg",
      gradient: "from-blue-700 to-purple-500",
      glow: "hover:shadow-purple-500/80",
    },
    {
      title: "Magnetism",
      link: "/magnetism",
      image: "https://cosmosatyourdoorstep.com/wp-content/uploads/2018/02/magnetism.jpg",
      gradient: "from-green-600 to-teal-500",
      glow: "hover:shadow-green-500/80",
    },
    {
      title: "Electricity",
      link: "/electricity",
      image: "https://img.freepik.com/premium-photo/electric-purple-background-with-lightning-streaks_1170794-143850.jpg",
      gradient: "from-red-600 to-purple-800",
      glow: "hover:shadow-red-500/80",
    },
  ];

  return (
    <div className="flex justify-center gap-12 mt-12 mx-auto max-w-7xl px-6 flex-wrap">
        <FloatingSymbols />
      {cards.map((card) => (
        <Link key={card.title} to={card.link} className="w-full sm:w-1/2 lg:w-1/4 min-w-[280px]">
          <div
            className={`relative bg-gradient-to-br ${card.gradient} rounded-2xl aspect-square shadow-2xl overflow-hidden transform transition-all duration-500 cursor-pointer
            hover:scale-[1.07] hover:-translate-y-2 hover:rotate-1 ${card.glow}`}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent pt-10 text-white font-extrabold text-xl sm:text-2xl">
              <div className="py-4 text-center animate-fade-in">
                {card.title}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainDivs;
