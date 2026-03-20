"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #FF6B00, #FFD600)",
        zIndex: 200,
      }}
    />
  );
}
