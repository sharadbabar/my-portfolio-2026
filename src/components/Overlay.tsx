"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Stage 1: Name + Title (0% to 10%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.14], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.14], [0, 0, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.1, 0.14], [1, 1, 0.95]);
  const visibility1 = useTransform(scrollYProgress, (latest) => (latest < 0.14 ? "visible" : "hidden"));

  // Stage 2: First Tagline (10% to 35%)
  const opacity2 = useTransform(scrollYProgress, [0, 0.1, 0.14, 0.35, 0.38, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(scrollYProgress, [0, 0.1, 0.14, 0.35, 0.38], [50, 50, 0, 0, -50]);
  const visibility2 = useTransform(scrollYProgress, (latest) => (latest >= 0.14 && latest < 0.38 ? "visible" : "hidden"));

  // Stage 3: Second Tagline (35% to 100%)
  const opacity3 = useTransform(scrollYProgress, [0, 0.38, 0.41, 1], [0, 0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0, 0.38, 0.41, 1], [50, 50, 0, 0]);
  const visibility3 = useTransform(scrollYProgress, (latest) => (latest >= 0.38 ? "visible" : "hidden"));

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pointer-events-none relative z-10 text-white p-8 md:p-24 overflow-hidden">

      {/* Stage 1: Center + Lower Position */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1, visibility: visibility1 }}
        className="absolute inset-0 flex items-center justify-center p-8 mt-[35vh]"
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-[8vw] font-bold tracking-tighter mb-4 drop-shadow-2xl">
            Sharad Babar.
          </h1>
          <p className="text-xl md:text-3xl font-light text-zinc-300 drop-shadow-md tracking-wide">
            Software Engineer.
          </p>
        </div>
      </motion.div>

      {/* Stage 2: Center (or Left) Primary Tagline */}
      <motion.div
        style={{ opacity: opacity2, y: y2, visibility: visibility2 }}
        className="absolute inset-0 flex items-center justify-start max-w-7xl mx-auto px-8 w-full"
      >
        <div className="text-left max-w-3xl">
          <h2 className="text-4xl md:text-[6vw] font-bold tracking-tighter mb-4 drop-shadow-2xl leading-[1.1]">
            I build where<br />imagination compiles.
          </h2>
        </div>
      </motion.div>

      {/* Stage 3: Right Secondary Tagline */}
      <motion.div
        style={{ opacity: opacity3, y: y3, visibility: visibility3 }}
        className="absolute inset-0 flex items-center justify-end max-w-7xl mx-auto px-8 w-full"
      >
        <div className="text-right max-w-3xl">
          <h2 className="text-4xl md:text-[6vw] font-bold tracking-tighter mb-4 drop-shadow-2xl leading-[1.1]">
            Bridging design<br />and engineering.
          </h2>
        </div>
      </motion.div>

    </div>
  );
}
