import type { Group } from "three";
import { create } from "zustand";

interface MeshState {
  mesh: Group | null;
  setMeshData: (data: Group | null) => void;
}

export const useMeshStore = create<MeshState>((set) => ({
  mesh: null,
  setMeshData: (data) => set({ mesh: data }),
}));

export default useMeshStore;
