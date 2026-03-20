"use client";

import { useEffect, useRef } from "react";

export default function CursorConstellation() {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable entirely on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const bgCanvas = bgRef.current;
    const curCanvas = cursorRef.current;
    if (!bgCanvas || !curCanvas) return;
    const parent = bgCanvas.parentElement;
    if (!parent) return;

    const bgCtx = bgCanvas.getContext("2d")!;
    const crCtx = curCanvas.getContext("2d")!;

    let W = parent.clientWidth;
    let H = parent.clientHeight;

    const setup = () => {
      W = parent.clientWidth;
      H = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      bgCanvas.width = curCanvas.width = W * dpr;
      bgCanvas.height = curCanvas.height = H * dpr;
      bgCtx.scale(dpr, dpr);
      crCtx.scale(dpr, dpr);
    };
    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(parent);

    const DOTS = Array.from({ length: 90 }, () => {
      const x = Math.random() * W;
      const y = Math.random() * H;
      return { x, y, bx: x, by: y, r: 0.4 + Math.random() * 1.6, a: 0.2 + Math.random() * 0.5, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 };
    });

    const mouse = { x: -1000, y: -1000, on: false };
    let trail: { x: number; y: number }[] = [];
    let raf: number;

    const onEnter = () => { mouse.on = true; };
    const onLeave = () => { mouse.on = false; };
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    parent.addEventListener("mousemove", onMove);

    const loop = () => {
      bgCtx.clearRect(0, 0, W, H);
      crCtx.clearRect(0, 0, W, H);

      DOTS.forEach(d => {
        d.bx += d.vx; d.by += d.vy;
        if (d.bx < -50) d.bx = W + 50; if (d.bx > W + 50) d.bx = -50;
        if (d.by < -50) d.by = H + 50; if (d.by > H + 50) d.by = -50;
        let tx = d.bx, ty = d.by;
        if (mouse.on) {
          const dx = mouse.x - d.bx, dy = mouse.y - d.by;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) { const p = 0.22 * (1 - dist / 120); tx += dx * p; ty += dy * p; }
        }
        d.x += (tx - d.x) * 0.15;
        d.y += (ty - d.y) * 0.15;
      });

      bgCtx.lineWidth = 1;
      for (let i = 0; i < DOTS.length; i++) for (let j = i + 1; j < DOTS.length; j++) {
        const dist = Math.hypot(DOTS[i].x - DOTS[j].x, DOTS[i].y - DOTS[j].y);
        if (dist < 80) {
          bgCtx.strokeStyle = `rgba(255,214,0,${0.18 * (1 - dist / 80)})`;
          bgCtx.beginPath(); bgCtx.moveTo(DOTS[i].x, DOTS[i].y); bgCtx.lineTo(DOTS[j].x, DOTS[j].y); bgCtx.stroke();
        }
      }

      DOTS.forEach(d => {
        bgCtx.fillStyle = `rgba(255,214,0,${d.a})`;
        bgCtx.beginPath(); bgCtx.arc(d.x, d.y, d.r, 0, Math.PI * 2); bgCtx.fill();
      });

      if (mouse.on) {
        DOTS.forEach(d => {
          const dist = Math.hypot(mouse.x - d.x, mouse.y - d.y);
          if (dist < 110) {
            bgCtx.strokeStyle = `rgba(255,214,0,${0.35 * (1 - dist / 110)})`;
            bgCtx.beginPath(); bgCtx.moveTo(mouse.x, mouse.y); bgCtx.lineTo(d.x, d.y); bgCtx.stroke();
          }
        });
        trail.push({ x: mouse.x, y: mouse.y });
        if (trail.length > 28) trail.shift();
      } else {
        if (trail.length > 0) trail.shift();
      }

      trail.forEach((p, i) => {
        const prog = i / trail.length;
        crCtx.fillStyle = `rgba(255,214,0,${prog * 0.6})`;
        crCtx.beginPath(); crCtx.arc(p.x, p.y, 1 + prog * 3, 0, Math.PI * 2); crCtx.fill();
      });

      if (mouse.on) {
        // Solid 5px orange tip
        crCtx.fillStyle = "#FF6B00";
        crCtx.beginPath(); crCtx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2); crCtx.fill();
        // 14px outer ring at 35% opacity
        crCtx.strokeStyle = "rgba(255,107,0,0.35)";
        crCtx.lineWidth = 1.5;
        crCtx.beginPath(); crCtx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2); crCtx.stroke();
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      parent.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
      <canvas ref={cursorRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 50 }} />
    </>
  );
}
