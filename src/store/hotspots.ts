import { create } from "zustand";
import type { Vector3 } from "three";

export type Hotspot = {
  id: string;
  position: [number, number, number];
  label: string;
};

interface HotspotState {
  hotspots: Hotspot[];
  addHotspot: (
    position: Vector3 | [number, number, number],
    label?: string
  ) => void;
  removeHotspot: (id: string) => void;
  clearHotspots: () => void;
  hotspotMode: boolean;
  toggleHotspotMode: () => void;
  updateHotspot: (
    id: string,
    data: Partial<Pick<Hotspot, "label" | "position">>
  ) => void;
}

export const useHotspotStore = create<HotspotState>((set) => ({
  hotspots: [],
  hotspotMode: false,
  addHotspot: (position, label) =>
    set((state) => {
      const posArray = Array.isArray(position)
        ? position
        : ([position.x, position.y, position.z] as [number, number, number]);
      const id = `${Date.now()}-${state.hotspots.length + 1}`;
      const hotspot: Hotspot = {
        id,
        position: posArray,
        label: label ?? `Hotspot ${state.hotspots.length + 1}`,
      };
      return { hotspots: [...state.hotspots, hotspot] };
    }),
  removeHotspot: (id) =>
    set((state) => ({ hotspots: state.hotspots.filter((h) => h.id !== id) })),
  clearHotspots: () => set({ hotspots: [] }),
  toggleHotspotMode: () =>
    set((state) => ({ hotspotMode: !state.hotspotMode })),
  updateHotspot: (id, data) =>
    set((state) => ({
      hotspots: state.hotspots.map((h) =>
        h.id === id ? { ...h, ...data } : h
      ),
    })),
}));

export default useHotspotStore;
