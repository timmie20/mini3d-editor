export default function UsageInstructions() {
  return (
    <div className="text-sm leading-6 space-y-2 max-w-sm px-4">
      <p className="font-semibold text-lg">How to use</p>
      <ol className="list-decimal ml-5 space-y-1">
        <li>
          Upload a model: click the upload card or the “Browse files” button
          (.glb, .gltf)
        </li>
        <li>Adjust view: drag to orbit, scroll to zoom</li>
        <li>Enable hotspot mode: toggle the Hotspot mode button to ON</li>
        <li>
          Add a hotspot: click directly on the model; a large white marker and
          label appear
        </li>
        <li>Edit label: click the label text and type; it saves immediately</li>
        <li>
          Delete hotspot: hover the label to reveal the trash icon area, then
          click to remove
        </li>
        <li>Clear Button: Clear all actions</li>
      </ol>
    </div>
  );
}
