import React from "react";
import FileLoader from "./FileLoader";
import { Button } from "./ui/button";
import useMeshLoader from "../hooks/useMeshLoader";
import useMeshStore from "../store/meshstore";
import type { Group } from "three";

export default function UploadMeshFile() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const setMeshData = useMeshStore((s) => s.setMeshData);
  const [shouldRender, setShouldRender] = React.useState(false);

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
            >
              Clear
            </Button>
            <Button size="lg" onClick={handleRenderMesh}>
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
