import React from 'react';

const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
      {/* PRIMARY BUTTON: The "Apple Intelligence" Style Glow */}
      {/* We use a wrapper 'group' relative container to hold the glow and the button */}
      <div className="relative group isolate p-0.5 rounded-full">
        
        {/* THE GLOW LAYER:
            - Absolute positioning behind the button (-z-10).
            - Conic gradient for the rainbow effect.
            - Heavy blur (blur-xl or blur-2xl).
            - animate-spin-slow (You might need to define this in config, otherwise use 'animate-spin')
            - Opacity changes on hover for interaction.
        */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full blur-xl bg-[conic-gradient(from_0deg,theme(colors.cyan.400),theme(colors.blue.500),theme(colors.purple.600),theme(colors.pink.500),theme(colors.orange.400),theme(colors.cyan.400))] opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_5s_linear_infinite]"
        ></div>

        {/* THE ACTUAL BUTTON CONTENT:
            - Clean white background.
            - Slightly elevated typography (font-medium).
            - Subtle scale effect on click/hover.
        */}
        <button className="relative bg-white text-black px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 active:scale-95">
          Shop Latest
        </button>
      </div>


      {/* SECONDARY BUTTON: Minimalist Contrast */}
      {/* - Kept simple to not compete with the primary button.
          - Used white/80 for a slightly translucent, premium feel against dark hero bgs.
          - Subtle background fill on hover.
      */}
      <button className="px-8 py-3 rounded-full font-medium text-sm sm:text-base border-2 border-white/80 text-white hover:bg-white/10 transition-all duration-300 active:scale-95">
        Explore Products
      </button>
    </div>
  );
};

export default HeroButtons;