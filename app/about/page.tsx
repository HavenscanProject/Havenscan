import Link from "next/link";

export default function About() {
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
              Traditional home inspections are periodic and reactive—they identify problems after damage occurs. While
              individual sensors exist for specific hazards, there was no unified system for continuous home health
              monitoring.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              HavenScan was built to solve this: a modular, intelligent system that provides continuous monitoring,
              context-aware analysis, and actionable insights—all in one platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-1">Engineering & Development</h3>
                <p className="text-gray-600 text-sm">Hardware, software, and AI systems</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-1">Product & Design</h3>
                <p className="text-gray-600 text-sm">User experience and system architecture</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-1">Research & Validation</h3>
                <p className="text-gray-600 text-sm">Data analysis and real-world testing</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-1">Strategy & Operations</h3>
                <p className="text-gray-600 text-sm">Business development and partnerships</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-sm text-gray-600 font-medium mb-2">Recognition</p>
              <p className="text-gray-700">
                HavenScan is recognized by the Conrad Challenge, an international competition that encourages
                entrepreneurs to address global challenges through innovation.
              </p>
            </div>
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

