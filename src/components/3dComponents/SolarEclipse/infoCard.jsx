import React from "react";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
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
          <div className="flex flex-col w-full items-center justify-center text-center overflow-hidden">
            <h1 className=" text-white font-bold font-league text-3xl lg:text-4xl">
              <span
                className="font-bold bg-linear-to-r from-black from-0.2% via-indigo-800 via-10% to-yellow-400 to-80%
             bg-clip-text text-transparent"
                // style={{
                //   background: "linear-gradient(to right,  #0000ff, #800080)",
                //   WebkitBackgroundClip: "text",
                //   WebkitTextFillColor: "transparent",
                // }}
              >
                Solar Eclipse
              </span>
            </h1>
            <Link to="/earth-perspective">
              <button className="mb-2 mt-2 bg-transparent text-white px-1 py-2 text-bold border rounded-sm cursor-pointer hover:bg-white hover:text-black ">
                Earth's Perspective
              </button>
            </Link>
          </div>
          <div>
            <p className="text-white mx-auto max-w-md lg:text-lg  text-md text-center ">
              🌌 <span className="font-bold">Introduction : </span>A solar
              eclipse occurs when the Moon passes between the Earth and the Sun,
              blocking sunlight either partially or completely. It is one of the
              most dramatic celestial events, briefly turning day into night in
              some regions.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              ⚙️{" "}
              <span className="font-bold">Functioning (How They Work) : </span>
              The Sun, Moon, and Earth must align in a straight line. Umbra &
              Penumbra: Umbra → the Moon’s central shadow, causing a total
              eclipse. Penumbra → the outer shadow, causing a partial eclipse.
              Types of Solar Eclipses: Total → Moon completely covers the Sun.
              Partial → Moon covers part of the Sun. Annular → Moon is farther
              away, appearing smaller, leaving a “ring of fire.” Hybrid → shifts
              between total and annular depending on location.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📍 <span className="font-bold">Current Locations : </span>Solar
              eclipses can occur anywhere on Earth, but only along the path of
              totality — a narrow strip where the Moon’s shadow falls. Visible
              only during new moon phase. Each eclipse is observable in limited
              regions; most of the world sees only partial coverage. On average,
              a total solar eclipse happens somewhere on Earth every 18 months,
              but any given location experiences it only once every ~375 years.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              📖 <span className="font-bold">History : </span>
              Solar eclipses have fascinated and frightened civilizations:
              Ancient cultures often saw them as omens. The 1919 eclipse
              confirmed Einstein’s theory of relativity by showing starlight
              bending around the Sun. Modern eclipses are major scientific and
              cultural events, drawing millions of observers.
            </p>
            <p className="text-white mx-auto max-w-md lg:text-lg text-md text-center mt-4">
              🌍 <span className="font-bold">Origin & Foundations : </span>
              Solar eclipses occur due to the Moon’s orbit around Earth: The
              Moon is about 400 times smaller than the Sun, but also 400 times
              closer, making them appear the same size in the sky. When
              alignment is perfect, the Moon’s shadow falls on Earth, creating
              the eclipse. They highlight the precision of celestial mechanics
              and the dynamic relationship between Earth, Moon, and Sun.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default InfoCard;
