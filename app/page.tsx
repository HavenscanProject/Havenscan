"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Zone = {
  id: string;
  name: string;
  short: string;
  summary: string;
  signals: string[];
  automations: string[];
};

const zones: Zone[] = [
  {
    id: "entry",
    name: "Perimeter & Entry",
    short: "Doors, windows, and approach paths",
    summary:
      "Guard the shell of the home with layered sensing — force, glass break, and approach detection tuned to real movement, not pets or wind.",
    signals: ["Door forced or ajar", "Glass vibration or break", "Approach within 12ft", "Unexpected unlock"],
    automations: [
      "Auto-lock + notify household",
      "Discreet chime for friendly arrivals",
      "Escalate to lights + siren on force events"
    ]
  },
  {
    id: "living",
    name: "Living Core",
    short: "Family room and main level airflow",
    summary:
      "Keep shared spaces healthy and calm: detect smoke/CO, air quality swings, or movement when nobody should be inside.",
    signals: ["Smoke / CO rise", "Air quality dip (PM2.5, VOC)", "Unexpected occupancy"],
    automations: ["Pause HVAC + ventilate", "Message trusted circle", "Scene: path-to-exit lighting"]
  },
  {
    id: "kitchen",
    name: "Kitchen & Heat",
    short: "Cooktops, water, and utilities",
    summary:
      "Watch for the most common in-home risks — fire, water, and misuse. Pair appliance states with thermal and moisture signals.",
    signals: ["Cooktop left on", "Thermal spike near stove", "Sink or dishwasher leak"],
    automations: ["Shut water at main", "Nudge to phone + voice", "Vent hood + fans on"]
  },
  {
    id: "garage",
    name: "Garage & Vehicles",
    short: "Garage doors, EVs, and storage",
    summary:
      "Blend physical security with safety: track garage doors, EV charging heat, and entry from garage to interior.",
    signals: ["Garage left open", "Charge port heat", "Motion after curfew"],
    automations: ["Close door after dwell time", "Stage exterior flood lights", "Lock mudroom door"]
  },
  {
    id: "utility",
    name: "Mechanical & Water",
    short: "Mechanical room, sump, mains",
    summary:
      "Critical systems telemetry in one view: mains water, boiler or furnace temps, sump level, and panel state.",
    signals: ["Water flow anomaly", "Boiler temp drift", "Sump rising fast"],
    automations: ["Shutoff + alert", "Spin up fan or pump", "Dispatch help with context"]
  },
  {
    id: "backyard",
    name: "Backyard & Outdoor",
    short: "Patio, pool, perimeter",
    summary:
      "Extend safety outdoors with privacy-preserving sensing — lidar zones, pool movement, and gate status.",
    signals: ["Gate opened", "Pool disturbance", "Perimeter crossing"],
    automations: ["Illuminate safe path", "Sound poolside tone", "Record short clip with consent modes"]
  },
  {
    id: "roof",
    name: "Roofline & Weather",
    short: "Attic, gutters, storms",
    summary:
      "Track moisture and thermal changes in the attic and roofline to catch issues before they spread indoors.",
    signals: ["Attic humidity spike", "Gutter overflow flow", "Hail or wind alerts"],
    automations: ["Close skylights", "Schedule check-in reminder", "Elevate risk state for the night"]
  }
];

const zonePositions: Record<Zone["id"], { x: number; y: number }> = {
  entry: { x: 22, y: 56 },
  living: { x: 42, y: 48 },
  kitchen: { x: 60, y: 55 },
  garage: { x: 80, y: 58 },
  utility: { x: 50, y: 72 },
  backyard: { x: 72, y: 32 },
  roof: { x: 45, y: 20 }
};

function useScrollProgress() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      const total = rect.height - view;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const distanceIntoView = view - rect.top;
      const ratio = Math.min(Math.max(distanceIntoView / (rect.height + view * 0.5), 0), 1);
      setProgress(ratio);
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return { ref, progress };
}

function HouseBlueprint({
  activeId,
  onSelect,
  progress
}: {
  activeId: string;
  onSelect: (id: string) => void;
  progress: number;
}) {
  return (
    <div
      className="blueprint"
      style={{
        transform: `scale(${0.82 + progress * 0.3}) translateY(${20 - progress * 20}px)`,
        opacity: 0.7 + progress * 0.3
      }}
    >
      <div className="blueprint-glow" />
      <svg viewBox="0 0 1200 720" className="blueprint-svg" role="presentation">
        <defs>
          <linearGradient id="frame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7ce7ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8cb1ff" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="core" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8ed1ff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#0d1a2b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="80" y="180" width="1040" height="420" rx="38" ry="38" fill="url(#core)" />
        <rect
          x="120"
          y="220"
          width="960"
          height="340"
          rx="28"
          ry="28"
          stroke="url(#frame)"
          strokeWidth="6"
          fill="rgba(12,21,34,0.6)"
        />
        <path
          d="M200 260 L1000 260 L1000 520 L200 520 Z M640 260 L640 520 M200 380 L1000 380"
          stroke="rgba(180,210,255,0.35)"
          strokeWidth="3"
          strokeDasharray="8 10"
          fill="none"
        />
        <path
          d="M120 400 L80 400 L80 320 L120 320 M1080 320 L1120 320 L1120 400 L1080 400"
          stroke="rgba(140,200,255,0.25)"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="600" cy="160" r="70" stroke="rgba(140,200,255,0.25)" strokeWidth="3" fill="none" />
        <circle cx="600" cy="560" r="70" stroke="rgba(140,200,255,0.2)" strokeWidth="2" fill="none" />
      </svg>
      <div className="zone-layer">
        {zones.map((zone) => {
          const pos = zonePositions[zone.id];
          return (
            <button
              key={zone.id}
              className={`zone-pin ${zone.id === activeId ? "active" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onMouseEnter={() => onSelect(zone.id)}
              onFocus={() => onSelect(zone.id)}
              onClick={() => onSelect(zone.id)}
              aria-pressed={zone.id === activeId}
              aria-label={`Open details for ${zone.name}`}
            >
              <span className="zone-dot" />
              <span className="zone-label">{zone.short}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ZonePanel({ zone }: { zone: Zone }) {
  return (
    <div className="panel">
      <div className="panel-pill">Live zone • {zone.short}</div>
      <h3>{zone.name}</h3>
      <p className="muted">{zone.summary}</p>

      <div className="panel-grid">
        <div>
          <p className="overline">Signals watched</p>
          <ul>
            {zone.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="overline">Automations</p>
          <ul>
            {zone.automations.map((automation) => (
              <li key={automation}>{automation}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StepTiles() {
  const steps = [
    {
      title: "Sense & fuse",
      body: "Blend low-light vision, acoustic, thermal, and contact sensing into one adaptive signal that ignores pets, wind, and daily routines.",
      badge: "Always-on"
    },
    {
      title: "Decide with context",
      body: "Risk models weigh time of day, who is home, and recent events before escalating — giving you high-confidence alerts only.",
      badge: "Context aware"
    },
    {
      title: "Act instantly",
      body: "Trigger scenes, shut valves, lock doors, and notify your circle with a clear storyboard of what HavenScan saw and did.",
      badge: "Automated"
    }
  ];

  return (
    <div className="step-grid">
      {steps.map((step) => (
        <article key={step.title} className="card">
          <div className="pill">{step.badge}</div>
          <h4>{step.title}</h4>
          <p className="muted">{step.body}</p>
        </article>
      ))}
    </div>
  );
}

function ZoneGrid() {
  return (
    <div className="zone-grid">
      {zones.map((zone) => (
        <article key={zone.id} className="card compact">
          <p className="pill subtle">{zone.short}</p>
          <h4>{zone.name}</h4>
          <p className="muted small">{zone.summary}</p>
          <div className="chips">
            {zone.signals.slice(0, 2).map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [activeId, setActiveId] = useState(zones[0].id);
  const activeZone = useMemo(() => zones.find((z) => z.id === activeId) ?? zones[0], [activeId]);
  const { ref, progress } = useScrollProgress();

  return (
    <main className="page">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <span className="dot" />
          <span className="logo">HavenScan</span>
        </div>
        <div className="nav-actions">
          <a href="#map" className="ghost">
            Explore the home
          </a>
          <a href="#contact" className="solid">
            Request a demo
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="pill">Modern home intelligence</p>
          <h1>
            Your home, reimagined as a living system that protects, learns, and acts with you.
          </h1>
          <p className="muted">
            HavenScan turns every critical zone into a calm, responsive space. Scroll to watch the home expand,
            click a room to see what is monitored, and learn how automation keeps you ahead of risk.
          </p>
          <div className="hero-actions">
            <a className="solid" href="#map">
              Start scrolling
            </a>
            <a className="ghost" href="#zones">
              See coverage
            </a>
          </div>
          <div className="status">
            <span className="status-dot" />
            <span>Live protection across 7 zones</span>
          </div>
        </div>
      </section>

      <section id="map" className="experience" ref={ref}>
        <div className="sticky">
          <div className="left">
            <HouseBlueprint activeId={activeId} onSelect={setActiveId} progress={progress} />
            <div className="scroll-hint">
              <span className="hint-dot" />
              The blueprint expands as you scroll
            </div>
          </div>
          <div className="right">
            <ZonePanel zone={activeZone} />
          </div>
        </div>
      </section>

      <section id="zones" className="section">
        <div className="section-header">
          <p className="pill">Coverage</p>
          <h2>Every part of the home stays in view</h2>
          <p className="muted max-600">
            Click a zone above, then dive deeper here. HavenScan blends privacy-first sensing, predictive alerts, and
            immediate automations so you can go from signal to action without noise.
          </p>
        </div>
        <ZoneGrid />
      </section>

      <section className="section">
        <div className="section-header">
          <p className="pill">How it works</p>
          <h2>Sense. Decide. Act.</h2>
          <p className="muted max-600">
            We pair edge intelligence with cloud context. Each trigger ships with a clear narrative of what HavenScan
            saw, decided, and did — so you trust every alert.
          </p>
        </div>
        <StepTiles />
      </section>

      <section id="contact" className="cta">
        <div>
          <p className="pill">Ready to see it live?</p>
          <h2>Build your connected, calm home with HavenScan.</h2>
          <p className="muted">
            We will tailor the monitoring blueprint to your space — from single-family homes to multi-unit residences —
            and integrate with the systems you already use.
          </p>
          <div className="hero-actions">
            <a className="solid" href="mailto:founders@havenscan.com">
              Book a walkthrough
            </a>
            <a className="ghost" href="#map">
              Replay the experience
            </a>
          </div>
        </div>
        <div className="cta-card">
          <div className="pill subtle">Snapshot</div>
          <ul>
            <li>7 monitored zones out of the box</li>
            <li>Privacy-first sensors and consented clips</li>
            <li>Automations that adapt to routines</li>
            <li>Storyboards for every alert</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

