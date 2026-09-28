import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export interface ScrollJourneyLineProps {
  className?: string;
}

export function ScrollJourneyLine({ className = "" }: ScrollJourneyLineProps) {
  // Track scroll progress of the page (0 to 1)
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress with spring physics
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`fixed inset-y-0 right-4 md:right-10 z-40 pointer-events-none w-6 h-full flex items-center justify-center ${className}`}>
      <svg 
        className="w-full h-full" 
        viewBox="0 0 24 1000" 
        preserveAspectRatio="none" 
        fill="none"
      >
        {/* Faint Background Track Line */}
        <line 
          x1="12" 
          y1="0" 
          x2="12" 
          y2="1000" 
          stroke="rgba(255, 255, 255, 0.08)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />

        {/* Animated Self-Drawing Crimson Journey Line */}
        <motion.path
          d="M 12 0 L 12 1000"
          stroke="#ef233c"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ 
            pathLength: pathLength
          }}
        />
      </svg>

      {/* Floating Scroll Percentage Indicator */}
      <motion.div 
        className="absolute top-1/2 right-7 transform -translate-y-1/2 bg-black/80 border border-white/10 text-[10px] font-mono font-bold text-red-400 px-2 py-1 rounded-full shadow-lg backdrop-blur-md hidden md:flex items-center gap-1"
        style={{
          opacity: scrollYProgress
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ef233c] animate-pulse" />
        JOURNEY
      </motion.div>
    </div>
  );
}

export default ScrollJourneyLine;
