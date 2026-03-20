"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const numFrames = 192; // 0 to 191 frames available in public/sequence/

  // Preload sequence images
  useEffect(() => {
    const imagesArr: HTMLImageElement[] = [];
    
    for (let i = 0; i < numFrames; i++) {
      const img = new Image();
      // Format index like 000, 001, 002...
      const indexStr = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${indexStr}_delay-0.041s.png`;
      imagesArr.push(img);
    }
    setImages(imagesArr);
  }, []);

  // Frame Drawing Logic with Object-Fit: Cover algorithm
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha false can improve performance
    if (!ctx) return;
    
    const img = images[index];
    if (!img || !img.complete) return;
    
    // Scale for High DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Only resize canvas if its actual pixel size changed to prevent needless clearing
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    // Object-fit: cover math
    const hRatio = rect.width / img.width;
    const vRatio = rect.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (rect.width - img.width * ratio) / 2;
    const centerShift_y = (rect.height - img.height * ratio) / 2;

    // Draw the actual image
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Draw initial frame and set resize listeners
  useEffect(() => {
    if (images.length === 0) return;

    if (images[0].complete) {
      drawFrame(0);
    } else {
      images[0].onload = () => drawFrame(0);
    }
    
    const handleResize = () => {
      const latest = scrollYProgress.get();
      const frameIndex = Math.floor(latest * (numFrames - 1));
      drawFrame(Math.min(Math.max(frameIndex, 0), numFrames - 1));
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  // Sync scroll binding with canvas drawing via RAF
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    const frameIndex = Math.floor(latest * (numFrames - 1));
    const boundedIndex = Math.min(Math.max(frameIndex, 0), numFrames - 1);
    
    requestAnimationFrame(() => drawFrame(boundedIndex));
  });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The canvas overlay sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block object-cover"
        />
        
        {/* Black gradient overlay at bottom to smoothly fade into projects */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />
        
        {/* Parallax text layer */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
