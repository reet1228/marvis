import React, { useMemo } from 'react';

export interface ParallaxStarsBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
}

const generateBoxShadows = (n: number) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

export function ParallaxStarsBackground({
  children,
  className = "",
  speed = 1
}: ParallaxStarsBackgroundProps) {
  // Memoize shadows so they don't regenerate on re-renders
  const shadowsSmall = useMemo(() => generateBoxShadows(700), []);
  const shadowsMedium = useMemo(() => generateBoxShadows(200), []);
  const shadowsBig = useMemo(() => generateBoxShadows(100), []);

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Red Noir Dark Space Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0505] via-black to-black" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]" />

      {/* Stars Layer 1 (Small - 1px) */}
      <div 
        className="absolute left-0 top-0 w-[1px] h-[1px] bg-transparent opacity-60 animate-[animStar_50s_linear_infinite]"
        style={{ 
          boxShadow: shadowsSmall,
          animationDuration: `${50 / speed}s`
        }}
      >
        <div 
          className="absolute top-[2000px] w-[1px] h-[1px] bg-transparent"
          style={{ boxShadow: shadowsSmall }}
        />
      </div>

      {/* Stars Layer 2 (Medium - 2px) */}
      <div 
        className="absolute left-0 top-0 w-[2px] h-[2px] bg-transparent opacity-75 animate-[animStar_100s_linear_infinite]"
        style={{ 
          boxShadow: shadowsMedium,
          animationDuration: `${100 / speed}s`
        }}
      >
        <div 
          className="absolute top-[2000px] w-[2px] h-[2px] bg-transparent"
          style={{ boxShadow: shadowsMedium }}
        />
      </div>

      {/* Stars Layer 3 (Big - 3px) */}
      <div 
        className="absolute left-0 top-0 w-[3px] h-[3px] bg-transparent opacity-90 animate-[animStar_150s_linear_infinite]"
        style={{ 
          boxShadow: shadowsBig,
          animationDuration: `${150 / speed}s`
        }}
      >
        <div 
          className="absolute top-[2000px] w-[3px] h-[3px] bg-transparent"
          style={{ boxShadow: shadowsBig }}
        />
      </div>

      {children}
    </div>
  );
}

export default ParallaxStarsBackground;
