import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Separator } from "./components/ui/separator";
import MeshLoader from "./components/MeshLoader";

export default function App() {
  return (
    <div className="flex items-center h-screen justify-center">
      <MeshLoader />
      <Separator orientation="vertical" className="h-full shadow-2xl" />
      <Canvas camera={{ position: [0, 2, 6], fov: 40, near: 0.1, far: 20 }}>
        <ambientLight />
        <Scene />
      </Canvas>
    </div>
  );
}
