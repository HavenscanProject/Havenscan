"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import MobileAppShowcase from "./components/MobileAppShowcase";

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
  const heroFade = useScrollFadeIn();
  const problemFade = useScrollFadeIn();
  const solutionFade = useScrollFadeIn();
  const howItWorksFade = useScrollFadeIn();
  const mobileAppFade = useScrollFadeIn();
  const differentFade = useScrollFadeIn();
  const validationFade = useScrollFadeIn();
  const usersFade = useScrollFadeIn();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div
          ref={heroFade.ref}
          className={`max-w-4xl transition-opacity duration-700 ${
            heroFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Continuous Home Health Monitoring.
            <br />
            One System.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Detect hidden risks before they become costly or dangerous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Join the Waitlist
            </Link>
            <Link
              href="#how-it-works"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-colors text-center"
            >
              View How It Works
            </Link>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-700">System Architecture</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Central Hub</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Sensor Modules</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">AI Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div
          ref={problemFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            problemFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Hidden housing risks affect millions of homes
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Environmental hazards accumulate silently in homes. Elevated humidity promotes mold growth. Radon exposure
              increases cancer risk. Pest infestations cause structural damage. These issues often go undetected until
              they become costly or dangerous.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">68%</div>
              <p className="text-gray-600 text-sm">of homes have high humidity levels that promote mold growth</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">1 in 15</div>
              <p className="text-gray-600 text-sm">homes have elevated radon levels above EPA action thresholds</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">$11B+</div>
              <p className="text-gray-600 text-sm">annual cost of pest infestations in residential properties</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">35M</div>
              <p className="text-gray-600 text-sm">housing units in the U.S. have inadequate conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution: HavenScan */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div
          ref={solutionFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            solutionFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">The Solution: HavenScan</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              HavenScan is a modular sensor system that continuously monitors your home's health. A central hub
              coordinates multiple sensor modules, collecting real-time data on environmental conditions, air quality,
              and potential hazards. Alerts and monthly health reports keep you informed.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Modular sensor system</h3>
                  <p className="text-gray-600 text-sm">Place sensors where they matter most, expand as needed</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Central hub</h3>
                  <p className="text-gray-600 text-sm">Unified control and data aggregation in one device</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Continuous monitoring</h3>
                  <p className="text-gray-600 text-sm">24/7 data collection, not periodic inspections</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Alerts + monthly reports</h3>
                  <p className="text-gray-600 text-sm">Immediate notifications and comprehensive health summaries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div
          ref={howItWorksFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            howItWorksFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
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
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Install the hub and sensors</h3>
              <p className="text-gray-600 text-sm">Simple setup process, sensors communicate wirelessly with the central hub</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sensors collect real-time data</h3>
              <p className="text-gray-600 text-sm">Continuous monitoring of temperature, humidity, air quality, and more</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI analyzes trends and anomalies</h3>
              <p className="text-gray-600 text-sm">Machine learning models identify patterns and potential risks</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Alerts + recommendations</h3>
              <p className="text-gray-600 text-sm">Get notified on your phone when issues are detected, with actionable guidance</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">5</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Monthly home health report</h3>
              <p className="text-gray-600 text-sm">Comprehensive summary of your home's condition and trends over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Showcase */}
      <MobileAppShowcase
        figmaUrl="https://merry-decay-69640409.figma.site/"
      />

      {/* What Makes It Different */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div
          ref={differentFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            differentFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">What Makes It Different</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              HavenScan isn't just another sensor. It's a unified system designed for continuous, intelligent monitoring.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Single unified system</h3>
              <p className="text-gray-600">
                Not a collection of fragmented tools. One hub, multiple sensors, one interface. Everything works together seamlessly.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous monitoring</h3>
              <p className="text-gray-600">
                Not checklist inspections. Real-time data collection 24/7, so you catch issues as they develop, not after they've caused damage.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Context-aware analysis</h3>
              <p className="text-gray-600">
                Environment-specific insights. The system understands your home's unique conditions and adapts its analysis accordingly.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Predictive insights</h3>
              <p className="text-gray-600">
                Not reactive. AI models identify trends and predict potential issues before they become problems, saving time and money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Validation & MVP */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div
          ref={validationFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            validationFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Validation & MVP</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              HavenScan isn't just a concept. We've built a working system and validated it in real homes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Built MVP</h3>
              <p className="text-gray-600 text-sm">
                Developed working prototype with ESP-32 microcontroller and comprehensive sensor suite
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Real-world deployment</h3>
              <p className="text-gray-600 text-sm">Deployed and tested in multiple homes, collecting real housing data</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">AI model trained</h3>
              <p className="text-gray-600 text-sm">Trained LSTM neural network on actual housing data for pattern recognition</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Framework aligned</h3>
              <p className="text-gray-600 text-sm">Designed with Healthy People 2030 framework for housing quality standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 sm:px-8 lg:px-12">
        <div
          ref={usersFade.ref}
          className={`max-w-7xl mx-auto transition-opacity duration-700 ${
            usersFade.isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Who It's For</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              HavenScan serves anyone responsible for maintaining safe, healthy living environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Homeowners</h3>
              <p className="text-gray-600 text-sm">Protect your investment and family with continuous monitoring</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Landlords</h3>
              <p className="text-gray-600 text-sm">Maintain property quality and comply with housing standards</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Property managers</h3>
              <p className="text-gray-600 text-sm">Scale monitoring across multiple units efficiently</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Housing regulators</h3>
              <p className="text-gray-600 text-sm">Access data-driven insights for policy and compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get early access</h2>
          <p className="text-xl text-blue-100 mb-8">
            Be among the first to experience continuous home health monitoring.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <span className="font-semibold text-gray-900">HavenScan</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/about" className="hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
