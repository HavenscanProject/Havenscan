"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, userType }),
        });
        if (!res.ok) throw new Error("Failed to submit");
        setSubmitted(true);
      } catch (err) {
        console.error(err);
        alert("There was an error submitting the form. Please try again later.");
      }
    })();
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-20 px-6 sm:px-8 lg:px-12 max-w-2xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">Join the Waitlist</h1>
        <p className="text-lg text-gray-600 mb-12">
          Be among the first to get access to HavenScan. We'll notify you when early access becomes available.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank you!</h2>
            <p className="text-gray-600 mb-6">
              We've received your information. We'll be in touch soon with updates about HavenScan.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                I am a <span className="text-gray-500 font-normal">(optional)</span>
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              >
                <option value="">Select one...</option>
                <option value="homeowner">Homeowner</option>
                <option value="landlord">Landlord</option>
                <option value="property-manager">Property Manager</option>
                <option value="builder">Builder</option>
                <option value="regulator">Housing Regulator</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Join Waitlist
            </button>

            <p className="text-sm text-gray-500 text-center">
              We respect your privacy. Your information will only be used to notify you about HavenScan updates.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

