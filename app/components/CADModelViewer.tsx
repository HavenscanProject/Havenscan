"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

// Loading fallback
function ModelLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading model...</p>
      </div>
    </div>
  );
}

// Model component - replace with your actual model path
function Model({ modelPath }: { modelPath: string }) {
  try {
    const { scene } = useGLTF(modelPath);
    const meshRef = useRef<THREE.Group>(null);

    // Subtle rotation animation
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      }
    });

    // Clone the scene to avoid issues with multiple instances
    const clonedScene = scene.clone();

    return <primitive object={clonedScene} ref={meshRef} />;
  } catch (error) {
    return (
      <Html center>
        <div className="text-center p-4 bg-white rounded-lg shadow-lg">
          <p className="text-red-600 font-medium">Model not found</p>
          <p className="text-sm text-gray-500 mt-1">Please add your model file</p>
        </div>
      </Html>
    );
  }
}

// Placeholder geometry for when no model is available
function PlaceholderModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      {/* Central hub representation */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Sensor modules */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#10b981" metalness={0.6} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

interface CADModelViewerProps {
  modelPath?: string;
  alt?: string;
  showPlaceholder?: boolean;
}

export default function CADModelViewer({
  modelPath,
  alt = "HavenScan device model",
  showPlaceholder = false,
}: CADModelViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto group">
      {/* Container with professional styling */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl border border-gray-200">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          onCreated={() => setIsLoaded(true)}
        >
          <Suspense fallback={null}>
            {/* Lighting setup for professional look */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.4} />
            <pointLight position={[0, 10, 0]} intensity={0.5} />

            {/* Environment for realistic reflections */}
            <Environment preset="studio" />

            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            {/* Model or Placeholder */}
            {modelPath && !showPlaceholder ? (
              <Model modelPath={modelPath} />
            ) : (
              <PlaceholderModel />
            )}

            {/* Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={10}
              minPolarAngle={0}
              maxPolarAngle={Math.PI / 2}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>

        {/* Loading overlay */}
        {!isLoaded && !error && <ModelLoader />}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-gray-600 font-medium mb-2">Failed to load model</p>
              <p className="text-sm text-gray-500">{error}</p>
            </div>
          </div>
        )}

        {/* Control hints overlay */}
        {isLoaded && !error && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span>Drag to rotate</span>
            <span>Scroll to zoom</span>
            <span>Right-click to pan</span>
          </div>
        )}
      </div>

      {/* Optional: Caption */}
      {alt && (
        <p className="mt-4 text-center text-sm text-gray-500 font-medium">{alt}</p>
      )}
    </div>
  );
}

