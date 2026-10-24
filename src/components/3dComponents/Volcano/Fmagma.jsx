import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
const MagmaShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#ff4500") },
    uColor2: { value: new THREE.Color("#ffcc00") },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
 float noise(vec3 p) {
      return sin(p.x + uTime) * sin(p.y + uTime) * sin(p.z + uTime);
    }
    void main() {
      vUv = uv;
      vec3 newPosition = position + normal * 0.2 * noise(position * 2.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    void main() {
      float glow = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, glow);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function MagmaSphere({ position , rotation , args }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh position={position} rotation={rotation} scale={[2  , 1  , 1]}>
      <sphereGeometry args={args} />
      <shaderMaterial
        ref={ref}
        uniforms={MagmaShader.uniforms}
        vertexShader={MagmaShader.vertexShader}
        fragmentShader={MagmaShader.fragmentShader}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function FloatingMagma({position , rotation , args}) {
  return (
    <>
    <MagmaSphere position={position} rotation={rotation} args={args} ></MagmaSphere>
    </>
  );
}
