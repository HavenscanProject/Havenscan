"use client";

import { useState, useRef, MouseEvent } from "react";

export interface TeamMember {
  name: string;
  bio: string;
  image?: string; // Optional image URL
  linkedin?: string;
  email?: string;
}

interface TeamCardsProps {
  members: TeamMember[];
  animationStyle?: "3d-tilt" | "glassmorphism" | "flip" | "magnetic" | "gradient" | "floating";
}

export default function TeamCards({ members, animationStyle = "3d-tilt" }: TeamCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Render based on selected animation style
  switch (animationStyle) {
    case "3d-tilt":
      return <Tilt3DCards members={members} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />;
    case "glassmorphism":
      return <GlassmorphismCards members={members} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />;
    case "flip":
      return <FlipCards members={members} />;
    case "magnetic":
      return <MagneticCards members={members} />;
    case "gradient":
      return <GradientCards members={members} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />;
    case "floating":
      return <FloatingCards members={members} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />;
    default:
      return <Tilt3DCards members={members} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />;
  }
}

// ===== ANIMATION STYLE 1: 3D Tilt + Glow =====
function Tilt3DCards({
  members,
  hoveredIndex,
  setHoveredIndex,
}: {
  members: TeamMember[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <div
          key={index}
          onMouseMove={(e) => {
            setHoveredIndex(index);
            handleMouseMove(e, index);
          }}
          onMouseLeave={(e) => {
            setHoveredIndex(null);
            handleMouseLeave(e);
          }}
          className="relative group cursor-pointer transition-all duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
              hoveredIndex === index
                ? "border-blue-500 shadow-2xl shadow-blue-500/20"
                : "border-gray-200 shadow-lg"
            }`}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-blue-500/20 opacity-0 transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : ""
              } blur-xl -z-10`}
            />

            {/* Avatar placeholder */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {member.name.charAt(0)}
            </div>

            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
            <p className="text-gray-600 text-sm text-center leading-relaxed">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== ANIMATION STYLE 2: Glassmorphism + Parallax =====
function GlassmorphismCards({
  members,
  hoveredIndex,
  setHoveredIndex,
}: {
  members: TeamMember[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 20;
    const moveY = (y - centerY) / 20;

    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <div
          key={index}
          onMouseMove={(e) => {
            setHoveredIndex(index);
            handleMouseMove(e);
          }}
          onMouseLeave={(e) => {
            setHoveredIndex(null);
            handleMouseLeave(e);
          }}
          className="relative group cursor-pointer transition-all duration-500"
        >
          <div
            className={`relative rounded-2xl p-8 backdrop-blur-xl transition-all duration-500 ${
              hoveredIndex === index
                ? "bg-white/80 border-2 border-white/50 shadow-2xl scale-105"
                : "bg-white/40 border-2 border-white/30 shadow-lg"
            }`}
          >
            {/* Animated gradient background */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 ${
                hoveredIndex === index ? "opacity-100" : ""
              }`}
            />

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mx-auto mb-6 flex items-center justify-center text-blue-600 text-3xl font-bold border-2 border-white/50 backdrop-blur-sm">
                {member.name.charAt(0)}
              </div>

              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
              <p className="text-gray-700 text-sm text-center leading-relaxed">{member.bio}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== ANIMATION STYLE 3: Card Flip =====
function FlipCards({ members }: { members: TeamMember[] }) {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <div
          key={index}
          className="relative h-80 cursor-pointer perspective-1000"
          onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
              flippedIndex === index ? "rotate-y-180" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 backface-hidden bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg flex flex-col items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
              <p className="text-gray-500 text-xs text-center mt-4">Click to learn more</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 border-2 border-blue-400 shadow-lg flex flex-col items-center justify-center rotate-y-180 text-white"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <h3 className="text-xl font-bold text-center mb-4">{member.name}</h3>
              <p className="text-white/90 text-sm text-center leading-relaxed">{member.bio}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== ANIMATION STYLE 4: Magnetic Cursor =====
function MagneticCards({ members }: { members: TeamMember[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x * 0.1;
    const moveY = y * 0.1;

    card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = "translate(0, 0) scale(1)";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <div
          key={index}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          onMouseMove={(e) => handleMouseMove(e, index)}
          onMouseLeave={() => handleMouseLeave(index)}
          className="relative cursor-pointer transition-transform duration-300 ease-out"
        >
          <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {member.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
            <p className="text-gray-600 text-sm text-center leading-relaxed">{member.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== ANIMATION STYLE 5: Gradient Wave =====
function GradientCards({
  members,
  hoveredIndex,
  setHoveredIndex,
}: {
  members: TeamMember[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group cursor-pointer overflow-hidden rounded-2xl"
        >
          {/* Animated gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 ${
              hoveredIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundSize: "200% 200%",
              animation: hoveredIndex === index ? "gradient 3s ease infinite" : "none",
            }}
          />

          {/* Wave effect */}
          <div
            className={`absolute inset-0 opacity-20 ${
              hoveredIndex === index ? "animate-wave" : ""
            }`}
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
          />

          <div
            className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-500 ${
              hoveredIndex === index
                ? "border-transparent text-white shadow-2xl scale-105"
                : "border-gray-200 shadow-lg"
            }`}
          >
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold shadow-lg transition-all duration-500 ${
                hoveredIndex === index
                  ? "bg-white/20 text-white border-2 border-white/50"
                  : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
              }`}
            >
              {member.name.charAt(0)}
            </div>
            <h3
              className={`text-xl font-bold text-center mb-2 transition-colors duration-500 ${
                hoveredIndex === index ? "text-white" : "text-gray-900"
              }`}
            >
              {member.name}
            </h3>
            <p
              className={`font-semibold text-center mb-4 transition-colors duration-500 ${
                hoveredIndex === index ? "text-white/90" : "text-blue-600"
              }`}
            >
            </p>
            <p
              className={`text-sm text-center leading-relaxed transition-colors duration-500 ${
                hoveredIndex === index ? "text-white/80" : "text-gray-600"
              }`}
            >
              {member.bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== ANIMATION STYLE 6: Floating + Scale =====
function FloatingCards({
  members,
  hoveredIndex,
  setHoveredIndex,
}: {
  members: TeamMember[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {members.map((member, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group cursor-pointer"
          style={{
            animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
            animationDelay: `${index * 0.2}s`,
          }}
        >
          <div
            className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-500 ${
              hoveredIndex === index
                ? "border-blue-500 shadow-2xl shadow-blue-500/30 scale-110 -translate-y-4"
                : "border-gray-200 shadow-lg scale-100"
            }`}
          >
            {/* Floating particles */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-60"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 10}%`,
                      animation: `particle-float ${2 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="relative z-10">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">{member.bio}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

