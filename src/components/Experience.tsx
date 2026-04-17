"use client";

import { useEffect, useRef } from "react";
import CursorConstellation from "./CursorConstellation";

const PALETTE = {
  bg:      "#0D0D0D",
  surface: "#161616",
  accent:  "#FFD600",
  orange:  "#FF6B00",
  cream:   "#F0EAD6",
} as const;

const experiences = [
  {
    id: 1,
    company: "Johnson & Johnson",
    logo: "/logos/johnson-johnson-logo-png_seeklogo-500414.svg",
    role: "Software Engineer",
    duration: "Apr 2025 – Present",
    achievements: [
      "Engineered an AI-driven Clinical Knowledge Retrieval Platform using Spring Boot microservices, PostgreSQL, and Redis.",
      "Semantic search over 8M+ records via Hugging Face, LangChain & Pinecone resulting in 40% improvement in knowledge discovery.",
      "Developed secure GraphQL and REST APIs integrated with OAuth2/OIDC authentication.",
      "Ensured reliability with OpenTelemetry, Prometheus, Grafana, and Resilience4j circuit breakers.",
      "Enforced code quality through Cypress, Playwright, and JMeter test suites.",
    ],
  },
  {
    id: 2,
    company: "Barclays",
    logo: "/logos/barclays-icon.svg",
    role: "Software Development Engineer",
    duration: "Feb 2022 – Jul 2023",
    achievements: [
      "Architected backend services for digital wallet systems using Spring Boot, Kafka, Redis, and PostgreSQL.",
      "Optimized performance to achieve sub-250ms APIs and maintained a 98% SLA.",
      "Contributed to a cross-platform React Native mobile application.",
      "Deployed scalable AWS infrastructure (EKS, Lambda, API Gateway) via Terraform.",
      "Streamlined CI/CD with GitHub Actions, contributing to 99.99% uptime.",
    ],
  },
  {
    id: 3,
    company: "Accenture",
    logo: "/logos/ACN.svg",
    role: "Software Engineer",
    duration: "Mar 2020 – Jan 2022",
    achievements: [
      "Built and maintained a robust supply chain & logistics platform using Node.js and Express.js.",
      "Spearheaded MongoDB query optimizations achieving 42% faster queries.",
      "Developed interactive, responsive data dashboards using React.",
      "Designed and executed complex ETL pipelines and large-scale data migrations.",
      "Orchestrated containerized deployments using Jenkins, Docker, and Kubernetes.",
    ],
  },
];

export default function Experience() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { (e.target as HTMLElement).style.cssText += "transform:none;opacity:1;"; hObs.disconnect(); }
    }, { threshold: 0.2 });
    if (headRef.current) hObs.observe(headRef.current);

    const cObs = new IntersectionObserver((entries) => entries.forEach(e => {
      if (e.isIntersecting) { (e.target as HTMLElement).style.cssText += "transform:none;opacity:1;"; cObs.unobserve(e.target); }
    }), { threshold: 0.12 });
    cardRefs.current.forEach((c, i) => { if (c) { c.style.transitionDelay = `${i * 120}ms`; cObs.observe(c); } });

    return () => { hObs.disconnect(); cObs.disconnect(); };
  }, []);

  return (
    <section id="experience" className="relative overflow-hidden cursor-none" style={{ background: PALETTE.bg }}>
      <div style={{ height: 20, background: "linear-gradient(90deg,#FF6B00,#FFD600)" }} />

      {/* Morphing blob */}
      <div style={{ position: "absolute", top: "10%", right: "-8%", width: 500, height: 500, borderRadius: "50%", background: PALETTE.accent, opacity: 0.06, filter: "blur(80px)", pointerEvents: "none", animation: "morphBlob 10s ease-in-out infinite 3s" }} />

      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,214,0,0.06) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />

      <style>{`@keyframes morphBlob{0%,100%{border-radius:40% 60% 70% 30%;transform:rotate(0deg)}33%{border-radius:60% 40% 30% 70%;transform:rotate(60deg)}66%{border-radius:30% 70% 50% 50%;transform:rotate(120deg)}}`}</style>

      <CursorConstellation />

      <div className="max-w-5xl mx-auto px-8 md:px-16 py-28 relative z-10">
        <div style={{ position: "absolute", top: 24, right: 0, fontSize: "clamp(6rem,14vw,14rem)", fontWeight: 900, lineHeight: 1, fontFamily: "'Clash Display',sans-serif", color: "rgba(255,214,0,0.06)", pointerEvents: "none", userSelect: "none", overflow: "hidden" }}>02</div>

        <h2 ref={headRef} style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 700, color: PALETTE.cream, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 80, transform: "translateX(-60px)", opacity: 0, transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease" }}>
          Experience.
        </h2>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 48 }}>
          {/* Yellow rail */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: PALETTE.accent }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {experiences.map((exp, i) => (
              <div key={exp.id} ref={el => { cardRefs.current[i] = el; }} style={{ position: "relative", transform: "translateX(40px)", opacity: 0, transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease" }}>
                {/* Timeline dot */}
                <div style={{ position: "absolute", top: 32, left: -57, width: 18, height: 18, borderRadius: "50%", background: PALETTE.accent, border: `3px solid ${PALETTE.bg}`, boxShadow: `0 0 0 2px ${PALETTE.accent}`, zIndex: 10 }} />

                <div className="hover:-translate-y-1 transition-transform duration-300" style={{ padding: 32, background: PALETTE.surface, borderLeft: `4px solid ${PALETTE.orange}`, borderRadius: 0, border: `1px solid rgba(255,214,0,0.1)`, borderLeftColor: PALETTE.orange }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.9)", padding: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img src={exp.logo} alt={exp.company} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                    </div>
                    <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: PALETTE.cream, textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1, margin: 0 }}>{exp.company}</h3>
                    <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, background: PALETTE.accent, color: "#0D0D0D", fontWeight: 700, padding: "4px 10px" }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontFamily: "'Satoshi',sans-serif", fontSize: 15, fontWeight: 600, color: PALETTE.orange, marginBottom: 16 }}>{exp.role}</p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {exp.achievements.map((a, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, fontFamily: "'Satoshi',sans-serif", fontSize: 14, color: `${PALETTE.cream}99`, lineHeight: 1.6 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: PALETTE.orange, marginTop: 8, flexShrink: 0 }} />{a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
