import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const MagmaShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#ff0000') },
    uColor2: { value: new THREE.Color('#ffa500') },
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
  `
};

function MagmaSphere({ position }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const timeUniform = ref.current?.uniforms?.uTime
    if (timeUniform) timeUniform.value = clock.elapsedTime
    
  })

  return (
    <mesh position={position}>
      <sphereGeometry args={[4.5, 64, 64]} />
      <shaderMaterial
        ref={ref}
        uniforms={MagmaShader.uniforms}
        vertexShader={MagmaShader.vertexShader}
        fragmentShader={MagmaShader.fragmentShader}
      />
    </mesh>
  )
}

export default function RisingMagma({ y = -2 }) {
  return (
    <>
    <MagmaSphere position={[ 0, y , 0]}></MagmaSphere>

    </>
  )
}
