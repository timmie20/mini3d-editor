import React from "react";
import FileLoader from "./FileLoader";
import { Button } from "./ui/button";
import useMeshLoader from "../hooks/useMeshLoader";
import useMeshStore from "../store/meshstore";
import type { Group } from "three";
import useHotspotStore from "../store/hotspots";

export default function UploadMeshFile() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [shouldRender, setShouldRender] = React.useState(false);
  const setMeshData = useMeshStore((s) => s.setMeshData);
  const clearMesh = useMeshStore((s) => s.clearMesh);
  const clearHotspots = useHotspotStore((s) => s.clearHotspots);

  const url = React.useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  React.useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);

  function handleRenderMesh() {
    if (!url) return;
    setShouldRender(true);
  }

  function handleClearSelection() {
    setSelectedFile(null);
    setShouldRender(false);
    clearMesh();
    clearHotspots();
  }
  return (
    <>
      <div className="flex flex-col w-full max-w-md">
        <FileLoader
          selectedFile={selectedFile}
          onFileChange={setSelectedFile}
        />

        {selectedFile && (
          <div className="mt-6 mx-auto flex gap-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={handleClearSelection}
              className="cursor-pointer"
            >
              Clear all
            </Button>
            <Button
              size="lg"
              onClick={handleRenderMesh}
              className="cursor-pointer"
            >
              Render Mesh
            </Button>
          </div>
        )}

        {url && shouldRender && (
          <MeshFromUrl url={url} onScene={(scene) => setMeshData(scene)} />
        )}
      </div>
    </>
  );
}

function MeshFromUrl({
  url,
  onScene,
}: {
  url: string;
  onScene: (scene: Group) => void;
}) {
  const data = useMeshLoader(url);
  React.useEffect(() => {
    if (data?.scene) onScene(data.scene);
  }, [data, onScene]);
  return null;
}
