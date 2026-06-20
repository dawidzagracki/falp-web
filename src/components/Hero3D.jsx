import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Icosahedron } from '@react-three/drei'

// Główny, błyszczący obiekt reagujący na ruch myszy
function Blob() {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const m = ref.current
    if (!m) return
    m.rotation.y = t * 0.15
    m.rotation.x = Math.sin(t * 0.2) * 0.12
    // parallax od kursora
    m.position.x += (state.pointer.x * 0.4 - m.position.x) * 0.04
    m.position.y += (state.pointer.y * 0.4 - m.position.y) * 0.04
  })
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <Icosahedron ref={ref} args={[1.35, 8]}>
        <MeshDistortMaterial
          color="#7DD13F"
          roughness={0.12}
          metalness={0.4}
          distort={0.42}
          speed={1.7}
          envMapIntensity={0.6}
        />
      </Icosahedron>
    </Float>
  )
}

// Delikatna siatka wokół — głębia
function WireShell() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = -state.clock.getElapsedTime() * 0.08
  })
  return (
    <Icosahedron ref={ref} args={[2.4, 1]}>
      <meshBasicMaterial color="#5BA82A" wireframe transparent opacity={0.12} />
    </Icosahedron>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, 2]} intensity={2.2} color="#A8FF6C" />
      <pointLight position={[3, -2, -3]} intensity={1.3} color="#46901F" />
      <Blob />
      <WireShell />
    </Canvas>
  )
}
