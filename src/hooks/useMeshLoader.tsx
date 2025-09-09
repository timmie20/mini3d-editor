import { useGLTF } from "@react-three/drei";
import type { Group } from "three";

type MeshResult = {
  nodes: unknown;
  materials: unknown;
  scene: Group;
};

export function useMeshLoader(filePath: string): MeshResult {
  const { nodes, materials, scene } = useGLTF(
    filePath
  ) as unknown as MeshResult;
  return { nodes, materials, scene };
}

export default useMeshLoader;
