import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} color="white" />

      {/* Controls */}
      <OrbitControls />
    </>
  );
}
