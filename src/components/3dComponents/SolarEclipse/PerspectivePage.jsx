import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { MathUtils } from "three";
function LockedCamera(){
  const {camera , gl} = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    camera.rotation.x = MathUtils.damp(
      camera.rotation.x,
      targetRotation.current.x,
      12,
      delta,
    );
    camera.rotation.y = MathUtils.damp(
      camera.rotation.y,
      targetRotation.current.y,
      12,
      delta,
    );
  });

  useEffect(() => {
    camera.position.set(0, 2, 0);
    camera.rotation.order = "YXZ";

    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const sensitivity = 0.002;
    const maxPitch = Math.PI / 3;
    const minPitch = -Math.PI / 3;

    function onPointerDown(event) {
      if (event.button !== 0) return;

      isDragging = true;
      previousPointerX = event.clientX;
      previousPointerY = event.clientY;
      gl.domElement.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event) {
      if (!isDragging) return;

      targetRotation.current.y -=
        (event.clientX - previousPointerX) * sensitivity;
      targetRotation.current.x -=
        (event.clientY - previousPointerY) * sensitivity;
      previousPointerX = event.clientX;
      previousPointerY = event.clientY;

      targetRotation.current.x = Math.max(
        minPitch,
        Math.min(maxPitch, targetRotation.current.x),
      );
    }

    function onPointerUp(event) {
      isDragging = false;
      if (gl.domElement.hasPointerCapture(event.pointerId)) {
        gl.domElement.releasePointerCapture(event.pointerId);
      }
    }

    gl.domElement.addEventListener("pointerdown", onPointerDown);
    gl.domElement.addEventListener("pointermove", onPointerMove);
    gl.domElement.addEventListener("pointerup", onPointerUp);
    gl.domElement.addEventListener("pointercancel", onPointerUp);

    return () => {
      gl.domElement.removeEventListener("pointerdown", onPointerDown);
      gl.domElement.removeEventListener("pointermove", onPointerMove);
      gl.domElement.removeEventListener("pointerup", onPointerUp);
      gl.domElement.removeEventListener("pointercancel", onPointerUp);
    };
  }, [camera, gl]);
}
function BlackGlobe({position}){
  return (
    <mesh position={position}>
      <sphereGeometry></sphereGeometry>
      <meshStandardMaterial
      color={0x0000}
      emissive={0x0000}
      emissiveIntensity={2}
      ></meshStandardMaterial>
    </mesh>
  )
}
function PerspectivePage() {
  function Surface({ position }) {
    const { scene } = useGLTF("/Models/Rocky-Surface(Draco).glb");
    return <primitive object={scene} scale={1} position={position} />;
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
  return (
    <main className="h-screen w-screen bg-black">
      <Canvas camera={{ position: [0, 2, 0] }}>
        <LockedCamera></LockedCamera>
        <ambientLight intensity={0.8}></ambientLight>
        <Surface rotation={[ 0, 90 ,0]} position={[0, 0, 0]} />
        <BlackGlobe position={[-15 , 0 ,0]}></BlackGlobe>
        <Sun position={[-20 , 0, 0]}></Sun>
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          ></Bloom>
        </EffectComposer>
      </Canvas>
    </main>
  );
}

export default PerspectivePage;
