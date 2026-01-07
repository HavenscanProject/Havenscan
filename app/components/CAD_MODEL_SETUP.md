# CAD Model Viewer Setup Guide

## Adding Your CAD Model

The CAD model viewer is ready to use! Here's how to add your actual model:

### Step 1: Convert Your CAD Model to GLTF/GLB Format

Your CAD model needs to be in `.glb` or `.gltf` format. You can convert from common formats using:

- **Blender** (free): Import your CAD file → Export as GLTF 2.0
- **Online converters**: 
  - https://products.aspose.app/3d/conversion
  - https://www.gltf.report/

### Step 2: Place Your Model File

1. Create a `public` folder in your project root (if it doesn't exist)
2. Create a `models` folder inside `public`
3. Place your `.glb` or `.gltf` file there, e.g.:
   ```
   public/
     models/
       havenscan-hub.glb
   ```

### Step 3: Update the Component

In `app/page.tsx`, update the CADModelViewer component:

```tsx
<CADModelViewer
  modelPath="/models/havenscan-hub.glb"
  alt="HavenScan Central Hub with Sensor Modules"
/>
```

### Step 4: Preload the Model (Optional but Recommended)

For better performance, preload your model. Add this to your page component:

```tsx
import { useGLTF } from "@react-three/drei";

// Preload the model
useGLTF.preload("/models/havenscan-hub.glb");
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

For best results:
- Keep file size under 5MB (compress if needed)
- Optimize geometry (reduce polygons if too complex)
- Use PBR materials for realistic rendering
- Include textures if desired

## Troubleshooting

**Model not loading?**
- Check the file path is correct
- Ensure the file is in the `public` folder
- Verify the file format is `.glb` or `.gltf`
- Check browser console for errors

**Performance issues?**
- Reduce model complexity
- Compress textures
- Use lower polygon count
- Consider using Draco compression

