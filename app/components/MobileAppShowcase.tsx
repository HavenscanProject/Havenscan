"use client";

import { useRef, useEffect, useState } from "react";

interface MobileAppShowcaseProps {
  figmaUrl: string; // Full Figma prototype URL
}

export default function MobileAppShowcase({ figmaUrl }: MobileAppShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Convert Figma URL to embed format
  // Handle different Figma URL formats:
  // 1. Direct embed URL (already formatted)
  // 2. Figma site/published prototype (figma.site)
  // 3. Regular Figma prototype URL (needs conversion)
  const getEmbedUrl = () => {
    if (figmaUrl.includes("figma.com/embed")) {
      return figmaUrl; // Already an embed URL
    }
    if (figmaUrl.includes("figma.site")) {
      return figmaUrl; // Figma site URLs work directly in iframes
    }
    if (figmaUrl.includes("figma.com/proto")) {
      return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`;
    }
    // For share links, try to convert to prototype format
    if (figmaUrl.includes("figma.com/file")) {
      // Extract file key and convert to prototype
      const fileMatch = figmaUrl.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
      if (fileMatch) {
        const fileKey = fileMatch[1];
        // Try to get prototype link - user may need to provide node-id
        return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`;
      }
    }
    // Fallback: use as-is (might work for some formats)
    return figmaUrl;
  };

  const embedUrl = getEmbedUrl();

  return (
    <section
      ref={ref}
      className={`py-20 px-6 sm:px-8 lg:px-12 bg-white transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">From Detection to Action</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The HavenScan app transforms sensor data into clear insights and actionable guidance.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Phone Frame with Figma Embed */}
          <div className="flex flex-col items-center">
            <PhoneFrame>
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                allow="clipboard-read; clipboard-write"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
                title="HavenScan Mobile App"
              />
            </PhoneFrame>
            {/* Encouragement Text with Wave Effect */}
            <WaveText isVisible={isVisible} className="mt-8 text-center">
              Try tapping through the app to see how it works!
            </WaveText>
          </div>

          {/* Right: Explanatory Copy */}
          <div className="space-y-8">
            <FeaturePoint
              title="Real-time alerts when conditions change"
              description="Get notified immediately when sensors detect changes in your home's environment, so you can respond quickly."
            />
            <FeaturePoint
              title="Clear explanations of detected issues"
              description="Every alert includes a straightforward explanation of what was detected and why it matters."
            />
            <FeaturePoint
              title="Actionable guidance, not raw data"
              description="Receive specific recommendations on what to do next, not just numbers and charts."
            />
            <FeaturePoint
              title="A calm, supportive experience"
              description="The app is designed to inform and empower, not alarm. You stay in control with clear information."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Phone Frame Component with SVG
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Phone Frame SVG - iPhone-like design */}
      <svg
        viewBox="0 0 375 812"
        className="w-full h-auto drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))" }}
      >
        <defs>
          <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
        </defs>
        {/* Phone Body */}
        <rect x="0" y="0" width="375" height="812" rx="48" ry="48" fill="url(#phoneGradient)" />
        {/* Screen Bezel */}
        <rect x="8" y="8" width="359" height="796" rx="40" ry="40" fill="#000000" />
        {/* Screen Area Background */}
        <rect x="20" y="50" width="335" height="704" rx="28" ry="28" fill="#000000" />
        {/* Notch */}
        <rect x="140" y="8" width="95" height="34" rx="17" ry="17" fill="url(#phoneGradient)" />
        {/* Home Indicator */}
        <rect x="162" y="780" width="51" height="4" rx="2" ry="2" fill="#ffffff" opacity="0.4" />
      </svg>

      {/* Iframe Container - Positioned over screen area */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: "5.33%", // 20/375
            top: "6.16%", // 50/812
            width: "89.33%", // 335/375
            height: "86.7%", // 704/812
            borderRadius: "28px",
            pointerEvents: "auto",
          }}
        >
          <div className="w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature Point Component
function FeaturePoint({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1">
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Wave Text Component with letter-by-letter animation
function WaveText({ 
  children, 
  isVisible, 
  className = "" 
}: { 
  children: string; 
  isVisible: boolean; 
  className?: string;
}) {
  const characters = children.split("");
  
  return (
    <p className={`text-lg sm:text-xl text-gray-600 font-medium ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`inline-block ${isVisible ? "animate-wave-letter" : ""}`}
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
}

