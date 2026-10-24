import React, { forwardRef } from "react";
import { useRef, useState, useEffect } from "react";
import { Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FloatingMagma from "../Volcano/Fmagma";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import {EffectComposer, Bloom} from "@react-three/postprocessing";
import * as THREE from "three";
import InfoCard from "./infoCard";
import gsap from "gsap";
import { Html } from "@react-three/drei";
const TectonicPlate1 = forwardRef(function TectonicPlate1(
  { position, isShaking },
  ref,
) {
  const gradient = useLoader(
    TextureLoader,
    "/Textures/TectonicPlateTexture.jpg",
  );
  useEffect(() => {
    if (!isShaking) return;

    const rightShake = gsap.to(ref.current.position, {
      z: "+=2",
      duration: 0.5,
    });
    return () => {
      rightShake.kill();
    };
  }, [isShaking]);

  return (
    <>
      <mesh position={position} ref={ref}>
        <boxGeometry args={[30, 3, 30]}></boxGeometry>
        <meshStandardMaterial map={gradient}></meshStandardMaterial>
      </mesh>
    </>
  );
});

const TectonicPlate2 = forwardRef(function TectonicPlate2(
  { position, isShaking },
  ref,
) {
  const gradient = useLoader(
    TextureLoader,
    "/Textures/TectonicPlateTexture.jpg",
  );
  useEffect(() => {
    if (!isShaking) return;
    const leftShake = gsap.to(ref.current.position, {
      z: "-=2",
      duration: 0.5,
    });

    return () => {
      leftShake.kill();
    };
  }, [isShaking]);

  return (
    <>
      <mesh position={position} ref={ref}>
        <boxGeometry args={[30, 3, 30]}></boxGeometry>
        <meshStandardMaterial map={gradient}></meshStandardMaterial>
      </mesh>
    </>
  );
});
function EarthSurface({ isOpen, position }) {
  const ref = useRef();
  const gradient = useLoader(TextureLoader, "/Textures/RoadTexture.jpg");
  const materials = [
    new THREE.MeshStandardMaterial({ color: "gray" }), // right
    new THREE.MeshStandardMaterial({ color: "gray" }), // left
    new THREE.MeshStandardMaterial({ map: gradient }), // top (texture applied here)
    new THREE.MeshStandardMaterial({ color: "gray" }), // bottom
    new THREE.MeshStandardMaterial({ color: "gray" }), // front
    new THREE.MeshStandardMaterial({ color: "gray" }), // back
  ];
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const horizontalMovement = gsap.to(ref.current.position, {
        x: position[0] + 0.1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      const verticalMovement = gsap.to(ref.current.position, {
        y: position[1] + 0.1,
        duration: 0.15,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      ref.current.movementTweens = [horizontalMovement, verticalMovement];
    }, 5000);

    return () => {
      clearTimeout(timer);
      ref.current?.movementTweens?.forEach((tween) => tween.kill());
      delete ref.current?.movementTweens;
    };
  }, [isOpen, position]);

  return (
    <>
      <mesh position={position} ref={ref} material={materials}>
        <boxGeometry args={[30, 5, 30]}></boxGeometry>
      </mesh>
    </>
  );
}
function EarthPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const isMobile = window.innerWidth < 768;
  const plate1 = useRef();
  const plate2 = useRef();

  function handleClick() {
    setIsOpen((current) => !current);
    setIsShaking((current) => !current);
  }
  useEffect(() => {
    if (!isOpen || !isShaking || !plate1.current || !plate2.current) return;

    const targets = [plate1.current.position, plate2.current.position];
    const timer = setTimeout(() => {
      const movement = gsap.to(targets, {
        x: "+=0.1",
        y: "+=0.15",
        duration: 0.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
      targets.movement = movement;
    }, 2000);

    return () => {
      clearTimeout(timer);
      targets.movement?.kill();
      delete targets.movement;

      gsap.to(plate1.current?.position, {
        x: 0,
        y: 5,
        z: -20,
        duration: 0.5,
        ease: "power1.out",
      });
      gsap.to(plate2.current?.position, {
        x: 0,
        y: 5,
        z: 15,
        duration: 0.5,
        ease: "power1.out",
      });
    };
  }, [isOpen, isShaking]);
  function SeismicWave({ position }) {
    const ref = useRef();

    useEffect(() => {
      if (isShaking) {
        // Animate the material opacity for fadeout
        ref.current.material.opacity = 0;

        gsap.to(ref.current.material, {
          opacity: 2,
          duration: 2,
          ease: "power2.inOut",
          delay:2,
        });
      }
    }, [isShaking]);

    return (
      <Text
        ref={ref}
        position={position}
        fontSize={8}
        color="white"
        rotation={[0 ,Math.PI / 2 , Math.PI / 2]}
        material-transparent
      >
        ~
      </Text>
    );
  }
  function SeismicText({position}){
    const ref = useRef();
    useEffect(() => {
      ref.current.material.opacity = 0
      if(isShaking){
        gsap.to(ref.current.material, {
           opacity: 2,
          duration: 2,
          ease: "power2.inOut",
          delay:2,
        })
      }
    } , [isShaking])
    return(
        <Text
        ref={ref}
        position={position}
        fontSize={1}
        color="white"
        rotation={[0 , -Math.PI / 2 ,0]}
        material-transparent
      >
        Seismic Waves
      </Text>
    )
  }
  return (
    <main className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: isMobile ? [0, 20, 120] : [0, 40, 10] }}
        className="block h-full w-full"
      >
        <ambientLight intensity={0.8}></ambientLight>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[60, 120, 3]} />
          <meshStandardMaterial color="red"></meshStandardMaterial>
        </mesh>
        <EarthSurface position={[0, 15, -2]} isOpen={isOpen}></EarthSurface>
        <TectonicPlate1
          position={[0, 5, -20]}
          isShaking={isShaking}
          ref={plate1}
        ></TectonicPlate1>
        <TectonicPlate2
          position={[0, 5, 15]}
          isShaking={isShaking}
          ref={plate2}
        ></TectonicPlate2>
        <FloatingMagma position={[0, 2, 9]} args={[2, 32, 32]}></FloatingMagma>
        {isShaking && (
          <>
            <SeismicWave position={[0, 10, -1]}></SeismicWave>
            <SeismicWave position={[0, 10, -4]}></SeismicWave>
            <SeismicText position={[0 , 10 , 3]}></SeismicText>
          </>
        )}
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.5} luminanceSmoothing={0.9}/>
        </EffectComposer>
        <OrbitControls />
      </Canvas>
      <div className="absolute left-2 top-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleClick}
        >
          {isOpen ? "Stop" : "Start"}
        </button>
      </div>
      <InfoCard></InfoCard>
    </main>
  );
}

export default EarthPage;
