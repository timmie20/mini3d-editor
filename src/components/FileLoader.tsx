import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type LoaderProps = {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
};

export default function FileLoader({
  selectedFile,
  onFileChange,
  accept = ".glb,.gltf,.obj,.fbx,.stl,.png,.jpg,.jpeg,.hdr",
  multiple = false,
  className,
}: LoaderProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  function handleFile(file: File) {
    if (!file) return;
    onFileChange(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    handleFile(e.target.files[0] as File);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0] as File);
      e.dataTransfer.clearData();
    }
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={cn(
          "w-full max-w-sm rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border"
        )}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        aria-label="Upload files by clicking or dragging and dropping"
      >
        <div className="mx-auto mb-3 size-14 rounded-full bg-muted grid place-items-center">
          <img src="/cloud.png" />
        </div>
        <p className="text-sm text-muted-foreground">
          {isDragging ? "Drop files to upload" : "Drag and drop files here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supported: glb, gltf, obj, fbx, stl, png, jpg, hdr
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button type="button" onClick={() => inputRef.current?.click()}>
            Browse files
          </Button>
          {multiple && (
            <span className="text-xs text-muted-foreground">
              Multiple allowed
            </span>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onInputChange}
          className="sr-only"
          aria-hidden
          tabIndex={-1}
        />
      </div>

      {selectedFile && (
        <ul className="w-full max-w-sm list-disc space-y-1 rounded-md bg-muted p-3 text-sm">
          <li key={selectedFile.name} className="truncate">
            {selectedFile.name}
          </li>
        </ul>
      )}
    </div>
  );
}
