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
      <div className={`fixed right-0 top-0 w-[min(90vw,26rem)] transform transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div
          className="h-screen w-[min(90vw,24rem)] overflow-y-auto overflow-x-hidden hide-scrollbar rounded-md bg-transparent px-4 py-5"
        >
          <div className="flex w-full items-center justify-center text-center overflow-hidden">
            <h1 className=" text-white font-bold font-league text-3xl lg:text-4xl">
              <span className="text-green-500">Earth</span><span className="text-blue-400">quakes</span>
            </h1>
          </div>
          <div>
            <p className="text-white mx-auto max-w-md lg:text-lg  text-md text-center ">
              🌍 <span className="font-bold">Introduction : </span> An
              earthquake is the sudden shaking of the ground caused by the
              release of energy in Earth’s crust. This energy travels as seismic
              waves, which can range from mild tremors to violent shocks capable
              of destroying cities. Earthquakes occur naturally due to tectonic
              activity but can also be induced by human actions like mining or
              fracking.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              ⚙️{" "}
              <span className="font-bold">Functioning (How They Work) : </span>
              Stress buildup: Tectonic plates constantly move, creating stress
              along faults. Rupture: When stress exceeds rock strength, the
              fault slips suddenly. Seismic waves: Energy radiates outward as
              P‑waves (fast, compressional) and S‑waves (slower, shear).
              Epicenter vs. Hypocenter: Hypocenter (focus) → the underground
              point of rupture. Epicenter → the surface point directly above it.
              Effects: Ground shaking, soil liquefaction, landslides, and
              sometimes tsunamis if the quake occurs offshore.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📍 <span className="font-bold">Current Locations : </span>{" "}
              Earthquakes occur worldwide but are most frequent along tectonic
              plate boundaries: Pacific Ring of Fire: ~80% of global earthquakes
              (Japan, Indonesia, Chile, California). Himalayan Belt: India,
              Nepal, Pakistan — due to collision of Indian and Eurasian plates.
              Mid‑Atlantic Ridge: Quakes along divergent boundaries. Intraplate
              regions: Less common but possible (e.g., New Madrid Seismic Zone,
              USA).
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📖 <span className="font-bold">History : </span>
              1960 Valdivia, Chile: Largest recorded quake (magnitude 9.5). 1906
              San Francisco, USA: Destroyed much of the city, shaping modern
              earthquake engineering. 2010 Haiti: Magnitude 7.0, killed over
              200,000 people. 2001 Bhuj, India: Magnitude 7.7, caused ~20,000
              deaths and massive destruction.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              🌍 <span className="font-bold">Origin & Foundations : </span>
              Earthquakes originate from plate tectonics and fault mechanics:
              Convergent boundaries: Plates collide → megathrust quakes (e.g.,
              Japan). Divergent boundaries: Plates pull apart → smaller quakes
              (e.g., Iceland). Transform boundaries: Plates slide past each
              other → strike‑slip quakes (e.g., San Andreas Fault, USA). Elastic
              rebound theory: Rocks deform under stress, then snap back,
              releasing energy as seismic waves.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoCard;
