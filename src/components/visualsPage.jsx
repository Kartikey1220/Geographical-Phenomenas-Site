import React from "react";
import {useState} from 'react'
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import volcanoBox from "../assets/Images/Volcano-Box_icon-removebg-preview.png";
import earthquakeBox from "../assets/Images/Earth-Catoonish-box_icon-removebg-preview.png";
import auroraBox from "../assets/Images/aurora.png";
import Bush from "../assets/Images/bush.png";
import Avatar from "../assets/Images/Avatar.png";
import EclipseLogo from "../assets/Images/SolarEclipse-removebg-preview.png";
import LavaGIF from "../assets/GIFs/LavaGIF.gif";
import AuroraGIF from '../assets/GIFs/AurorasGIF.gif'
import SolarGIF from '../assets/GIFs/SolarGIF.gif'
import Chatbot from './chatbot'
import ChatBotWidget from './ChatBotWidget'
function VisualsPage() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <div className=" relative min-h-screen bg-[#f9ae3d] flex flex-col overflow-hidden">
        <div>
          <h1 className="text-[#72883e] pl-3  font-bold font-league text-3xl pt-4 md:text-5xl lg:text-6xl">
            Choose a Wonder to Discover
          </h1>
        </div>
        <div className=" cursor- pl-3 pt-4 flex flex-col justify-end space-y-4">
          <Link to="/volcano">
            <div className="fade-Out cursor-pointer h-17 w-80 md:w-120 lg:w-160 lg:h-20 bg-white rounded-xl shadow-md flex items-center group">
              <div className="ml-2 w-16 h-16 relative">
                {/* Static image */}
                <img
                  src={volcanoBox}
                  alt="Volcano"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 rounded-md"
                />
              </div>
              {/* GIF on hover */}
              <div className=" w-160 h-20 rounded-xl absolute">
                <img
                  src={LavaGIF}
                  alt="Lava GIF"
                  className="absolute w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-md"
                />
              </div>

              <span className="text-black left-18 absolute font-bold font-sans ml-4">
                Volcanoes
              </span>
            </div>
          </Link>
          <Link to="/earth">
            <div className="fade-Out cursor-pointer h-17 w-80 md:w-120  lg:w-160 lg:h-20 bg-white rounded-xl shadow-md flex items-center    ">
              <div
                className="  ml-2 w-16 h-16 bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${earthquakeBox})` }}
              ></div>
              <span className="text-black font-bold font-sans">
                Earthquakes
              </span>
            </div>
          </Link>
          <Link to="/aurora">
            <div className="fade-Out cursor-pointer h-17 w-80 md:w-120 lg:w-160 lg:h-20 bg-white rounded-xl shadow-md flex items-center group">
              <div className="ml-2 w-16 h-16 relative">
                {/* Static image */}
                <img
                  src={auroraBox}
                  alt="Volcano"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 rounded-md"
                />
              </div>
              {/* GIF on hover */}
              <div className=" w-160 h-20 rounded-xl absolute">
                <img
                  src={AuroraGIF}
                  alt="Lava GIF"
                  className="absolute w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-md"
                />
              </div>

              <span className="text-black left-18 absolute font-bold font-sans ml-4">
                Auroras
              </span>
            </div>
          </Link>
          <Link to="/solar-eclipse">
            <div className="fade-Out cursor-pointer h-17 w-80 md:w-120 lg:w-160 lg:h-20 bg-white rounded-xl shadow-md flex items-center group">
              <div className="ml-2 w-16 h-16 relative">
                {/* Static image */}
                <img
                  src={EclipseLogo}
                  alt="Volcano"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 rounded-md"
                />
              </div>
              {/* GIF on hover */}
              <div className=" w-160 h-20 rounded-xl absolute">
                <img
                  src={SolarGIF}
                  alt="Lava GIF"
                  className="absolute w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-md"
                />
              </div>

              <span className="text-black left-18 absolute font-bold font-sans ml-4">
                Solar Eclipse
              </span>
            </div>
          </Link>
        </div>
               <ChatBotWidget/>
        <div>
          {!isMobile && (
            <div
              className="towards-left absolute top-20 -right-30 flex -rotate-45  w-120 h-100 bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${Avatar})` }}
            ></div>
          )}
   
          <div
            className="towards-left absolute -bottom-10 -right-20 flex lg:-rotate-50 lg:-right-30 lg:h-70  w-64 h-64 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${Bush})` }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default VisualsPage;
