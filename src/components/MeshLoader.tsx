import { useFileStore } from "../store/filestore";
import FileLoader from "./FileLoader";

export default function MeshLoader() {
  const selectedFile = useFileStore((s) => s.selectedFile);
  const setSelectedFile = useFileStore((s) => s.setSelectedFile);
  return (
    <>
      <FileLoader
        className="max-w-md"
        selectedFile={selectedFile}
        onFileChange={setSelectedFile}
      />
    </>
  );
}
