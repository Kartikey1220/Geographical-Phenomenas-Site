import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import InfoCard from "./infoCard";
function Aurora() {
  function EarthModel({ position }) {
    const { scene } = useGLTF("/Models/Earth.glb");
    return <primitive object={scene} scale={3} position={position} />;
  }
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
  function SunBeam({ position }) {
    return (
      <mesh rotation={[0, 0, -Math.PI / 2]} position={position}>
        <cylinderGeometry args={[1, 1, 27]} />
        <meshPhysicalMaterial
          color="yellow"
          emissive="orange" // glow color
          emissiveIntensity={2} // stronger glow
          transparent
          opacity={0.1} // semi-transparent
        />
      </mesh>
    );
  }

  function BeamParticles({ position }) {
    const positionRef = useRef();

    // Fill the beam along its X axis and across its circular cross-section.
    const particles = useMemo(() => {
      const arr = [];
      for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * 0.9;
        arr.push(Math.random() * 27 - 13.5); // x
        arr.push(Math.cos(angle) * radius); // y
        arr.push(Math.sin(angle) * radius); // z
      }
      return new Float32Array(arr);
    }, []);

    useFrame((state, delta) => {
      if (!positionRef.current) return;
      const time = state.clock.getElapsedTime();
      const positions = positionRef.current.array;

      for (let i = 0; i < positions.length; i += 3) {
        // Flow horizontally along the beam.
        positions[i] += delta * 1.2;

        // Add a gentle movement across the beam.
        positions[i + 1] += Math.sin(time + i) * 0.001;
        positions[i + 2] += Math.cos(time + i) * 0.001;

        // Wrap particles to the start of the beam.
        if (positions[i] > 13.5) {
          positions[i] = -13.5;
        }
      }

      positionRef.current.needsUpdate = true;
    });
    
    return (
      <points position={position}>
        <bufferGeometry>
          <bufferAttribute
            ref={positionRef}
            attach="attributes-position"
            array={particles}
            count={particles.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="yellow" size={0.1} transparent opacity={0.8} />
      </points>
    );
  }
function AuroraRing({ position, speed = 0.2 }) {
  const ref = useRef()

  const geometry = useMemo(() => {
    const innerRadius = 0.5
    const outerRadius = 1.5
    const segments = 128
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, segments)
    geo.rotateX(Math.PI / 2)
    return geo
  }, [])

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x8a2be2),   // BlueViolet
        emissive: new THREE.Color(0xcc0066),// Purple-pink glow
        emissiveIntensity: 7,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    []
  )

  useFrame(() => {
    if (!ref.current) return
    const time = Date.now() * 0.001
    const oscillation = Math.sin(time * speed) * 0.5 + 0.5

    // Gentle opacity shimmer (0.8 → 0.9)
    ref.current.material.opacity = 0.8 + oscillation * 0.1

    // Gentle emissive shimmer (6 → 8)
    ref.current.material.emissiveIntensity = THREE.MathUtils.clamp(
      6 + oscillation * 2,
      6,
      8
    )

    // Very subtle hue shift (almost imperceptible)
    const hueShift = Math.sin(time * speed * 0.25) * 0.005
    ref.current.material.color.offsetHSL(hueShift, 0, 0)
  })

  return (
    <mesh ref={ref} geometry={geometry} material={material} position={position} />
  )
}


  const isMobile = window.innerWidth < 768;
  return (
    <main className="bg-black h-screen w-screen">
      <Canvas camera={{ position: isMobile ? [0, 0, 60] : [0, 0, 30] }}>
        <ambientLight intensity={0.8} />
        <Sun position={[-20, 0, 0]}></Sun>
        <EarthModel position={[10, 0, 0]}></EarthModel>
        <SunBeam position={[-5, 2, 0]}></SunBeam>
        <BeamParticles position={[-5, 2, 0]}></BeamParticles>
        <AuroraRing position={[10 ,3 ,0]}></AuroraRing>
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          ></Bloom>
        </EffectComposer>
        <OrbitControls
          enableRotate={true} // allows camera rotation with drag
          enableZoom={true} // allows zoom with scroll
          autoRotate={false}
        />
      </Canvas>
      <InfoCard></InfoCard>
    </main>
  );
}

export default Aurora;
