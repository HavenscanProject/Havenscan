"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SensorCard {
  id: number;
  label: string;
  value: string;
  status: "good" | "warning" | "safe";
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
}

export default function CinematicHero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const dataStreamCanvasRef = useRef<HTMLCanvasElement>(null);
  const [sensorCards, setSensorCards] = useState<SensorCard[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;
      setScrollY(currentScroll);
      
      if (currentScroll > viewportHeight * 0.6) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Air quality particles (blues, purples, whites)
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
    }> = [];

    // Create air quality particles with blues, purples, whites
    const colors = [
      "rgba(147, 197, 253,", // light blue
      "rgba(96, 165, 250,", // blue
      "rgba(167, 139, 250,", // purple
      "rgba(196, 181, 253,", // light purple
      "rgba(255, 255, 255,", // white
      "rgba(186, 230, 253,", // sky blue
    ];

    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 80;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * Math.PI * 2,
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 0.02;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with pulsing opacity
        const pulseOpacity = particle.opacity * (0.7 + Math.sin(particle.life) * 0.3);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${pulseOpacity})`;
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color.replace("rgba", "rgb").replace(", 1)", ")");
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Data streams flowing from house to edges
  useEffect(() => {
    const canvas = dataStreamCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const streams: Array<{
      angle: number;
      progress: number;
      speed: number;
      points: Array<{ x: number; y: number; opacity: number }>;
    }> = [];

    // Create 8 data streams in different directions
    for (let i = 0; i < 8; i++) {
      streams.push({
        angle: (i / 8) * Math.PI * 2,
        progress: Math.random(),
        speed: 0.3 + Math.random() * 0.2,
        points: [],
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      streams.forEach((stream) => {
        stream.progress += stream.speed * 0.01;
        if (stream.progress > 1) stream.progress = 0;

        const distance = Math.min(canvas.width, canvas.height) * 0.4;
        const endX = centerX + Math.cos(stream.angle) * distance * stream.progress;
        const endY = centerY + Math.sin(stream.angle) * distance * stream.progress;

        // Create flowing data points
        stream.points.push({
          x: endX,
          y: endY,
          opacity: 1,
        });

        // Remove old points
        if (stream.points.length > 15) {
          stream.points.shift();
        }

        // Draw flowing line
        if (stream.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          stream.points.forEach((point, i) => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 * stream.progress})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw data points
          stream.points.forEach((point, i) => {
            const pointOpacity = (i / stream.points.length) * point.opacity;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${pointOpacity})`;
            ctx.fill();
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(34, 211, 238, 0.8)";
            ctx.fill();
            ctx.shadowBlur = 0;
          });
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Floating sensor reading cards
  useEffect(() => {
    const cards: SensorCard[] = [
      { id: 1, label: "Air Quality", value: "Good", status: "good", x: 0, y: 0, vx: 0, vy: 0, opacity: 0 },
      { id: 2, label: "Humidity", value: "45%", status: "good", x: 0, y: 0, vx: 0, vy: 0, opacity: 0 },
      { id: 3, label: "Radon", value: "Safe", status: "safe", x: 0, y: 0, vx: 0, vy: 0, opacity: 0 },
      { id: 4, label: "Temperature", value: "72°F", status: "good", x: 0, y: 0, vx: 0, vy: 0, opacity: 0 },
    ];

    // Initialize positions and velocities (responsive)
    const isMobile = window.innerWidth < 768;
    cards.forEach((card, i) => {
      if (isMobile) {
        // Stack vertically on mobile
        card.x = 10;
        card.y = 150 + i * 120;
      } else {
        card.x = 10 + (i % 2) * Math.max(200, window.innerWidth - 300);
        card.y = 150 + Math.floor(i / 2) * 200;
      }
      card.vx = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5);
      card.vy = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3);
      card.opacity = 0;
    });

    setSensorCards(cards);

    const interval = setInterval(() => {
      setSensorCards((prev) =>
        prev.map((card) => {
          let newX = card.x + card.vx;
          let newY = card.y + card.vy;
          let newVx = card.vx;
          let newVy = card.vy;

          // Bounce off edges
          if (newX < 10 || newX > window.innerWidth - 250) newVx *= -1;
          if (newY < 100 || newY > window.innerHeight - 150) newVy *= -1;

          // Fade in/out
          let newOpacity = card.opacity;
          if (card.opacity < 1) newOpacity = Math.min(1, card.opacity + 0.02);
          if (Math.random() < 0.001) newOpacity = Math.max(0.3, card.opacity - 0.1);

          return {
            ...card,
            x: Math.max(10, Math.min(window.innerWidth - 250, newX)),
            y: Math.max(100, Math.min(window.innerHeight - 150, newY)),
            vx: newVx,
            vy: newVy,
            opacity: newOpacity,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
  const heroOpacity = Math.max(0, 1 - scrollY / (viewportHeight * 0.6));
  const heroScale = Math.max(0.8, 1 - scrollY / (viewportHeight * 1.2));
  const parallaxOffset = scrollY * 0.5;

  return (
    <>
      <section
        ref={heroRef}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          backgroundColor: "#0a0e1a",
          opacity: isVisible ? heroOpacity : 0,
          transform: `scale(${heroScale})`,
          pointerEvents: isVisible ? "auto" : "none",
          transition: "opacity 0.3s ease-out",
        }}
      >
        {/* Air quality particles canvas */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.7 }}
        />

        {/* Data streams canvas */}
        <canvas
          ref={dataStreamCanvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.8 }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e1a]/50 to-[#0a0e1a]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-teal-500/5" />

        {/* 3D Isometric House */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
          >
            <svg
              viewBox="0 0 600 500"
              className="w-full h-auto"
              style={{ 
                filter: "drop-shadow(0 30px 80px rgba(6, 182, 212, 0.4))",
                maxWidth: "min(1100px, 95vw)",
                maxHeight: "70vh",
              }}
            >
              <defs>
                <filter id="wireframe-glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="house-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="roof-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Modern 3D isometric-style house */}
              <g filter="url(#wireframe-glow)" transform="scale(3) translate(-200, -150)">
                {/* Foundation/base platform with grid */}
                <g opacity="0.3">
                  <path
                    d="M 150 400 L 300 350 L 450 400 L 300 450 Z"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                  <line x1="150" y1="400" x2="450" y2="400" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                  <line x1="200" y1="387" x2="200" y2="413" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
                  <line x1="250" y1="375" x2="250" y2="425" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
                  <line x1="350" y1="375" x2="350" y2="425" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
                  <line x1="400" y1="387" x2="400" y2="413" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
                </g>

                {/* Main house body - isometric left face */}
                <path
                  d="M 200 320 L 200 240 L 300 180 L 300 260 Z"
                  fill="url(#house-gradient)"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />
                
                {/* Main house body - isometric right face */}
                <path
                  d="M 300 260 L 300 180 L 400 240 L 400 320 Z"
                  fill="url(#house-gradient)"
                  stroke="#0891b2"
                  strokeWidth="2.5"
                  opacity="0.8"
                />
                
                {/* Main house body - isometric top */}
                <path
                  d="M 200 240 L 300 180 L 400 240 L 300 300 Z"
                  fill="url(#house-gradient)"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  opacity="0.5"
                />

                {/* Roof - left face */}
                <path
                  d="M 180 240 L 300 160 L 300 180 L 200 240 Z"
                  fill="url(#roof-gradient)"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                />
                
                {/* Roof - right face */}
                <path
                  d="M 300 160 L 420 240 L 400 240 L 300 180 Z"
                  fill="url(#roof-gradient)"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  opacity="0.9"
                />
                
                {/* Roof ridge */}
                <line x1="180" y1="240" x2="420" y2="240" stroke="#22d3ee" strokeWidth="3" />
                <line x1="180" y1="240" x2="300" y2="160" stroke="#22d3ee" strokeWidth="2.5" />
                <line x1="420" y1="240" x2="300" y2="160" stroke="#06b6d4" strokeWidth="2.5" />

                {/* Windows - left side with glow */}
                <g className="window-glow">
                  <rect x="220" y="265" width="25" height="25" fill="#22d3ee" opacity="0.6" stroke="#22d3ee" strokeWidth="2" />
                  <rect x="255" y="265" width="25" height="25" fill="#22d3ee" opacity="0.6" stroke="#22d3ee" strokeWidth="2" />
                  <line x1="220" y1="277.5" x2="245" y2="277.5" stroke="#0a0e1a" strokeWidth="1.5" />
                  <line x1="232.5" y1="265" x2="232.5" y2="290" stroke="#0a0e1a" strokeWidth="1.5" />
                  <line x1="255" y1="277.5" x2="280" y2="277.5" stroke="#0a0e1a" strokeWidth="1.5" />
                  <line x1="267.5" y1="265" x2="267.5" y2="290" stroke="#0a0e1a" strokeWidth="1.5" />
                </g>

                {/* Windows - right side with glow */}
                <g className="window-glow" opacity="0.9">
                  <rect x="320" y="265" width="25" height="25" fill="#06b6d4" opacity="0.6" stroke="#06b6d4" strokeWidth="2" />
                  <rect x="355" y="265" width="25" height="25" fill="#06b6d4" opacity="0.6" stroke="#06b6d4" strokeWidth="2" />
                  <line x1="320" y1="277.5" x2="345" y2="277.5" stroke="#0a0e1a" strokeWidth="1.5" />
                  <line x1="332.5" y1="265" x2="332.5" y2="290" stroke="#0a0e1a" strokeWidth="1.5" />
                  <line x1="355" y1="277.5" x2="380" y2="277.5" stroke="#0a0e1a" strokeWidth="1.5" />
                  <line x1="367.5" y1="265" x2="367.5" y2="290" stroke="#0a0e1a" strokeWidth="1.5" />
                </g>

                {/* Door with modern touch */}
                <rect x="285" y="285" width="30" height="35" fill="#0a0e1a" stroke="#22d3ee" strokeWidth="2.5" opacity="0.8" />
                <circle cx="308" cy="302" r="2" fill="#22d3ee" />
                <line x1="285" y1="308" x2="315" y2="308" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />

                {/* Tech details - corner brackets */}
                <g stroke="#22d3ee" strokeWidth="2" opacity="0.6">
                  <path d="M 195 235 L 205 235 M 195 235 L 195 245" fill="none" />
                  <path d="M 395 235 L 405 235 M 405 235 L 405 245" fill="none" />
                  <path d="M 195 315 L 205 315 M 195 315 L 195 305" fill="none" />
                  <path d="M 395 315 L 405 315 M 405 315 L 405 305" fill="none" />
                </g>

                {/* Energy shield dome effect */}
                <path
                  d="M 180 320 Q 300 120 420 320"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                  opacity="0.2"
                  strokeDasharray="8,4"
                  className="shield-pulse"
                />
              </g>

              {/* Enhanced sensor nodes with connection lines */}
              {[
                { x: 150, y: 280, delay: 0, label: "Front", angle: -45 },
                { x: 450, y: 280, delay: 0.4, label: "Back", angle: 45 },
                { x: 180, y: 380, delay: 0.8, label: "Base", angle: -30 },
                { x: 420, y: 380, delay: 1.2, label: "Base", angle: 30 },
                { x: 300, y: 140, delay: 1.6, label: "Roof", angle: 0 },
              ].map((sensor, i) => (
                <g key={i}>
                  {/* Connection line to house */}
                  <line
                    x1={sensor.x}
                    y1={sensor.y}
                    x2="300"
                    y2="260"
                    stroke="#06b6d4"
                    strokeWidth="1"
                    opacity="0.2"
                    strokeDasharray="4,4"
                  />
                  
                  {/* Expanding ring animations - multiple layers */}
                  <circle
                    cx={sensor.x}
                    cy={sensor.y}
                    r="5"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2.5"
                    opacity="0.8"
                    className="sensor-ring"
                    style={{ animationDelay: `${sensor.delay}s` }}
                  />
                  <circle
                    cx={sensor.x}
                    cy={sensor.y}
                    r="12"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    opacity="0.5"
                    className="sensor-ring"
                    style={{ animationDelay: `${sensor.delay + 0.15}s` }}
                  />
                  <circle
                    cx={sensor.x}
                    cy={sensor.y}
                    r="20"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    opacity="0.3"
                    className="sensor-ring"
                    style={{ animationDelay: `${sensor.delay + 0.3}s` }}
                  />
                  
                  {/* Glowing center dot with outer ring */}
                  <circle
                    cx={sensor.x}
                    cy={sensor.y}
                    r="6"
                    fill="#22d3ee"
                    opacity="0.3"
                  />
                  <circle
                    cx={sensor.x}
                    cy={sensor.y}
                    r="4"
                    fill="#22d3ee"
                    opacity="1"
                    filter="url(#wireframe-glow)"
                    className="sensor-pulse"
                    style={{ animationDelay: `${sensor.delay}s` }}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Floating sensor reading cards */}
        {sensorCards.map((card) => (
          <div
            key={card.id}
            className="absolute sensor-card"
            style={{
              left: `${card.x}px`,
              top: `${card.y}px`,
              opacity: card.opacity,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="bg-[#1a2332]/80 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-3 shadow-xl">
              <div className="text-xs text-cyan-300/80 mb-1">{card.label}</div>
              <div className="text-lg font-semibold text-white">
                {card.value}
                {card.status === "good" && (
                  <span className="ml-2 text-cyan-400 text-sm">✓</span>
                )}
                {card.status === "safe" && (
                  <span className="ml-2 text-teal-400 text-sm">✓</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Content overlay - repositioned to not hide house */}
        <div className="absolute inset-0 flex flex-col z-20 px-6">
          {/* Title at top */}
          <div
            className="text-center max-w-5xl mx-auto pt-12 sm:pt-16 md:pt-20"
            style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="block text-white">Protect What</span>
              <span className="block hero-gradient-text-cyan">
                Matters Most
              </span>
            </h1>
          </div>
          
          {/* Spacer for house in middle */}
          <div className="flex-1" />
          
          {/* Description and CTAs at bottom */}
          <div className="text-center max-w-5xl mx-auto pb-24 sm:pb-28">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Continuous monitoring reveals hidden risks before they become costly or dangerous
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                href="/contact"
                className="glass-button-primary px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-semibold text-base sm:text-lg text-white hover:scale-105 transition-all shadow-2xl text-center"
              >
                Join the Waitlist
              </Link>
              <Link
                href="#how-it-works"
                className="glass-button-secondary px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-semibold text-base sm:text-lg text-white hover:scale-105 transition-all text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-white/60">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      <div className="h-screen" />
    </>
  );
}