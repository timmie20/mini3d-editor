import { useMemo } from "react";
import * as THREE from "three";

export default function Scene({ scene }: { scene: THREE.Group }) {
  // Group meshes by their names
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
          onClick={() => console.log(`Clicked: ${name}`)}
        />
      ))}
    </>
  );
}
