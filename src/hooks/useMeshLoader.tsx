import { useGLTF } from "@react-three/drei";
import type { Group } from "three";

type MeshResult = {
  scene: Group;
};

export function UseMeshLoader(url: string): MeshResult {
  const { scene } = useGLTF(url) as MeshResult;
  return { scene };
}

export default UseMeshLoader;
