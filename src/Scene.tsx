import { useMemo } from "react";
import * as THREE from "three";
import { useHotspotStore } from "./store/hotspots";
import { Html } from "@react-three/drei";

export default function Scene({ scene }: { scene: THREE.Group }) {
  const addHotspot = useHotspotStore((state) => state.addHotspot);
  const hotspots = useHotspotStore((state) => state.hotspots);
  const updateHotspot = useHotspotStore((state) => state.updateHotspot);
  const hotspotMode = useHotspotStore((state) => state.hotspotMode);
  // Here I Group meshes by their names
  const meshGroups: Record<string, THREE.Mesh> = useMemo(() => {
    const groups: Record<string, THREE.Mesh> = {};
    scene.traverse((child) => {
      if (child.type === "Mesh") {
        groups[child.name || child.uuid] = child as THREE.Mesh;
      }
    });
    return groups;
  }, [scene]);

  return (
    <>
      {/* Render each mesh separately */}
      {Object.entries(meshGroups).map(([name, mesh]) => (
        <mesh
          key={name}
          geometry={mesh.geometry}
          material={mesh.material}
          position={mesh.position}
          rotation={mesh.rotation}
          scale={mesh.scale}
          onPointerDown={(e) => {
            if (!hotspotMode) return;
            e.stopPropagation();
            addHotspot(e.point, name);
          }}
        />
      ))}

      {hotspots.map(
        (h: {
          id: string;
          position: [number, number, number];
          label: string;
        }) => (
          <group
            key={h.id}
            position={h.position as unknown as [number, number, number]}
          >
            <mesh>
              <sphereGeometry args={[0.12, 24, 24]} />
              <meshStandardMaterial
                color="#ff3b3b"
                emissive="#ff3b3b"
                emissiveIntensity={15}
              />
            </mesh>
            <Html
              position={[0.1, 0.12, 0]}
              distanceFactor={6}
              style={{
                background: "rgba(0,0,0,0.7)",
                color: "#fff",
                padding: "4px 6px",
                borderRadius: 4,
                fontSize: 12,
                whiteSpace: "nowrap",
              }}
            >
              <input
                defaultValue={h.label}
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                onChange={(e) => updateHotspot(h.id, { label: e.target.value })}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  outline: "none",
                  fontSize: 90,
                  width: "fit",
                }}
              />
            </Html>
          </group>
        )
      )}
    </>
  );
}
