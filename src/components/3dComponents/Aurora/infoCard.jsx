import React from "react";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
function InfoCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlip, setIsFlip] = useState(false);
  const handleCardClick = () => {
    if (isOpen && isFlip) {
      setIsOpen(false);
      setIsFlip(false);
    } else {
      setIsOpen(true);
      setIsFlip(true);
    }
  };
  return (
    <>
      <ArrowLeftIcon
        onClick={handleCardClick}
        className={`${isFlip ? "flipOpen" : "flipClose"} absolute right-0 top-2 mx-auto z-10 h-7 w-7 text-white cursor-pointer`}
      />
      <div
        className={`fixed right-0 top-0 w-[min(90vw,26rem)] transform transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="h-screen w-[min(90vw,24rem)] overflow-y-auto overflow-x-hidden hide-scrollbar rounded-md bg-transparent px-4 py-5"
        >
          <div className="flex w-full items-center justify-center text-center overflow-hidden">
            <h1 className=" text-white font-bold font-league text-3xl lg:text-4xl">
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(to right,  #0000ff, #800080)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Auroras
              </span>
            </h1>
          </div>
          <div>
            <p className="text-white mx-auto max-w-md lg:text-lg  text-md text-center ">
              🌌 <span className="font-bold">Introduction : </span>
              Auroras are natural light displays in the sky, often seen near
              Earth’s polar regions. They appear as shimmering curtains or arcs
              of green, red, blue, or purple light. The Northern Lights are
              called Aurora Borealis, while the Southern Lights are Aurora
              Australis.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              ⚙️{" "}
              <span className="font-bold">Functioning (How They Work) : </span>
              Solar wind: The Sun constantly emits charged particles (electrons
              and protons). Magnetic field interaction: Earth’s magnetic field
              deflects most particles, but near the poles, field lines guide
              them into the atmosphere. Collisions: These particles collide with
              oxygen and nitrogen atoms in the upper atmosphere. Light emission:
              Excited atoms release energy as light: Oxygen → green or red glow.
              Nitrogen → blue or purple glow.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📍 <span className="font-bold">Current Locations : </span> Auroras
              are most visible in high‑latitude regions: Aurora Borealis
              (Northern Lights): Norway, Sweden, Finland, Iceland, Canada,
              Alaska, Russia. Aurora Australis (Southern Lights): Antarctica,
              southern Australia, New Zealand, southern Chile. They can
              occasionally be seen farther south during strong solar storms.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📖 <span className="font-bold">History : </span>
              🌍 Auroras originate from the interaction between solar wind and
              Earth’s magnetosphere. Magnetosphere: Earth’s protective magnetic
              bubble. Solar storms: Strong bursts of solar wind intensify
              auroras, making them visible farther from the poles. Planetary
              auroras: Other planets with magnetic fields (Jupiter, Saturn) also
              have auroras, showing this is a universal phenomenon.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              🌍 <span className="font-bold">Origin & Foundations : </span>
              Volcanoes form mainly due to plate tectonics: Convergent
              boundaries: One plate sinks under another, melting rock into magma
              (e.g., Andes Mountains). Divergent boundaries: Plates pull apart,
              magma rises (e.g., Mid‑Atlantic Ridge). Hotspots: Magma plumes
              rise from deep mantle, creating chains of volcanoes (e.g.,
              Hawaiian Islands). They are Earth’s “geologic architects,”
              responsible for creating over 80% of Earth’s surface.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default InfoCard;
