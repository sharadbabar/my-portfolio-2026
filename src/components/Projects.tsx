"use client";

import { useEffect, useRef } from "react";
import CursorConstellation from "./CursorConstellation";

const PALETTE = {
  bg:     "#0D0D0D",
  surface:"#161616",
  accent: "#FFD600",
  orange: "#FF6B00",
  cream:  "#F0EAD6",
} as const;

const projects = [
  
  {
    title: "Tomato: MERN Food Delivery Application ",
    desc: "High-performance MERN food delivery platform supporting real-time order tracking, secure payments, and scalable microservices handling thousands of concurrent users with low-latency responses",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux", "JWT Authentication", "Stripe API", "REST APIs", "Tailwind CSS", "Axios", "Cloudinary", "Docker", "AWS"],
    live: "https://food-delivery-website-jade-sigma.vercel.app/",
    github: "https://github.com/sharadbabar/food-delivery-website",
  },
  {
    title: "Horizon Banking: Real-Time Banking & Payments Platform",
    desc: "Premium banking dashboard with secure user authentication, account aggregation, transaction tracking, spending analytics, card management, and fund transfers.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Appwrite", "Plaid", "Dwolla", "Chart.js"],
    live: null as string | null,
    github: "https://github.com/sharadbabar/banking-main",
  },
  
];

export default function Projects() {
  const headRef  = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { (e.target as HTMLElement).style.cssText += "transform:none;opacity:1;"; hObs.disconnect(); }
    }, { threshold: 0.2 });
    if (headRef.current) hObs.observe(headRef.current);

    const cObs = new IntersectionObserver((entries) => entries.forEach(e => {
      if (e.isIntersecting) { (e.target as HTMLElement).style.cssText += "transform:none;opacity:1;"; cObs.unobserve(e.target); }
    }), { threshold: 0.1 });
    cardRefs.current.forEach((c, i) => { if (c) { c.style.transitionDelay = `${i * 100}ms`; cObs.observe(c); } });

    return () => { hObs.disconnect(); cObs.disconnect(); };
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden cursor-none" style={{ background: PALETTE.bg }}>
      <div style={{ height: 20, background: "linear-gradient(90deg,#FF6B00,#FFD600)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,214,0,0.06) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
      <CursorConstellation />

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-28 relative z-10">
        <div style={{ position: "absolute", top: 24, right: 0, fontSize: "clamp(6rem,14vw,14rem)", fontWeight: 900, color: "rgba(255,214,0,0.06)", fontFamily: "'Clash Display',sans-serif", pointerEvents: "none", userSelect: "none", lineHeight: 1, overflow: "hidden" }}>04</div>

        <h2 ref={headRef} style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 700, color: PALETTE.cream, textTransform: "uppercase", letterSpacing: "-0.02em", transform: "translateX(-60px)", opacity: 0, transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease", marginBottom: 12 }}>
          Selected Works.
        </h2>
        <p style={{ fontFamily: "'Satoshi',sans-serif", fontSize: 18, color: `${PALETTE.cream}80`, marginBottom: 56 }}>A curated list of impactful engineering projects.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 28 }}>
          {projects.map((p, i) => (
            <div key={p.title} ref={el => { cardRefs.current[i] = el; }}
              style={{ background: PALETTE.surface, borderLeft: `4px solid ${PALETTE.accent}`, border: `1px solid rgba(255,214,0,0.12)`, borderLeftColor: PALETTE.accent, borderRadius: 0, display: "flex", flexDirection: "column", transform: "scale(0.88) translateY(30px)", opacity: 0, transition: "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease, box-shadow 0.25s ease, translateY 0.25s ease" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-8px)"; el.style.boxShadow = "0 20px 40px rgba(255,107,0,0.15)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "none"; el.style.boxShadow = "none"; }}>
              <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: PALETTE.cream, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontFamily: "'Satoshi',sans-serif", fontSize: 14, color: `${PALETTE.cream}99`, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, padding: "3px 8px", background: "rgba(255,214,0,0.1)", color: PALETTE.accent, border: "1px solid rgba(255,214,0,0.25)", borderRadius: 3 }}>{t}</span>
                  ))}
                </div>
                {!p.live && !p.github && (
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: `${PALETTE.cream}40`, textTransform: "uppercase", letterSpacing: "1px" }}>Internal / NDA</span>
                )}
                {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: PALETTE.orange, textDecoration: "none", fontWeight: 700 }}>Live ↗</a>}
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: PALETTE.cream, textDecoration: "none", fontWeight: 700 }}>GitHub ↗</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
