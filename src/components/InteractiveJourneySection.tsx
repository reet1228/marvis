import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Compass, Code, Rocket } from 'lucide-react';

export function InteractiveJourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this specific section (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out scroll progress with spring physics
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001
  });

  const steps = [
    { no: "01", title: "DISCOVER", desc: "Understanding your vision, target audience, and business potential.", icon: Compass },
    { no: "02", title: "BUILD", desc: "Engineering high-performance web systems and AI creative workflows.", icon: Code },
    { no: "03", title: "SCALE", desc: "Launching strategic campaigns and continuously optimizing growth.", icon: Rocket }
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 relative border-t border-white/5 bg-zinc-950/60 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-ping"></span>
            SCROLL-DRIVEN DIGITAL JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white font-manrope mb-4">
            How Your Vision <span className="text-[#ef233c]">Moves Forward</span>
          </h2>
          <p className="text-zinc-400">
            As you scroll, watch our strategic execution path draw itself in real time.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {/* Animated SVG Connector Path overlay */}
          <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 200" fill="none">
              {/* Background trace line */}
              <path 
                d="M 160 100 C 350 20, 450 180, 840 100" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="2" 
                strokeDasharray="6 6"
              />
              {/* Self-drawing SVG line based on scroll */}
              <motion.path 
                d="M 160 100 C 350 20, 450 180, 840 100" 
                stroke="#ef233c" 
                strokeWidth="4" 
                strokeLinecap="round"
                style={{ 
                  pathLength
                }}
              />
            </svg>
          </div>

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div 
                key={step.no}
                className="relative z-10 p-8 border border-white/10 bg-black/80 backdrop-blur-xl rounded-2xl hover:border-[#ef233c]/50 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ef233c] group-hover:scale-110 transition-transform">
                      <IconComp size={24} />
                    </div>
                    <span className="text-xs font-mono text-red-400 font-bold">{step.no}</span>
                  </div>
                  <h3 className="text-xl font-bold font-manrope text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">
                  <span>STAGE 0{idx + 1}</span>
                  <ArrowRight size={14} className="text-[#ef233c]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default InteractiveJourneySection;
