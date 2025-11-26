import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import IphoneAir from '../components/Hero Section/ProductHero2';
import MainHero from '../components/Hero Section/Hero';
import AppleMac from '../components/Hero Section/ProductHero3';
import SimpleFooter from '../components/SimpleFoot';

const Home = () => {


  return (
    <div className="min-h-screen bg-white text-white">
      <MainHero/>

      {/* Featured Products Section */}
    

      {/* Product Showcase Sections */}
      <section className="py-5">
        {/* iPhone Air Section */}
        <IphoneAir/>
        <AppleMac/>
     
      </section>

      {/* Third Section
      <section className="py-20 bg-gray-900">
      </section> */}
      <div className='text-black'>
      <SimpleFooter/>
      </div>
    </div>
  );
};

export default Home;