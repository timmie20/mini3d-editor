import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type LoaderProps = {
  onFile?: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
};

export default function Loader({
  onFile,
  accept = ".glb,.gltf,.obj,.fbx,.stl,.png,.jpg,.jpeg,.hdr",
  multiple = false,
  className,
}: LoaderProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  function handleFile(file: File) {
    if (!file) return;
    setSelectedFile(file);
    onFile?.(file);
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
          "w-full max-w-xl rounded-lg border-2 border-dashed p-6 text-center transition-colors",
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
        <div className="mx-auto mb-3 size-10 rounded-full bg-muted/60 grid place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-muted-foreground"
            aria-hidden
          >
            <path d="M12 16a1 1 0 0 1-1-1V9.414l-1.293 1.293a1 1 0 1 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 9.414V15a1 1 0 0 1-1 1Z" />
            <path d="M5 19a3 3 0 0 1-3-3 3 3 0 0 1 2.188-2.895A5.002 5.002 0 0 1 12 6c2.386 0 4.41 1.667 4.874 3.887A4 4 0 1 1 19 19H5Z" />
          </svg>
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
        <ul className="w-full max-w-xl list-disc space-y-1 rounded-md bg-muted/40 p-3 text-sm">
          <li key={selectedFile.name} className="truncate">
            {selectedFile.name}
          </li>
        </ul>
      )}
    </div>
  );
}
