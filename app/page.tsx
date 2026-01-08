"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import MobileAppShowcase from "./components/MobileAppShowcase";
import CinematicHero from "./components/CinematicHero";
import CountUpStat from "./components/CountUpStat";

// Dynamically import CAD viewer to avoid SSR issues
const CADModelViewer = dynamic(() => import("./components/CADModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square max-w-2xl mx-auto rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading viewer...</p>
      </div>
    </div>
  ),
});

// Optimized scroll fade-in hook
function useScrollFadeIn() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use passive observer for better performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after first intersection for better performance
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

export default function Home() {
  const [showContentHero, setShowContentHero] = useState(false);
  const heroFade = useScrollFadeIn();
  const problemFade = useScrollFadeIn();
  const solutionFade = useScrollFadeIn();
  const howItWorksFade = useScrollFadeIn();
  const mobileAppFade = useScrollFadeIn();
  const differentFade = useScrollFadeIn();
  const validationFade = useScrollFadeIn();
  const usersFade = useScrollFadeIn();

  useEffect(() => {
    const handleScroll = () => {
      // Show content hero when scrolled past 50vh
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowContentHero(true);
      } else {
        setShowContentHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a2332" }}>
      {/* Cinematic Hero - Full viewport */}
      <CinematicHero />

      {/* The Problem */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#1a2332" }}>
        <div
          ref={problemFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            problemFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Hidden housing risks affect millions of homes
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Environmental hazards build up in homes. Increased humidity invites mold. Radon exposure
              increases cancer risk. Pest infestations can cause structural damage. These issues often go undetected until
              they become costly or dangerous.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CountUpStat
              value={68}
              label="of homes have high humidity levels that promote mold growth"
              suffix="%"
              isVisible={problemFade.isVisible}
              icon={
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              }
            />
            <CountUpStat
              value="1 in 15"
              label="homes have elevated radon levels above EPA action thresholds"
              isVisible={problemFade.isVisible}
              icon={
                <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
            <CountUpStat
              value={11}
              label="annual cost of pest infestations in residential properties"
              prefix="$"
              suffix="B+"
              isVisible={problemFade.isVisible}
              icon={
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <CountUpStat
              value={6.5}
              label="housing units in the U.S. have inadequate conditions"
              suffix="M"
              isVisible={problemFade.isVisible}
              icon={
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* The Solution: HavenScan */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#1a2332" }}>
        <div
          ref={solutionFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            solutionFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">The Solution: HavenScan</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              HavenScan is a modular sensor system that continuously monitors your home's health. A central hub
              coordinates multiple sensor modules, collecting real-time data on environmental conditions, air quality,
              and potential hazards. Alerts and monthly health reports keep you informed.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Modular sensor system</h3>
                  <p className="text-gray-300 text-sm">Place sensors where they matter most, expand as needed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Central hub</h3>
                  <p className="text-gray-300 text-sm">Unified control and data aggregation in one device</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Continuous monitoring</h3>
                  <p className="text-gray-300 text-sm">24/7 data collection, not periodic inspections</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Alerts + monthly reports</h3>
                  <p className="text-gray-300 text-sm">Immediate notifications and comprehensive health summaries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#1a2332" }}>
        <div
          ref={howItWorksFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            howItWorksFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              HavenScan combines hardware, software, and AI to deliver actionable insights about your home's health.
            </p>
          </div>

          {/* CAD Model Viewer */}
          <div className="mb-16">
            <CADModelViewer modelPath="/circuit.stl"
              alt="HavenScan Central Hub with Sensor Modules"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Install the hub and sensors</h3>
              <p className="text-gray-300 text-sm">Simple setup process, sensors communicate wirelessly with the central hub</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Sensors collect real-time data</h3>
              <p className="text-gray-300 text-sm">Continuous monitoring of temperature, humidity, air quality, and more</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">AI analyzes trends and anomalies</h3>
              <p className="text-gray-300 text-sm">Machine learning models identify patterns and potential risks</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">4</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Alerts + recommendations</h3>
              <p className="text-gray-300 text-sm">Get notified on your phone when issues are detected, with actionable guidance</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-cyan-400">5</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Monthly home health report</h3>
              <p className="text-gray-300 text-sm">Comprehensive summary of your home's condition and trends over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <MobileAppShowcase
        figmaUrl="https://merry-decay-69640409.figma.site/"
      />

      {/* What Makes It Different */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#1a2332" }}>
        <div
          ref={differentFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            differentFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">What Makes It Different</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              HavenScan isn't just another sensor. It's a unified system designed for continuous, intelligent monitoring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-8">
              <div className="w-12 h-12 bg-cyan-600/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Single unified system</h3>
              <p className="text-gray-300">
                Not a collection of fragmented tools. One hub, multiple sensors, one interface. Everything works together seamlessly.
              </p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-8">
              <div className="w-12 h-12 bg-cyan-600/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Continuous monitoring</h3>
              <p className="text-gray-300">
                Not checklist inspections. Real-time data collection 24/7, so you catch issues as they develop, not after they've caused damage.
              </p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-8">
              <div className="w-12 h-12 bg-cyan-600/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Context-aware analysis</h3>
              <p className="text-gray-300">
                Environment-specific insights. The system understands your home's unique conditions and adapts its analysis accordingly.
              </p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-8">
              <div className="w-12 h-12 bg-cyan-600/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Predictive insights</h3>
              <p className="text-gray-300">
                Not reactive. AI models identify trends and predict potential issues before they become problems, saving time and money. Data is anonymized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Validation & MVP */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#1a2332" }}>
        <div
          ref={validationFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            validationFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Validation & MVP</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              HavenScan isn't just a concept. We've built a working system and validated it in real homes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Built MVP</h3>
              <p className="text-gray-300 text-sm">
                Developed working prototype with ESP-32 microcontroller and comprehensive sensor suite
              </p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Real-world deployment</h3>
              <p className="text-gray-300 text-sm">Deployed and tested in multiple homes, collecting real housing data</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">AI model trained</h3>
              <p className="text-gray-300 text-sm">Trained LSTM neural network on actual housing data for pattern recognition. Data is anonymized before being sent to the cloud</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Framework aligned</h3>
              <p className="text-gray-300 text-sm">Designed with Healthy People 2030 framework for housing quality standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#1a2332" }}>
        <div
          ref={usersFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            usersFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Who It's For</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              HavenScan serves anyone responsible for maintaining safe, healthy living environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Homeowners</h3>
              <p className="text-gray-300 text-sm">Protect your investment and family with continuous monitoring</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Landlords</h3>
              <p className="text-gray-300 text-sm">Maintain property quality and comply with housing standards</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Property managers</h3>
              <p className="text-gray-300 text-sm">Scale monitoring across multiple units efficiently</p>
            </div>
            <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Housing regulators</h3>
              <p className="text-gray-300 text-sm">Access data-driven insights for policy and compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 sm:px-8 lg:px-12" style={{ backgroundColor: "#0a0e1a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get early access</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be among the first to experience continuous home health monitoring.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-cyan-500/20" style={{ backgroundColor: "#1a2332" }}>
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
