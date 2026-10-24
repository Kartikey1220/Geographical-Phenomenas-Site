import React, { useEffect, useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei";
import { RoundedBox } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Bar from "./bar";
import RisingMagma from "./Rmagma";
import FloatingMagma from "./Fmagma";
import InfoCard from "./infoCard";
import tempratureIcon from "../../../assets/Icons/high-temprature.png";
import pressureIcon from "../../../assets/Icons/pressure-gauge.png";
function MeshMagmaSurface() {
  const gradient = useLoader(TextureLoader, "/Textures/LavaTexture.jpg");

  return (
    <RoundedBox
      args={[20, 0.5, 20]}
      radius={0}
      smoothness={2}
      position={[0, 2, 0]}
    >
      <meshStandardMaterial
        map={gradient}
        emissive="#ff0000"
        emissiveIntensity={1}
      />
    </RoundedBox>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl">Loading {Math.floor(progress)}%</div>
    </Html>
  );
}
function VolcanoPage() {
  const [value, setValue] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef(direction);
  const isPausedRef = useRef(isPaused);
  const intervalRef = useRef(null);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const startMagma = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (isPausedRef.current) return;

      setValue((prev) => {
        const currentDirection = directionRef.current;
        let next = prev + currentDirection;

        if (next >= 100 && currentDirection === 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          isPausedRef.current = true;
          setIsPaused(true);

          setTimeout(() => {
            directionRef.current = -1;
            setDirection(-1);
            isPausedRef.current = false;
            setIsPaused(false);
            startMagma();
          }, 3000);

          return 100;
        }

        if (next <= 0 && currentDirection === -1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          isPausedRef.current = true;
          setIsPaused(true);

          setTimeout(() => {
            directionRef.current = 1;
            setDirection(1);
            isPausedRef.current = false;
            setIsPaused(false);
            startMagma();
          }, 30000);

          return 0;
        }

        return next;
      });
    }, 30);
  }, []);

  const stopMagma = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPausedRef.current = false;
    setIsPaused(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  function VolcanoModel({ position }) {
    const { scene } = useGLTF("/Models/Snowy_mountain.glb/scene.gltf");
    return <primitive object={scene} scale={20} position={position} />;
  }
  return (
    <main className="h-screen w-screen overflow-visible">
      <Canvas
        className="block h-full w-full"
        camera={{ position: isMobile ? [0, 20, 40] : [0, 40, 10] }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.8} />
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[60, 120, 3]} />
          <meshStandardMaterial color="brown" />
        </mesh>
        <Suspense fallback={<Loader></Loader>}>
          <VolcanoModel position={[0, 0, 0]}></VolcanoModel>
        </Suspense>
        <MeshMagmaSurface />
        <FloatingMagma position={[0, 2, 9]} args={[2, 32, 32]}></FloatingMagma>
        <FloatingMagma
          position={[0, 2, -10]}
          args={[2, 32, 32]}
        ></FloatingMagma>
        <FloatingMagma
          position={[-9, 2, -2]}
          rotation={[0, Math.PI / 2, 0]}
          args={[2, 32, 32]}
        ></FloatingMagma>
        <RisingMagma y={-5.5 + value * 0.1}></RisingMagma>
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
      <div className="flex items-center justify-center absolute top-5  lg:-gap-4 left-2">
        {/* <div className="flex flex-col lg:-gap-4 justify-center items-center gap-y-2">
           <div className="bg-contain bg-no-repeat h-8 w-8" style={{ backgroundImage: `url(${tempratureIcon})` }}></div>
            <div className="bg-cover bg-no-repeat h-6 w-6"style={{ backgroundImage: `url(${pressureIcon})` }}></div>
        </div> */}
        <div className="flex items-center justify-center  flex-col">
          <Bar value={value} color="red" label="Temprature"></Bar>
          <Bar value={value} color="orange" label="Pressure"></Bar>
        </div>

        <div className="flex flex-row absolute left-2 top-24 gap-x-2">
          <button
            className="bg-red-600 text-white font-bold px-4 py-2 rounded-md cursor-pointer"
            onClick={startMagma}
          >
            Start
          </button>
          <button
            className="bg-red-600 text-white font-bold px-4 py-2 rounded-md cursor-pointer"
            onClick={stopMagma}
          >
            Stop
          </button>
        </div>
      </div>
      <InfoCard></InfoCard>
    </main>
  );
}

export default VolcanoPage;
