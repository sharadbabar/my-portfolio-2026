"use client";

import { useEffect, useRef, useState } from "react";
import CursorConstellation from "./CursorConstellation";

const PALETTE = {
  bg:     "#0D0D0D",
  surface:"#161616",
  accent: "#FFD600",
  orange: "#FF6B00",
  cream:  "#F0EAD6",
  pillBg: "#252525",
} as const;

const categories = [
  {
    label: "Programming & Scripting Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C++"],
    highlight: false, borderColor: PALETTE.accent,
  },
  {
    label: "Backend & Service Frameworks",
    skills: ["Spring Boot", "Spring WebFlux", "Node.js", "Express.js", "GraphQL", "gRPC", "RESTful API Development", "Spring Security", "OAuth2", "OIDC", "Event-Driven Architecture"],
    highlight: false, borderColor: PALETTE.accent,
  },
  {
    label: "Distributed Systems & Messaging",
    skills: ["Apache Kafka", "RabbitMQ", "Event-Driven Microservices", "Asynchronous Processing", "Concurrency Controls"],
    highlight: false, borderColor: PALETTE.orange,
  },
  {
    label: "Databases & Storage Solutions",
    skills: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Database Design", "Query Optimization", "Indexing", "Sharding"],
    highlight: false, borderColor: PALETTE.accent,
  },
  {
    label: "Cloud Infrastructure & DevOps",
    skills: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS EKS", "AWS API Gateway", "AWS RDS Aurora", "AWS CloudWatch", "Docker", "Kubernetes", "Helm", "Terraform", "GitHub Actions", "Jenkins", "Blue/Green Deployments", "Canary Deployments", "Auto-scaling", "High Availability"],
    highlight: true, borderColor: PALETTE.accent,
  },
  {
    label: "AI & LLMs",
    skills: ["LangChain", "RAG Pipelines", "Hugging Face Transformers", "OpenAI API", "Pinecone", "Weaviate", "Prompt Engineering"],
    highlight: true, borderColor: PALETTE.accent,
  },
  {
    label: "Frontend & UI Development",
    skills: ["React", "React Native", "Next.js", "Redux Toolkit", "Tailwind CSS", "Material UI"],
    highlight: false, borderColor: PALETTE.accent,
  },
  {
    label: "Testing & QA",
    skills: ["Jest", "Cypress", "Playwright", "JUnit", "Supertest", "Unit/Integration Testing", "Contract Testing", "Load Testing"],
    highlight: false, borderColor: PALETTE.accent,
  },
  {
    label: "Monitoring & Observability",
    skills: ["Prometheus", "Grafana", "Elasticsearch", "Logstash", "Kibana", "OpenTelemetry", "SLIs/SLOs", "Distributed Tracing"],
    highlight: false, borderColor: PALETTE.orange,
  },
];

function SkillPill({ name }: { name: string }) {
  const [hov, setHov] = useState(false);
  return (
    <span onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "5px 12px", borderRadius: 4,
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 600,
        background: hov ? PALETTE.accent : PALETTE.pillBg,
        color: hov ? PALETTE.bg : PALETTE.cream,
        border: `1px solid ${hov ? PALETTE.accent : "rgba(255,214,0,0.15)"}`,
        transform: hov ? "scale(1.06)" : "scale(1)",
        transition: "all 0.2s ease", cursor: "default", whiteSpace: "nowrap" as const,
      }}>
      {name}
    </span>
  );
}

function CategoryCard({ cat, index }: { cat: typeof categories[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const el = cardRef.current; if (!el) return;
    el.style.transitionDelay = `${index * 80}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.transform = "scale(1) translateY(0)"; el.style.opacity = "1"; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: cat.highlight ? "rgba(255,214,0,0.04)" : PALETTE.surface,
        borderRadius: 8,
        border: `1px solid rgba(255,214,0,0.12)`,
        borderTop: hov ? `4px solid ${PALETTE.accent}` : `1px solid rgba(255,214,0,0.12)`,
        padding: 24, transform: "scale(0.95) translateY(20px)", opacity: 0,
        transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease, border-top 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hov ? "0 12px 32px rgba(255,107,0,0.08)" : "none",
        ...(hov ? { transform: "scale(1) translateY(-4px)" } : {}),
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 3, minHeight: 22, alignSelf: "stretch", background: cat.borderColor, borderRadius: 2, flexShrink: 0 }} />
        <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 15, fontWeight: 700, color: PALETTE.cream, textTransform: "uppercase" as const, letterSpacing: "-0.01em", lineHeight: 1.2, margin: 0 }}>
          {cat.label}
        </h3>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
        {cat.skills.map(s => <SkillPill key={s} name={s} />)}
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { (e.target as HTMLElement).style.transform = "translateX(0)"; (e.target as HTMLElement).style.opacity = "1"; obs.disconnect(); }
    }, { threshold: 0.2 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden cursor-none" style={{ background: PALETTE.bg }}>
      <div style={{ height: 20, background: "linear-gradient(90deg,#FF6B00,#FFD600)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,214,0,0.06) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
      <CursorConstellation />

      <div className="max-w-7xl mx-auto px-8 md:px-12 py-28 relative z-10">
        <div style={{ position: "absolute", top: 24, left: -8, fontSize: "clamp(6rem,14vw,14rem)", fontWeight: 900, color: "rgba(255,214,0,0.06)", fontFamily: "'Clash Display',sans-serif", pointerEvents: "none", userSelect: "none", lineHeight: 1 }}>03</div>

        <h2 ref={headRef} style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 700, color: PALETTE.cream, textTransform: "uppercase", letterSpacing: "-0.02em", transform: "translateX(-60px)", opacity: 0, transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease", marginBottom: 12 }}>
          Technical Skills.
        </h2>
        <p style={{ fontFamily: "'Satoshi',sans-serif", fontSize: 18, color: `${PALETTE.cream}80`, marginBottom: 56 }}>9 categories of hard-won engineering expertise.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 24 }}>
          {categories.map((cat, i) => <CategoryCard key={cat.label} cat={cat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
