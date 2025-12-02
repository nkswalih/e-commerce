import React from "react";
import { useNavigate } from "react-router-dom";

const HeroButtons = () => {
  const navigate = useNavigate();
  const handleShop = () => {
    navigate(`/apple`);
  };
  const handleExplore = () => {
    navigate(`/store`);
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
      <div className="relative group isolate p-0.5 rounded-full">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full blur-xl bg-[conic-gradient(from_0deg,theme(colors.cyan.400),theme(colors.blue.500),theme(colors.purple.600),theme(colors.pink.500),theme(colors.orange.400),theme(colors.cyan.400))] opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_5s_linear_infinite]"
        ></div>
        <button
          onClick={handleShop}
          className="relative bg-white text-black px-8 py-3 rounded-full font-sf-pro-regular font-medium text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 active:scale-95"
        >
          Shop Latest
        </button>
      </div>
      <button
        onClick={handleExplore}
        className="px-8 py-3 rounded-full font-sf-pro-regular font-medium text-sm sm:text-base border-2 border-white/80 text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
      >
        Explore Products
      </button>
    </div>
  );
};

export default HeroButtons;
