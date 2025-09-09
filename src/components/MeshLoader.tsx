import { Canvas } from "@react-three/fiber";
import UploadMeshFile from "./UploadMeshFile";
import { Separator } from "./ui/separator";
import Scene from "../Scene";
import useMeshStore from "../store/meshstore";
import { OrbitControls, Bounds, Environment } from "@react-three/drei";
import { useHotspotStore } from "../store/hotspots";

export default function MeshLoader() {
  const scene = useMeshStore((s) => s.mesh);
  const hotspotMode = useHotspotStore((s) => s.hotspotMode);
  const toggleHotspotMode = useHotspotStore((s) => s.toggleHotspotMode);
  return (
    <>
      <div className="flex items-center flex-col gap-3 max-w-md w-full">
        <UploadMeshFile />
        <button
          className={`${
            hotspotMode ? "bg-green-500" : "bg-red-400"
          } rounded-md border px-3 py-2 text-sm text-white cursor-pointer`}
          onClick={toggleHotspotMode}
          aria-pressed={hotspotMode}
        >
          {hotspotMode ? "Hotspot mode: ON" : "Hotspot mode: OFF"}
        </button>
      </div>
      <Separator orientation="vertical" className="h-full" />
      <Canvas
        shadows
        camera={{ position: [0, 1, 0], fov: 35, near: 0.1, far: 100 }}
      >
        <ambientLight intensity={1.5 * Math.PI} />

        <hemisphereLight
          color={0xb1e1ff}
          groundColor={0xb97a20}
          intensity={0.6}
        />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={100}
          shadow-bias={-0.0001}
        />
        <Environment preset="city" />
        {scene && (
          <Bounds fit clip observe margin={1.2}>
            <Scene scene={scene} />
          </Bounds>
        )}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI} />
      </Canvas>
    </>
  );
}
