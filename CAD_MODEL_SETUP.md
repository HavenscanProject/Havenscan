# CAD Model Viewer Setup Guide

## Adding Your CAD Model

The CAD model viewer is ready to use! It supports both **STL** and **GLTF/GLB** formats.

### Step 1: Prepare Your CAD Model

You can use either format:

**Option A: STL Format (Recommended for CAD models)**
- Smaller file sizes (typically 5-10MB)
- Perfect for CAD models
- No conversion needed if you already have STL
- Place your `.stl` file in `public/models/`

**Option B: GLTF/GLB Format**
- Better for complex models with textures
- You can convert from common formats using:
  - **Blender** (free): Import your CAD file → Export as GLTF 2.0
  - **Online converters**: 
    - https://products.aspose.app/3d/conversion
    - https://www.gltf.report/

### Step 2: Place Your Model File

1. Create a `public` folder in your project root (if it doesn't exist)
2. Create a `models` folder inside `public`
3. Place your model file there (`.stl`, `.glb`, or `.gltf`), e.g.:
   ```
   public/
     models/
       havenscan-hub.stl    (or .glb / .gltf)
   ```

### Step 3: Update the Component

In `app/page.tsx`, update the CADModelViewer component:

**For STL files (recommended for CAD models):**
```tsx
<CADModelViewer
  modelPath="/circuit.stl"
/>
```
## Features

The viewer includes:
- ✅ Interactive 3D controls (rotate, zoom, pan)
- ✅ Professional lighting and environment
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling
- ✅ Placeholder model (shown when no model is provided)

## Customization

You can customize the viewer by modifying `app/components/CADModelViewer.tsx`:

- **Camera position**: Change `position={[0, 0, 5]}` in PerspectiveCamera
- **Lighting**: Adjust light intensities and positions
- **Controls**: Modify OrbitControls settings
- **Colors**: Update the placeholder model colors
- **Animation**: Adjust rotation speed in `useFrame`

## Model Requirements

**For STL files:**
- Keep file size under 10MB (5MB is ideal)
- STL files are automatically centered and scaled to fit
- Materials are applied automatically (blue metallic finish)
- No textures supported (STL is geometry-only)

**For GLTF/GLB files:**
- Keep file size under 5MB (compress if needed)
- Optimize geometry (reduce polygons if too complex)
- Use PBR materials for realistic rendering
- Include textures if desired

## Troubleshooting

**Model not loading?**
- Check the file path is correct (should start with `/models/`)
- Ensure the file is in the `public/models/` folder
- Verify the file format is `.stl`, `.glb`, or `.gltf`
- For STL files: ensure file size is reasonable (< 10MB)
- Check browser console for errors (F12 → Console tab)

**Performance issues?**
- Reduce model complexity
- Compress textures
- Use lower polygon count
- Consider using Draco compression

