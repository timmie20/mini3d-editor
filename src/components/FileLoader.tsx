import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type LoaderProps = {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  className?: string;
};

export default function FileLoader({
  selectedFile,
  onFileChange,
  className,
}: LoaderProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  function handleFile(file: File) {
    if (!file) return;
    onFileChange(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    handleFile(e.target.files[0] as File);
    e.target.value = "";
  }

  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
      <div
        className={cn(
          "w-full max-w-sm rounded-lg border-2 border-dashed p-6 text-center transition-colors"
        )}
        role="button"
        tabIndex={0}
        onClick={() => {
          if (inputRef.current?.showPicker) {
            inputRef.current.showPicker();
          } else {
            inputRef.current?.click();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (inputRef.current?.showPicker) {
              inputRef.current.showPicker();
            } else {
              inputRef.current?.click();
            }
          }
        }}
        aria-label="Click to choose a file"
      >
        <div className="mx-auto mb-3 size-14 rounded-full bg-muted grid place-items-center">
          <img src="/cloud.png" />
        </div>

        <p className="text-sm text-muted-foreground">Click to select a file</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supported: glb, gltf
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            variant="outline"
          >
            Browse files
          </Button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".glb,.gltf"
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
