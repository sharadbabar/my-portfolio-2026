"use client";

import { useState, useRef } from "react";
import CursorConstellation from "./CursorConstellation";

const PALETTE = {
  contactBg: "#0D0D0D",
  accent: "#FFD600",
  orange: "#FF6B00",
  cream: "#FFFBF0",
} as const;

const socialLinks = [
  { name: "sharad.b@mycvscout.com", href: "mailto:sharad.b@mycvscout.com" },
  { name: "LinkedIn", href: "https://linkedin.com/in/sharadbabar10" },
  { name: "GitHub", href: "https://github.com/sharadbabar" },
];

function MagneticBtn({ children, type = "button", onClick, disabled }: {
  children: React.ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = ((e.clientX - left - width / 2) / (width / 2)) * 12;
    const y = ((e.clientY - top - height / 2) / (height / 2)) * 12;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <button ref={ref} type={type} disabled={disabled} onClick={onClick}
      onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      {children}
    </button>
  );
}

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => {
      setState("sent");
      setTimeout(() => setState("idle"), 3500);
    }, 1200);
  };

  return (
    <section id="contact" className="relative overflow-hidden cursor-none" style={{ background: PALETTE.contactBg }}>
      {/* Divider from previous cream section */}
      <div className="w-full h-5" style={{ background: "linear-gradient(90deg,#FF6B00,#FFD600)" }} />

      {/* Dot grid (subtle on dark) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(${PALETTE.accent}09 1.5px, transparent 1.5px)`,
        backgroundSize: "28px 28px",
      }} />

      <CursorConstellation />

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-28 relative z-10">
        {/* Ticker */}
        <div className="absolute top-8 right-0 text-[10rem] md:text-[14rem] font-bold select-none pointer-events-none leading-none overflow-hidden"
          style={{ color: `${PALETTE.accent}09`, fontFamily: "'Clash Display',sans-serif" }}>05</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: heading + contact links */}
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9]"
              style={{
                fontFamily: "'Clash Display',sans-serif", color: PALETTE.cream,
                textTransform: "uppercase", letterSpacing: "-0.02em",
              }}>
              Let&apos;s Build Something.
            </h2>
            <p className="text-lg mb-12" style={{ fontFamily: "'Satoshi',sans-serif", color: `${PALETTE.cream}80` }}>
              Open to full-time roles and compelling freelance opportunities.
            </p>

            <div className="flex flex-col gap-4">
              {socialLinks.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-6 py-3 w-fit transition-all duration-250"
                  style={{
                    border: `1px solid ${PALETTE.accent}50`,
                    background: `${PALETTE.accent}10`,
                    borderRadius: 0,
                    fontFamily: "'JetBrains Mono',monospace",
                    color: PALETTE.accent,
                    fontWeight: 700,
                    fontSize: "0.875rem",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = PALETTE.accent;
                    (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
                    (e.currentTarget as HTMLElement).style.borderColor = PALETTE.accent;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = `${PALETTE.accent}10`;
                    (e.currentTarget as HTMLElement).style.color = PALETTE.accent;
                    (e.currentTarget as HTMLElement).style.borderColor = `${PALETTE.accent}50`;
                  }}
                >
                  → {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
              { id: "name", label: "Name", type: "text", placeholder: "John Doe" },
              { id: "email", label: "Email", type: "email", placeholder: "john@example.com" },
            ].map(field => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <label htmlFor={field.id} style={{ fontFamily: "'JetBrains Mono',monospace", color: `${PALETTE.cream}60`, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                  {field.label}
                </label>
                <input id={field.id} type={field.type} required placeholder={field.placeholder}
                  className="w-full px-5 py-4 outline-none text-base transition-all duration-250"
                  style={{
                    fontFamily: "'Satoshi',sans-serif", color: PALETTE.cream,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,214,0,0.25)",
                    borderRadius: 0,
                  }}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,214,0,0.6)"; (e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(255,214,0,0.1)"; }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,214,0,0.25)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" style={{ fontFamily: "'JetBrains Mono',monospace", color: `${PALETTE.cream}60`, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                Message
              </label>
              <textarea id="message" required rows={5} placeholder="Tell me about your project..."
                className="w-full px-5 py-4 outline-none text-base resize-none transition-all duration-250"
                style={{
                  fontFamily: "'Satoshi',sans-serif", color: PALETTE.cream,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,214,0,0.25)",
                  borderRadius: 0,
                }}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,214,0,0.6)"; (e.target as HTMLElement).style.boxShadow = "0 0 20px rgba(255,214,0,0.1)"; }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,214,0,0.25)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
              />
            </div>

            <MagneticBtn type="submit" disabled={state !== "idle"}>
              <div
                className="w-full px-10 py-5 text-sm font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden text-center"
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  background: state === "sent" ? PALETTE.orange : PALETTE.contactBg,
                  color: state === "sent" ? "#fff" : PALETTE.accent,
                  border: `2px solid ${state === "sent" ? PALETTE.orange : PALETTE.accent}`,
                  borderRadius: 0,
                  cursor: state === "idle" ? "pointer" : "default",
                }}
              >
                {state === "idle" && "Send Message →"}
                {state === "sending" && <span className="animate-pulse">Sending...</span>}
                {state === "sent" && <span style={{ color: "#fff" }}>✓ Sent!</span>}
              </div>
            </MagneticBtn>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-28 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest"
          style={{
            fontFamily: "'JetBrains Mono',monospace", color: `${PALETTE.cream}30`,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
          <span>© {new Date().getFullYear()} Sharad Babar</span>
          <span>Built with Next.js & Framer Motion</span>
        </div>
      </div>
    </section>
  );
}
