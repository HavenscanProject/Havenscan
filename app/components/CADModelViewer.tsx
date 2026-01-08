"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
import type { Mesh, BufferGeometry, Group } from "three";

/* -------------------- Loading Overlay -------------------- */
function ModelLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Loading model…</p>
      </div>
    </div>
  );
}

/* -------------------- STL Model -------------------- */
function STLModel({ modelPath }: { modelPath: string }) {
  const geometry = useLoader(
    STLLoader,
    modelPath,
    undefined,
    (error) => {
      console.error("Failed to load STL:", error);
    }
  );

  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  useEffect(() => {
    if (!geometry) return;

    geometry.computeVertexNormals();
    geometry.computeBoundingBox();

    const box = geometry.boundingBox;
    if (!box) return;

    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    geometry.translate(-center.x, -center.y, -center.z);

    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim;
      geometry.scale(scale, scale, scale);
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry as BufferGeometry}>
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

/* -------------------- Placeholder -------------------- */
function PlaceholderModel() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        );
      })}
    </group>
  );
}

/* -------------------- Viewer -------------------- */
interface CADModelViewerProps {
  modelPath?: string;
  alt?: string;
}

export default function CADModelViewer({
  modelPath,
  alt = "HavenScan device model",
}: CADModelViewerProps) {
  const [canvasReady, setCanvasReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pointerPosition, setPointerPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate pointer position
  useEffect(() => {
    if (hasInteracted || !canvasReady) return;

    const interval = setInterval(() => {
      setPointerPosition({
        x: 20 + Math.random() * 60, // 20% to 80% of container
        y: 20 + Math.random() * 60,
      });
    }, 2000); // Move every 2 seconds

    return () => clearInterval(interval);
  }, [hasInteracted, canvasReady]);

  // Detect user interaction
  useEffect(() => {
    if (hasInteracted || !containerRef.current) return;

    const handleInteraction = () => {
      setHasInteracted(true);
    };

    const container = containerRef.current;
    container.addEventListener("mousedown", handleInteraction);
    container.addEventListener("touchstart", handleInteraction);
    container.addEventListener("wheel", handleInteraction);

    return () => {
      container.removeEventListener("mousedown", handleInteraction);
      container.removeEventListener("touchstart", handleInteraction);
      container.removeEventListener("wheel", handleInteraction);
    };
  }, [hasInteracted]);

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto group">
      <div 
        ref={containerRef}
        className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl border border-gray-200 cursor-pointer"
      >
        <Canvas
          dpr={[1, 2]}
          onCreated={() => setCanvasReady(true)}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <directionalLight position={[-10, -10, -5]} intensity={0.4} />
            <pointLight position={[0, 10, 0]} intensity={0.5} />

            <Environment preset="studio" />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

            {modelPath ? (
              <STLModel modelPath={modelPath} />
            ) : (
              <PlaceholderModel />
            )}

            <OrbitControls
              enableZoom
              enableRotate
              enablePan
              minDistance={3}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>

        {!canvasReady && <ModelLoader />}

        {/* Animated pointer to encourage interaction */}
        {canvasReady && !hasInteracted && (
          <div
            className="absolute pointer-events-none z-10 transition-all duration-1000 ease-in-out"
            style={{
              left: `${pointerPosition.x}%`,
              top: `${pointerPosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg animate-bounce">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l-2-5L5 21l1-6 6-1-5-2 5-5z"
                  />
                </svg>
              </div>
              <div className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                <p className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                  Drag to rotate
                </p>
              </div>
            </div>
          </div>
        )}

        {canvasReady && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-gray-500 bg-white/80 backdrop-blur px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span>Drag to rotate</span>
            <span>Scroll to zoom</span>
            <span>Right-click to pan</span>
          </div>
        )}
      </div>

      {alt && (
        <p className="mt-4 text-center text-sm text-gray-500 font-medium">
          {alt}
        </p>
      )}
    </div>
  );
}
