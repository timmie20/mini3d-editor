import { Canvas } from "@react-three/fiber";
import UploadMeshFile from "./UploadMeshFile";
import { Separator } from "./ui/separator";
import Scene from "../Scene";
import useMeshStore from "../store/meshstore";
import { OrbitControls, Bounds } from "@react-three/drei";

export default function MeshLoader() {
  const scene = useMeshStore((s) => s.mesh);
  return (
    <>
      <UploadMeshFile />
      <Separator orientation="vertical" className="h-full shadow-2xl" />
      <Canvas camera={{ position: [0, 2, 6], fov: 50, near: 0.1, far: 100 }}>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        {scene && (
          <Bounds fit clip observe margin={1.2}>
            <Scene scene={scene} />
          </Bounds>
        )}
      </Canvas>
    </>
  );
}
