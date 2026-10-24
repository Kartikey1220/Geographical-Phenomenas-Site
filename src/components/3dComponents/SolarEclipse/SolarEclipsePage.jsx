import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useGLTF } from "@react-three/drei";
import InfoCard from "./infoCard";
function EclipsePage() {
  function Sun({ position }) {
    return (
      <mesh position={position}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          color={0xffc400}
          emissive={0xff9e00}
          emissiveIntensity={6}
        />
      </mesh>
    );
  }
  function Earth({ position }) {
    const { scene } = useGLTF("/Models/Earth.glb");
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = true; // Earth receives shadow
      }
    });
    return <primitive object={scene} scale={3} position={position} />;
  }
  function Moon({ position }) {
    const { scene } = useGLTF("/Models/Moon(Draco).glb");

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Moon casts shadow
        child.receiveShadow = false;
      }
    });
    return <primitive object={scene} scale={1} position={position} />;
  }
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <main className="bg-black h-screen w-screen overflow-x-hidden">
      <Canvas shadows camera={{ position: isMobile ? [0, 0, 60] : [0, 0, 30] }}>
        <ambientLight intensity={0.8}></ambientLight>
        <directionalLight
          castShadow
          position={[-20, 0, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Sun position={[-20, 0, 0]}></Sun>
        <Moon position={[0, 0, 0]}></Moon>
        <Earth position={[10, 0, 0]}></Earth>

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          ></Bloom>
        </EffectComposer>
        <OrbitControls></OrbitControls>
      </Canvas>
      <InfoCard></InfoCard>
    </main>
  );
}

export default EclipsePage;
