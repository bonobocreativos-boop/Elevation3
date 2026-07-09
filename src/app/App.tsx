import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import elevationLogo from "@/imports/Elevation-Logo-Main.png";
import { Menu, X, ArrowRight, Lock, ChevronRight, Play } from "lucide-react";

// ─── helpers ──────────────────────────────────────────────────────────────────
const UNSPLASH = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format`;

const IMGS = {
  surgeryWide:  UNSPLASH("photo-1514416309827-bfb0cf433a2d", 1400, 600),
  surgeonA:     UNSPLASH("photo-1640876777002-badf6aee5bcc", 400, 300),
  surgeonB:     UNSPLASH("photo-1639154968821-6dbc3efb8d23", 400, 300),
  doctorTablet: UNSPLASH("photo-1582750433449-648ed127bb54", 700, 840),
  doctorPortal: UNSPLASH("photo-1612276529731-4b21494e6d71", 480, 540),
};

const ff = { outfit: { fontFamily: "'Outfit', sans-serif" } as React.CSSProperties };
const fi = { fontFamily: "'Inter', sans-serif" } as React.CSSProperties;

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Products", "About", "Distributors"];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(15,23,42,0.07)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <ImageWithFallback
            src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1782183221/Elevation-Logo-Main_bnnwsd.png"
            alt="Elevation Spine"
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* Center: date stamp on hero, hidden on scroll */}
        {!scrolled && (
          <span
            className="hidden md:block text-xs text-foreground/50 tracking-widest absolute left-1/2 -translate-x-1/2"
            style={{ ...fi, fontSize: "11px" }}
          >
            FDA 510(k) Cleared · Commercially Distributed
          </span>
        )}

        {/* Right nav */}
        <nav className="hidden md:flex flex-col items-start gap-0.5 justify-center">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-foreground/60 hover:text-foreground transition-colors duration-200"
              style={{ ...fi, fontSize: "11px", lineHeight: "1.2" }}
            >
              {l}
            </a>
          ))}
        </nav>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-8 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-foreground/60 hover:text-foreground" style={fi}>
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onPlayVideo }: { onPlayVideo: () => void }) {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #C8E8F6 0%, #A8D4EE 35%, #BDE0F4 65%, #D6EDF8 100%)",
      }}
    >
      {/* Nav placeholder height */}
      <div className="h-20 shrink-0" />

      {/* Main content area */}
      <div className="relative flex-1 max-w-6xl mx-auto w-full px-8 flex flex-col">

        {/* Top-left floating card */}
        <div className="mt-10 self-start">
          <button
            onClick={onPlayVideo}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-4 w-52 shadow-sm border border-[rgba(255,255,255,0.8)] text-left hover:scale-[1.03] active:scale-95 transition-all duration-300 hover:shadow-md hover:bg-white/90 group cursor-pointer"
          >
            <div className="w-full h-24 rounded-2xl overflow-hidden mb-3 bg-blue-100 relative">
              <video
                src="https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
              </div>
            </div>
            <p className="text-xs text-foreground/60 leading-snug text-center" style={fi}>
              Enabling surgeons to perform spinal fusion more efficiently.
            </p>
          </button>
        </div>

        {/* Giant wordmark — positioned right */}
        <div className="absolute right-0 top-12 bottom-0 flex items-center pointer-events-none select-none pr-4">
          <span
            className="text-[clamp(5rem,14vw,13rem)] leading-none text-blue-400/30"
            style={{ ...ff.outfit, fontWeight: 200, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}
          >
            elevation
          </span>
        </div>

        {/* Center body copy */}
        <div className="mt-auto mb-32 max-w-sm">
          <p className="text-base text-foreground/55 leading-relaxed" style={fi}>
            Through proprietary Saber technology, Elevation Spine enables surgeons to perform spinal fusion more efficiently — commercially distributed across strategic US healthcare networks.
          </p>
        </div>
      </div>

      {/* Bottom 3D wave shape — CSS art simulating the Tervia glass ribs */}
      <div className="absolute bottom-0 left-0 right-0 h-60 pointer-events-none overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${-4 + i * 3.8}%`,
              width: "3px",
              height: `${40 + Math.sin(i * 0.45) * 120 + Math.cos(i * 0.3) * 40}px`,
              background: `rgba(255,255,255,${0.15 + (i % 3) * 0.12})`,
              borderRadius: "2px 2px 0 0",
              transform: `skewX(${-12 + i * 0.5}deg)`,
              boxShadow: "1px 0 8px rgba(168,212,238,0.3)",
            }}
          />
        ))}
        {/* Glass tinted overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(168,212,238,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2">
        <span className="text-[11px] text-foreground/40" style={fi}>Scroll</span>
        <div className="w-8 h-px bg-foreground/20" />
      </div>
    </section>
  );
}

// ─── Section label component ──────────────────────────────────────────────────
function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-1 mb-12">
      <span className="text-xs text-accent" style={{ ...fi, fontSize: "11px" }}>{num}</span>
      <span className="text-xs text-muted-foreground" style={{ ...fi, fontSize: "11px" }}>{title}</span>
    </div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="bg-white py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="/001" title="About Us" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: heading */}
          <div>
            <h2
              className="text-4xl md:text-5xl font-semibold text-foreground leading-[1.1] mb-0"
              style={{ ...ff.outfit, fontWeight: 600 }}
            >
              The Challenges
              <br />Holding Traditional
              <br />Spinal Fusion Back
            </h2>
          </div>

          {/* Right: body + photos */}
          <div className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground leading-relaxed" style={fi}>
              Traditional spinal fusion is encumbered by multi-stage instrumentation, excessive fluoroscopy exposure, and supplemental plating requirements. Elevation Spine was founded to solve these inefficiencies — engineering a zero-profile fixation platform that simplifies the most complex procedures without compromising stability.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="rounded-2xl overflow-hidden h-32 bg-blue-50">
                <img src={IMGS.surgeonA} alt="Surgeons in OR" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden h-32 bg-blue-50">
                <img src={IMGS.surgeonB} alt="Surgical team" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Products / Features ──────────────────────────────────────────────────────
function Products() {
  return (
    <section className="bg-white py-28 px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="/002" title="The Products" />

        <h2
          className="text-3xl md:text-5xl font-semibold text-foreground leading-[1.15] mb-3 max-w-4xl"
          style={{ ...ff.outfit, fontWeight: 600 }}
        >
          Engineered to simplify fusion and{" "}
          <span className="text-muted-foreground font-light">eliminate surgical complexity</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Left: SABER-C text */}
          <div className="flex flex-col gap-5">
            <div>
              <span
                className="text-xs font-medium text-accent block mb-1"
                style={{ ...fi, letterSpacing: "0.04em" }}
              >
                Available now
              </span>
              <h3
                className="text-2xl font-bold text-foreground mb-3"
                style={{ ...ff.outfit, fontWeight: 700 }}
              >
                SABER-C™
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" style={fi}>
                Integrated cervical interbody fusion system designed for maximum stability with minimal anatomic disruption. Designed for minimally invasive approaches.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { v: "85%", l: "Porosity" },
                { v: "1-Step", l: "Insertion" },
                { v: "Zero", l: "Profile" },
                { v: "FDA", l: "Cleared" },
              ].map((d) => (
                <div key={d.l} className="bg-card rounded-2xl p-4 border border-border">
                  <div className="text-2xl font-semibold text-foreground" style={ff.outfit}>
                    {d.v}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5" style={fi}>
                    {d.l}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="mt-2 text-sm text-accent hover:underline flex items-center gap-1"
              style={fi}
            >
              Full specifications <ChevronRight size={13} />
            </a>
          </div>

          {/* Center: photo */}
          <div className="rounded-3xl overflow-hidden bg-blue-50 h-96 lg:h-[480px] flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783568424/Saber-C_TECH-17-Spike_Deployment_Flush_ytsoeh.png"
              alt="Saber-C Spike Deployment Flush"
              className="w-full h-full object-contain p-6"
            />
          </div>

          {/* Right: SABER-XA card + porosity stat */}
          <div className="flex flex-col gap-6">
            <div className="bg-card rounded-3xl border border-border p-6">
              <span
                className="text-[11px] text-muted-foreground block mb-3"
                style={fi}
              >
                Pipeline development
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ ...ff.outfit, fontWeight: 700 }}>
                SABER-XA™
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4" style={fi}>
                Next-generation lateral access fixation currently undergoing final validation and clinical advisory review.
              </p>
              <div
                className="border border-border rounded-2xl p-4 bg-white text-sm"
                style={fi}
              >
                <span className="text-[11px] text-muted-foreground block mb-2">
                  Status update
                </span>
                <p className="text-foreground/70 text-xs leading-relaxed italic">
                  "Validation phases for the XA series are exceeding biomechanical benchmarks. Enrollment for initial clinical evaluation begins Q4."
                </p>
              </div>
            </div>

            {/* Porosity stat card */}
            <div className="bg-foreground rounded-3xl p-6 text-background">
              <span className="text-xs text-background/50 mb-3 block" style={fi}>
                Clinical advantage
              </span>
              <div
                className="text-5xl font-light text-background mb-1"
                style={{ ...ff.outfit, fontWeight: 300 }}
              >
                85%
              </div>
              <div className="text-sm font-medium text-background/80 mb-3" style={fi}>
                Porosity
              </div>
              <div className="h-1.5 bg-background/10 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-accent rounded-full" />
              </div>
              <p className="text-xs text-background/50 mt-3 leading-relaxed" style={fi}>
                Optimized bone ingrowth scaffold for long-term fusion stability
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Workflow (dark) ──────────────────────────────────────────────────────────
function Workflow() {
  const steps = [
    { pos: "20%", delay: 0, title: "Prepare Access Corridor", body: "Minimally invasive approach established via low-profile retractor system" },
    { pos: "42%", delay: 0.1, title: "Single-Step Insertion", body: "In-line device deployment — no secondary instrumentation required" },
    { pos: "63%", delay: 0.2, title: "In-Line Fixation", body: "Divergent screws deploy through integrated instrumentation for immediate stability" },
    { pos: "82%", delay: 0.3, title: "Closure", body: "Reduced fluoroscopy exposure; minimal tissue disruption" },
  ];

  return (
    <section
      className="py-28 px-8 overflow-hidden"
      style={{ background: "#07080C" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start gap-2 mb-14">
          <span className="text-xs text-accent" style={{ ...fi, fontSize: "11px" }}>/003</span>
          <span className="text-xs text-white/30" style={{ ...fi, fontSize: "11px" }}>Workflow</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <h2
            className="text-4xl md:text-5xl font-semibold text-white leading-[1.1]"
            style={{ ...ff.outfit, fontWeight: 600 }}
          >
            The Saber
            <br />Surgical Workflow
          </h2>
          <p className="text-sm text-white/40 leading-relaxed self-end max-w-sm" style={fi}>
            Simple, accessible, and designed with precision in mind. Every step is optimized for speed, reproducibility, and intraoperative safety.
          </p>
        </div>

        {/* Timeline visualization */}
        <div className="relative h-64 w-full">
          {/* Vertical bars */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${i * 1.67}%`,
                width: "1.5px",
                height: `${20 + Math.sin(i * 0.25) * 60 + Math.abs(Math.sin(i * 0.08)) * 80}px`,
                background: `rgba(59,127,232,${0.08 + Math.sin(i * 0.3) * 0.06 + 0.06})`,
                borderRadius: "1px 1px 0 0",
              }}
            />
          ))}

          {/* Step callouts */}
          {steps.map((s, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-start gap-1.5"
              style={{
                left: s.pos,
                bottom: `${90 + Math.sin(i * 1.2) * 30}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="w-7 h-7 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl p-3 w-40 backdrop-blur-sm">
                <div className="text-xs font-medium text-white mb-1" style={{ ...ff.outfit, fontWeight: 600 }}>
                  {s.title}
                </div>
                <div className="text-[11px] text-white/40 leading-snug" style={fi}>
                  {s.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Distributors / Platform ──────────────────────────────────────────────────
function Platform() {
  return (
    <section className="bg-white py-28 px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="/004" title="For Distributors" />

        <h2
          className="text-3xl md:text-5xl font-semibold text-foreground leading-[1.15] mb-16 max-w-3xl"
          style={{ ...ff.outfit, fontWeight: 600 }}
        >
          Expand your territory with a platform built for surgical excellence
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left card: territory */}
          <div className="bg-card rounded-3xl border border-border p-8 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2" style={{ ...ff.outfit, fontWeight: 600 }}>
                Strategic Territory Rights
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed" style={fi}>
                Gain exclusive access to the Elevation Spine platform, technical training assets, and territory-specific analytics.
              </p>
            </div>

            {/* Doctor photo inside card */}
            <div className="rounded-2xl overflow-hidden h-44 bg-blue-50 relative">
              <img
                src="https://res.cloudinary.com/dvm7fjhxs/image/upload/v1783568508/akram-huseyn-brbF5FSnSgI-unsplash_uigy0k.jpg"
                alt="Medical professional"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <ul className="flex flex-col gap-2.5 mt-auto">
              {["Exclusive Territory Rights", "Comprehensive Sales Training", "Direct Surgeon Support Channel"].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/70" style={fi}>
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              style={fi}
            >
              Request territory info <ArrowRight size={13} />
            </a>
          </div>

          {/* Middle: resource portal */}
          <div className="bg-card rounded-3xl border border-border p-8 flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-foreground" style={{ ...ff.outfit, fontWeight: 600 }}>
              Technical Resource Portal
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed" style={fi}>
              Secure access to surgical techniques, IFU library, clinical data, and marketing assets.
            </p>

            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Instructions for Use (IFU) Library",
                "Surgical Technique Animations",
                "Clinical Biomechanical Data",
              ].map((r) => (
                <li key={r} className="flex items-center gap-2 text-xs text-muted-foreground py-2 border-b border-border last:border-0" style={fi}>
                  <ArrowRight size={11} className="text-accent shrink-0" />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-center gap-1.5 mb-3">
                <Lock size={11} className="text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground" style={fi}>
                  Authorized personnel only
                </span>
              </div>

              <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Institution Email"
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-border bg-white placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
                  style={fi}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full text-sm px-4 py-2.5 rounded-2xl border border-border bg-white placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
                  style={fi}
                />
                <button
                  type="submit"
                  className="mt-1 w-full py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
                  style={fi}
                >
                  Portal Login
                </button>
                <button type="button" className="text-xs text-accent text-center hover:underline" style={fi}>
                  Request Access
                </button>
              </form>
            </div>
          </div>

          {/* Right: real-time performance card */}
          <div className="flex flex-col gap-6">
            <div className="bg-foreground rounded-3xl p-8 text-background flex flex-col gap-4 flex-1">
              <span className="text-xs text-background/40" style={fi}>Clinical performance</span>
              <h3 className="text-xl font-semibold text-background" style={{ ...ff.outfit, fontWeight: 600 }}>
                Reduced Fluoroscopy
              </h3>
              <p className="text-sm text-background/50 leading-relaxed" style={fi}>
                Fewer tool changes result in decreased radiation exposure for the surgical team and patient.
              </p>

              {/* Mini waveform */}
              <div className="flex items-end gap-0.5 h-14 mt-auto">
                {[30, 45, 28, 60, 35, 55, 42, 70, 38, 65, 50, 80, 44, 72, 58, 90, 62, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: `rgba(59,127,232,${0.3 + (i / 18) * 0.6})`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] text-background/40" style={fi}>
                Platform uptime · 99.8%
              </span>
            </div>

            <div className="bg-card rounded-3xl border border-border p-6">
              <span className="text-xs text-muted-foreground block mb-2" style={fi}>
                Optimized stability
              </span>
              <div className="text-4xl font-light text-foreground mb-1" style={{ ...ff.outfit, fontWeight: 300 }}>
                Immediate
              </div>
              <div className="text-sm text-muted-foreground" style={fi}>
                Rigid fixation via divergent screw paths — no secondary steps
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial / CTA ────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section className="bg-white py-28 px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionLabel num="/005" title="Clinical Voice" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-3xl md:text-4xl font-semibold text-foreground leading-[1.2] mb-8 max-w-lg"
              style={{ ...ff.outfit, fontWeight: 600 }}
            >
              A modern approach to spinal fixation through elegant mechanical engineering
            </h2>

            <blockquote className="border-l-2 border-accent pl-5 mb-6">
              <p className="text-base text-foreground/70 leading-relaxed italic mb-4" style={fi}>
                "The single-step insertion workflow has meaningfully reduced our OR time. We've moved from a multi-instrument approach to a single unified pass — it changes how we think about cervical cases."
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden">
                  <img
                    src={UNSPLASH("photo-1612276529731-4b21494e6d71", 80, 80)}
                    alt="Spine surgeon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground" style={fi}>Lead Spine Surgeon</div>
                  <div className="text-xs text-muted-foreground" style={fi}>Tier-1 Academic Medical Center</div>
                </div>
              </footer>
            </blockquote>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors"
              style={fi}
            >
              Contact Elevation Spine <ArrowRight size={14} />
            </a>
          </div>

          {/* Right: DNA / science image */}
          <div className="rounded-3xl overflow-hidden h-80 bg-blue-50 relative">
            <img
              src={UNSPLASH("photo-1614935151651-0bea6508db6b", 700, 500)}
              alt="Biomedical research visualization"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(59,127,232,0.15) 0%, transparent 60%)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-white border-t border-border py-14 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <ImageWithFallback
              src={elevationLogo}
              alt="Elevation Spine"
              className="h-7 w-auto object-contain mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs" style={fi}>
              Leading the industry in zero-profile spinal fixation solutions. Simplifying complex surgical procedures through elegant mechanical engineering.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-foreground mb-4" style={fi}>
              Navigation
            </h5>
            <ul className="flex flex-col gap-2.5">
              {["About Us", "Products", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={fi}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-foreground mb-4" style={fi}>
              Legal
            </h5>
            <ul className="flex flex-col gap-2.5">
              {["Privacy Policy", "Legal Disclaimer", "FDA Notices"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={fi}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-border">
          <span className="text-xs text-muted-foreground" style={fi}>
            © 2024 Elevation Spine. All rights reserved.
          </span>
          <span className="text-xs text-muted-foreground" style={fi}>
            FDA 510(k) cleared · Zero-profile fixation
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="bg-background text-foreground" style={fi}>
      <Nav />
      <Hero onPlayVideo={() => setVideoOpen(true)} />
      <About />
      <Products />
      <Workflow />
      <Platform />
      <Testimonial />
      <Footer />

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <X size={20} />
            </button>
            <video
              src="https://res.cloudinary.com/dvm7fjhxs/video/upload/v1782182240/Saber-C_Porous_Websiteloop_Final_sk3y6y.mp4"
              className="w-full h-full object-contain"
              autoPlay
              controls
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
}
