import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ScrollWeightSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"]
  });

  // Smooth out the scroll progress using spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  // Map progress (0 to 1) continuously from Light (300) to Extra Bold (800)
  const fontWeightMotion = useTransform(smoothProgress, [0, 1], [300, 800]);

  // Real-time weight number for display and variable font settings
  const [currentWeight, setCurrentWeight] = useState(300);

  useEffect(() => {
    const unsubscribe = fontWeightMotion.on("change", (latest) => {
      // Clamp between 300 and 800 and round to integer
      const clamped = Math.min(800, Math.max(300, Math.round(latest)));
      setCurrentWeight(clamped);
    });
    return () => unsubscribe();
  }, [fontWeightMotion]);

  // Weight label helper
  const getWeightLabel = (w: number) => {
    if (w < 380) return "Light (300)";
    if (w < 480) return "Regular (400)";
    if (w < 580) return "Medium (500)";
    if (w < 680) return "Semi Bold (600)";
    if (w < 780) return "Bold (700)";
    return "Extra Bold (800)";
  };

  return (
    <section 
      ref={containerRef} 
      className="py-28 md:py-40 px-6 border-y border-white/5 bg-zinc-950/80 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Header Badge with Dynamic Weight Counter */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-pulse"></span>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
            SCROLL-REACTIVE TYPOGRAPHY
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs font-mono font-bold text-[#ef233c] min-w-[130px] text-left">
            {getWeightLabel(currentWeight)}
          </span>
        </div>

        {/* Live Variable Font Weight Statement Headline */}
        <div className="my-6">
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white font-manrope leading-[1.12] transition-[letter-spacing] duration-200 select-none"
            style={{
              fontWeight: currentWeight,
              fontVariationSettings: `'wght' ${currentWeight}`
            }}
          >
            From quiet idea to{" "}
            <span className="text-[#ef233c]">commanding presence.</span>
          </motion.h2>
        </div>

        {/* Secondary Subtitle that also dynamically scales weight */}
        <motion.p
          className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mt-8 leading-relaxed font-inter"
          style={{
            fontWeight: Math.min(800, Math.max(300, Math.round(currentWeight * 0.85))),
            fontVariationSettings: `'wght' ${Math.min(800, Math.max(300, Math.round(currentWeight * 0.85)))}`
          }}
        >
          Connecting strategic execution directly to your business potential.
        </motion.p>

        {/* Dynamic Weight Progress Bar */}
        <div className="mt-14 max-w-md mx-auto">
          <div className="flex justify-between text-[11px] font-mono text-zinc-500 mb-2">
            <span>LIGHT 300</span>
            <span className="text-white font-bold">{currentWeight}</span>
            <span>EXTRA BOLD 800</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-zinc-500 via-[#ef233c] to-[#ef233c]"
              style={{
                width: `${((currentWeight - 300) / (800 - 300)) * 100}%`
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default ScrollWeightSection;
