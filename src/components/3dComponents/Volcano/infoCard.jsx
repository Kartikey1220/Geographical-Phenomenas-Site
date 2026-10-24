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
        className={`fixed right-0 top-40 lg:top-0 w-[min(90vw,26rem)] transform transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="h-[calc(100dvh-10rem)] w-[min(90vw,24rem)] overflow-y-auto overflow-x-hidden hide-scrollbar rounded-md bg-transparent px-4 py-5 lg:h-screen"
        >
          <div className="flex w-full items-center justify-center text-center overflow-hidden">
            <h1 className="  bg-linear-to-r from-yellow-400 to-orange-700 
             bg-clip-text text-transparent font-bold font-league text-3xl lg:text-4xl">
              Volcanoes
            </h1>
          </div>
          <div>
            <p className="text-white mx-auto max-w-md lg:text-lg  text-md text-center ">
              A volcano is a vent or fissure in Earth’s crust through which
              magma, ash, and gases escape from underground reservoirs. They are
              among the most powerful natural phenomena, shaping landscapes and
              influencing climate. Volcanoes can be explosive or effusive,
              depending on magma chemistry and gas pressure.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              ⚙️{" "}
              <span className="font-bold">Functioning (How They Work) : </span>
              Magma formation: Heat and pressure deep inside Earth melt rocks
              into magma. Magma chamber: Magma collects in underground
              reservoirs. Pressure buildup: Trapped gases expand, increasing
              pressure. Eruption: Magma escapes through cracks, erupting as
              lava, ash, and gases. Types of eruptions: Effusive → runny lava
              flows (e.g., Kilauea, Hawaii). Explosive → violent blasts with ash
              clouds and pyroclastic flows (e.g., Mount St. Helens, USA).
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📍 <span className="font-bold">Current Locations : </span>{" "}
              Volcanoes are found worldwide, especially along tectonic plate
              boundaries. Pacific Ring of Fire: Most active volcanoes (Japan,
              Indonesia, Philippines, Chile). Mid‑Atlantic Ridge: Underwater
              volcanoes formed by divergent plates. Hotspots: Hawaii, Iceland.
              India: The only active volcano is Barren Island in the Andaman
              Sea. Globally, there are about 1,500 potentially active volcanoes,
              with ~161 in the United States alone.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📖 <span className="font-bold">History : </span>
              Volcanoes have shaped civilizations: Ancient eruptions like
              Pompeii (Mount Vesuvius, 79 CE) destroyed entire cities. The 1815
              eruption of Mount Tambora (Indonesia) caused a “Year Without
              Summer,” leading to famines worldwide. The 1980 Mount St. Helens
              eruption (USA) remains one of the most studied modern eruptions.
              Volcanoes have also created fertile soils, enabling agriculture
              and settlement.
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
