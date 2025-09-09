import { create } from "zustand";

interface FileState {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

export const useFileStore = create<FileState>()((set) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
}));

export default useFileStore;
