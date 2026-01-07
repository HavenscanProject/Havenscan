"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { TeamMember } from "../components/TeamCards";

// Lazy load TeamCards for better performance (only load when needed)
const TeamCards = dynamic(() => import("../components/TeamCards").then(mod => ({ default: mod.default })), {
  ssr: true,
});

export default function About() {
  // Team members data - update with your actual team info
  const teamMembers: TeamMember[] = [
    {
      name: "Kingshuk Roy", 
      bio: "11th Grader at Enloe High School. With a passion for building innovative solutions, Kingshuk is focused on hardware, software, and AI applications.",
    },
    {
      name: "Naren Pai",
      bio: "11th Grader at Enloe High School. System architecture specialist using technical expertise to build real designs.",
    },
    {
      name: "Vansh Jain",
      bio: "11th Grader at Enloe High School. Data analysis and real-world testing professional ensuring product reliability and accuracy.",
    },
    {
      name: "Madhuram Sharma",
      bio: "11th Grader at Enloe High School. Business development and partnerships leader driving growth.",
    },
    {
      name: "Saicharan Karthikeyan",
      bio: "11th Grader at North Carolina School of Science and Math Durham. Contributing expertise to make HavenScan a comprehensive home health monitoring solution.",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8">About HavenScan</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              HavenScan makes continuous home health monitoring accessible and actionable. We provide a unified system
              that delivers real-time insights and predictive alerts, enabling proactive maintenance and healthier
              living environments.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Origin</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Traditional home inspections are slow and reactive. While
              individual sensors exist for specific hazards, there was no unified system for continuous home health
              monitoring.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              HavenScan was built to solve this: a modular, intelligent system that provides continuous monitoring,
              context-aware analysis, and actionable insights all available in a single app.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Team</h2>
            {/* Change animationStyle to try different effects: "3d-tilt" | "glassmorphism" | "flip" | "magnetic" | "gradient" | "floating" */}
            <TeamCards members={teamMembers} animationStyle="3d-tilt" />
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

