# Mini 3D Editor (React + TypeScript + Vite)

A lightweight 3D model viewer with file upload, camera controls, and hotspot labeling.

## Prerequisites

- Node.js 18+
- pnpm (recommended)

## Install

```bash
pnpm install
```

## Run (development)

```bash
pnpm dev
```

Then open the local URL shown in the terminal (typically `http://localhost:5173`).

## Build (production)

```bash
pnpm build
pnpm preview
```

## Usage

1. Click the upload card or “Browse files” to select a `.glb` or `.gltf` file.
2. Orbit with mouse drag, zoom with scroll.
3. Toggle “Hotspot mode” ON to add hotspots by clicking the model.
4. Edit a hotspot label by clicking its text; delete via the trash icon on hover.

## Sample GLB files for testing

- Local files (bundled in this repo):

  - [fashion_figure_base.glb](/fashion_figure_base.glb)
  - [old_fashioned_school_desk.glb](/old_fashioned_school_desk.glb)

Save these files locally and upload them through the UI to test the viewer and hotspot features.

## Tech stack

- React + TypeScript
- Vite
- @react-three/fiber, @react-three/drei (Three.js bindings and helpers)
- Zustand (state management)
- Shadcnui (ui component Library )
