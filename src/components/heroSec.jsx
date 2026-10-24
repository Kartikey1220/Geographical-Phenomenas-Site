import React from "react";
import heroBg from "../assets/Images/Hero-Background-Image.png";
import {useNavigate , Link} from 'react-router-dom'
import {Typewriter} from 'react-simple-typewriter'

function HeroSec() {
  return (
    <>
      <div className="h-screen bg-[#663b1f] flex w-full flex-col items-center text-center space-y-4 lg:space-y-4 ">
        <div className="font-lilita flex w-full items-center justify-center px-4">
          <h1 className="text-[#f9ae3d] whitespace-nowrap border-r-4 border-[#f9ae3d] animate-typing overflow-x-hidden overflow-y-visible text-4xl sm:text-4xl heading-shadow md:text-5xl lg:text-6xl  font-lilita text-center leading-tight">
           Immersive Geography <span className="block sm:inline-block ">Lab</span> 
          </h1>
        </div>
        <div className="flex items-center justify-center font-fredoka font-bold px-4 text-center">
          <p className="text-[#ffbd59]  upward hidden sm:block font-fredoka font-bold text-xl sm:text-2xl md:text-4xl lg:text-3xl text-shadow">Explore Earth's wonders through interactive visuals</p>
        </div>
        <div className="flex w-full items-center justify-center px-4">
          <div
            className="fade-Out w-full h-84 sm:h-90 lg:h-96  bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          ></div>
        </div>
        <div>
          <div className="font-league">
            <Link to="/visuals">
              <button className="cursor-pointer shadow-xl font-league font-bold text-xl rounded-md px-8 py-6 lg:px-12 sm:text-base sm:w-40 text-white bg-[#72883e] lg:text-xl lg:w-46">
                Start
              </button>
            </Link>
            
          </div>
        </div>
        
      </div>
    </>
  );
}

export default HeroSec;
