import React from "react";

const IphoneAir = () => {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <video
            src="src/assets/videos/vid_3_xlarge_2x (2).mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-100"
            poster="/images/hero-poster.jpg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-black max-w-4xl mx-auto px-6 pt-7 pb-96">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-dm-sans font-bold pt-10 mb-2 tracking-tight">
          iPhone Air
        </h1>

        {/* Subheading */}
        <div className="mb-6">
          <p className="text-xl md:text-2xl lg:text-2xl font-vent-sans font-medium tracking-wide">
            The thinnest iPhone ever.
          </p>
          <p className="text-xl md:text-2xl lg:text-2xl font-light tracking-wide">
            With the power of pro inside.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-normal text-base hover:bg-blue-600 transition-all duration-300">
            Learn more
          </button>
          <button className="text-blue-400 border text-base font-normal px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
            Buy
          </button>
        </div>
      </div>
    </section>
  );
};

export default IphoneAir;