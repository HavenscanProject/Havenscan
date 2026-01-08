"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import type { TeamMember } from "../components/TeamCards";

// Lazy load TeamCards for better performance (only load when needed)
const TeamCards = dynamic(() => import("../components/TeamCards").then(mod => ({ default: mod.default })), {
  ssr: true,
});

// Optimized scroll fade-in hook
function useScrollFadeIn() {
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
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isVisible };
}

export default function About() {
  const missionFade = useScrollFadeIn();
  const originFade = useScrollFadeIn();
  const teamFade = useScrollFadeIn();

  // Team members data - update with your actual team info
  const teamMembers: TeamMember[] = [
    {
      name: "Kingshuk Roy", 
      bio: "Junior at Enloe High School. With a passion for building innovative solutions, Kingshuk is focused on hardware, software, and AI applications.",
    },
    {
      name: "Naren Pai",
      bio: "Junior at Enloe High School. System architecture specialist using technical expertise to build real designs.",
    },
    {
      name: "Vansh Jain",
      bio: "Junior at Enloe High School. Data analysis and real-world testing professional ensuring product reliability and accuracy.",
    },
    {
      name: "Madhuram Sharma",
      bio: "Junior at Enloe High School. Business development and partnerships leader driving growth.",
    },
    {
      name: "Saicharan Karthikeyan",
      bio: "Junior at North Carolina School of Science and Math Durham. Contributing expertise to make HavenScan a comprehensive home health monitoring solution.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2332" }}>
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8">About HavenScan</h1>

        <div className="space-y-16">
          <section
            ref={missionFade.ref}
            className={`transition-opacity duration-700 ${
              missionFade.isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl font-semibold text-white mb-4">Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              HavenScan makes continuous home health monitoring accessible and actionable. We provide a unified system
              that delivers real-time insights and predictive alerts, enabling proactive maintenance and healthier
              living environments.
            </p>
          </section>

          <section
            ref={originFade.ref}
            className={`transition-opacity duration-700 ${
              originFade.isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl font-semibold text-white mb-4">Origin</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Traditional home inspections are slow and reactive. While
              individual sensors exist for specific hazards, there was no unified system for continuous home health
              monitoring.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              HavenScan was built to solve this: a modular, intelligent system that provides continuous monitoring,
              context-aware analysis, and actionable insights all available in a single app.
            </p>
          </section>

          <section
            ref={teamFade.ref}
            className={`transition-opacity duration-700 ${
              teamFade.isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl font-semibold text-white mb-8">Team</h2>
            <TeamCards members={teamMembers} animationStyle="3d-tilt" />
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-cyan-500/20">
          <Link
            href="/contact"
            className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              <span className="font-semibold text-white">HavenScan</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-300">
              <Link href="/about" className="hover:text-cyan-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}