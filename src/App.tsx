import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Loader from "./components/Loader";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Loader />
      <Canvas
        flat
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 1, 6], fov: 25, near: 1, far: 20 }}
      >
        <ambientLight />
        <Scene />
      </Canvas>
    </div>
  );
}
