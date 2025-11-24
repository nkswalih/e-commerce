import React from 'react'
import HeroButtons from './HeroButton'

const MainHero = () => {
  return (
    <div>
              {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
            poster="/images/hero-poster.jpg"
          >
            <source src="src/assets/videos/xlarge_2x.mp4" type="video/mp4" />
            <source src="/videos/tech-hero.webm" type="video/webm" />
            {/* Fallback image */}
            <img src="/images/hero-fallback.jpg" alt="Tech Innovation" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-medium font-sans italic mb-2 tracking-tight">
            Ech<span className="font-bold font-serif">O</span>o.
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-shadow-white mb-4 max-w-3xl mx-auto leading-relaxed">
            Where Innovation Meets Elegance
          </p>

          <HeroButtons/>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      <div className="absolute inset-x-0 bottom-0 h-30 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </div>
  )
}

export default MainHero