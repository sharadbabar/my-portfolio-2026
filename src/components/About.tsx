"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import CursorConstellation from "./CursorConstellation";

const P = {
  bg:      "#0D0D0D",
  surface: "#161616",
  accent:  "#FFD600",
  orange:  "#FF6B00",
  cream:   "#F0EAD6",
  pillBg:  "#252525",
} as const;

/* ── count-up ───────────────────────────────────────── */
function useCountUp(target: number, duration = 1200, started = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    let s: number | null = null;
    const step = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setV(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return v;
}

/* ── magnetic CTA ───────────────────────────────────── */
function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hov, setHov] = useState(false);
  const onMove = useCallback((e: React.MouseEvent) => {
    const b = ref.current; if (!b) return;
    const { left, top, width, height } = b.getBoundingClientRect();
    b.style.transform = `translate(${((e.clientX - left - width / 2) / (width / 2)) * 10}px,${((e.clientY - top - height / 2) / (height / 2)) * 10}px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) { ref.current.style.transform = "translate(0,0)"; ref.current.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)"; }
    setHov(false);
  }, []);
  return (
    <a ref={ref} href="#contact" onMouseMove={onMove} onMouseEnter={() => setHov(true)} onMouseLeave={onLeave}
      style={{
        display: "inline-block", padding: "14px 32px", borderRadius: 6,
        background: hov ? P.accent : P.pillBg,
        color: hov ? P.bg : P.accent,
        fontFamily: "'Clash Display',sans-serif", fontSize: 14, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none",
        border: `1px solid ${hov ? P.accent : "rgba(255,214,0,0.3)"}`,
        boxShadow: hov ? "0 8px 24px rgba(255,214,0,0.3)" : "none",
        transition: "background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, border 0.25s ease",
      }}>
      Let&apos;s Work Together →
    </a>
  );
}

/* ── terminal panel ─────────────────────────────────── */
function TerminalPanel({ visible }: { visible: boolean }) {
  return (
    <div style={{
      background: "#111111", borderRadius: 12,
      border: "1px solid rgba(255,214,0,0.2)", overflow: "hidden",
      transform: visible ? "translateX(0)" : "translateX(40px)",
      opacity: visible ? 1 : 0,
      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s, opacity 0.5s ease 0.4s",
    }}>
      {/* macOS bar */}
      <div style={{ background: "#1E1E1E", padding: "12px 16px", display: "flex", gap: 8, alignItems: "center" }}>
        {(["#FF5F57","#FFBD2E","#28C840"] as const).map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>~/portfolio/sharad — bash</span>
      </div>
      {/* body */}
      <div style={{ padding: 28, fontFamily: "'JetBrains Mono',monospace", fontSize: 13, lineHeight: 1.85 }}>
        <div><span style={{ color: P.orange }}>&gt; whoami</span></div>
        <div style={{ paddingLeft: 16, color: "rgba(255,255,255,0.85)" }}>full_stack_engineer</div>
        <br />
        <div><span style={{ color: P.orange }}>&gt; cat stack.config</span></div>
        <div style={{ paddingLeft: 16, color: "rgba(255,255,255,0.85)" }}>{"{"}</div>
        {[
          ["frontend", '["React", "Next.js", "Tailwind"]'],
          ["backend",  '["Spring Boot", "Node.js", "GraphQL"]'],
          ["cloud",    '["AWS", "Docker", "Kubernetes"]'],
          ["ai",       '["LangChain", "RAG", "OpenAI"]'],
        ].map(([k, v]) => (
          <div key={k} style={{ paddingLeft: 32 }}>
            <span style={{ color: P.accent }}>{k}</span>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>: {v},</span>
          </div>
        ))}
        <div style={{ paddingLeft: 16, color: "rgba(255,255,255,0.85)" }}>{"}"}</div>
        <br />
        <div><span style={{ color: P.orange }}>&gt; uptime</span></div>
        <div style={{ paddingLeft: 16, color: "rgba(255,255,255,0.85)" }}>
          4+ years <span style={{ color: "rgba(255,255,255,0.35)" }}>still_running ✓</span>
        </div>
        <br />
        <div><span style={{ color: P.orange }}>&gt; status</span></div>
        <div style={{ paddingLeft: 16, color: "rgba(255,255,255,0.85)" }}>
          open_to_opportunities: <span style={{ color: P.accent }}>true</span>
          <span style={{ animation: "blink 0.8s step-end infinite", marginLeft: 4, fontWeight: 700 }}>|</span>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}

function SpecPill({ name }: { name: string }) {
  const [hov, setHov] = useState(false);
  return (
    <span onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 600,
        padding: "5px 14px", borderRadius: 4,
        background: hov ? P.accent : P.pillBg,
        color: hov ? P.bg : P.cream,
        border: `1px solid ${hov ? P.accent : "rgba(255,214,0,0.2)"}`,
        transform: hov ? "scale(1.06)" : "scale(1)",
        transition: "all 0.2s ease", cursor: "default",
      }}>
      {name}
    </span>
  );
}

export default function About() {
  const headRef  = useRef<HTMLHeadingElement>(null);
  const bioRef   = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    const pairs: [React.RefObject<HTMLElement | null>, () => void][] = [
      [headRef,  () => { if (headRef.current)  { headRef.current.style.transform  = "translateX(0)"; headRef.current.style.opacity  = "1"; }}],
      [bioRef,   () => { if (bioRef.current)   { bioRef.current.style.transform   = "translateY(0)"; bioRef.current.style.opacity   = "1"; }}],
      [statsRef, () => setStatsVisible(true)],
      [panelRef, () => setPanelVisible(true)],
    ];
    const obs = pairs.map(([ref, cb]) => {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { cb(); o.disconnect(); } }, { threshold: 0.15 });
      if (ref.current) o.observe(ref.current);
      return o;
    });
    const factEls = factsRef.current?.querySelectorAll<HTMLElement>(".fact-item");
    const fo = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        factEls?.forEach((el, i) => setTimeout(() => { el.style.transform = "translateX(0)"; el.style.opacity = "1"; }, i * 100));
        fo.disconnect();
      }
    }, { threshold: 0.2 });
    if (factsRef.current) fo.observe(factsRef.current);
    return () => { obs.forEach(o => o.disconnect()); fo.disconnect(); };
  }, []);

  const years = useCountUp(4, 1200, statsVisible);

  return (
    <section id="about" className="relative overflow-hidden cursor-none" style={{ background: P.bg }}>
      <div style={{ height: 20, background: "linear-gradient(90deg,#FF6B00,#FFD600)" }} />

      {/* Morphing blob */}
      <div style={{ position: "absolute", top: "-5%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: P.accent, opacity: 0.07, filter: "blur(90px)", pointerEvents: "none", animation: "morphBlob 12s ease-in-out infinite" }} />

      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(rgba(255,214,0,0.06) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />

      <style>{`@keyframes morphBlob{0%,100%{border-radius:40% 60% 70% 30%;transform:rotate(0deg)}33%{border-radius:60% 40% 30% 70%;transform:rotate(45deg)}66%{border-radius:30% 70% 50% 50%;transform:rotate(90deg)}}`}</style>

      <CursorConstellation />

      <div className="max-w-7xl mx-auto px-8 md:px-14 py-24 relative" style={{ zIndex: 10 }}>
        {/* Ticker */}
        <div style={{ position: "absolute", top: 24, left: -8, fontSize: "clamp(6rem,14vw,14rem)", fontWeight: 900, lineHeight: 1, fontFamily: "'Clash Display',sans-serif", color: "rgba(255,214,0,0.06)", pointerEvents: "none", userSelect: "none" }}>01</div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)", gap: "clamp(32px,5vw,80px)", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: P.orange, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{"// about.me"}</p>

            <h2 ref={headRef} style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(2.25rem,5vw,3.5rem)", fontWeight: 700, color: P.cream, lineHeight: 1.1, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: 28, transform: "translateX(-60px)", opacity: 0, transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease" }}>
              I Build Things<br />That <span style={{ color: P.accent }}>Matter.</span>
            </h2>

            <p ref={bioRef} style={{ fontFamily: "'Satoshi',sans-serif", fontSize: 16, color: `${P.cream}CC`, lineHeight: 1.8, maxWidth: 480, marginBottom: 40, transform: "translateY(20px)", opacity: 0, transition: "transform 0.6s ease 0.2s, opacity 0.5s ease 0.2s" }}>
              I&apos;m a Software Engineer with 4+ years of experience building full-stack systems across healthcare, fintech, and supply chain. Passionate about building tech that makes a real impact.
            </p>

            {/* Stats */}
            <div ref={statsRef} style={{ display: "flex", alignItems: "stretch", borderRadius: 8, overflow: "hidden", marginBottom: 40, maxWidth: 520, border: "1px solid rgba(255,214,0,0.15)" }}>
              {[
                { number: `${years}+`, label: "Years of Experience" },
                { number: "3",          label: "Industries Impacted" },
                { number: "Full-Stack", label: "Primary Specialization" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, padding: "20px 12px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,214,0,0.15)" : "none", background: P.surface }}>
                  <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 28, fontWeight: 700, color: P.accent, lineHeight: 1, marginBottom: 6 }}>{s.number}</div>
                  <div style={{ fontFamily: "'Satoshi',sans-serif", fontSize: 11, color: `${P.cream}80`, textTransform: "uppercase", letterSpacing: "1.5px" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Specialisations */}
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: P.orange, marginBottom: 12, fontWeight: 600 }}>&gt; specializes_in:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Full-Stack Development","Distributed Systems","Cloud Infrastructure","AI & LLMs"].map(s => <SpecPill key={s} name={s} />)}
              </div>
            </div>

            {/* Fun facts */}
            <div ref={factsRef} style={{ marginBottom: 44 }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: P.orange, marginBottom: 12, fontWeight: 600 }}>&gt; fun_facts[]:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Coffee + code = most of my productive hours.","Always exploring cloud, distributed systems & AI.","Good code is readable first, clever second."].map((f, i) => (
                  <div key={i} className="fact-item" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: `${P.cream}BF`, display: "flex", gap: 10, alignItems: "flex-start", transform: "translateX(-20px)", opacity: 0, transition: "transform 0.4s ease, opacity 0.4s ease" }}>
                    <span style={{ color: P.accent, flexShrink: 0, marginTop: 1 }}>→</span>{f}
                  </div>
                ))}
              </div>
            </div>

            <MagneticCTA />
          </div>

          {/* RIGHT — offset 40px down */}
          <div ref={panelRef} style={{ paddingTop: 40 }}>
            <TerminalPanel visible={panelVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}
