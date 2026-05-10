'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Layered illustrated hero scene with parallax — adapted from Kukenam reference,
 * styled for HGT's warm/clinical brand (cream + teal + sage + peach sun).
 *
 * Layers (back → front):
 *   1. Sky gradient (cream → sage)
 *   2. Sun (peach circle, top right)
 *   3. Distant hills (light teal)
 *   4. Mid hills (teal)
 *   5. Foreground grass/plants (deep teal)
 *
 * Each layer translates at a different rate as user scrolls.
 */
export default function HeroScene() {
  const { scrollY } = useScroll();

  // Parallax: deeper layers move less
  const sunY = useTransform(scrollY, [0, 800], [0, 60]);
  const hillsBackY = useTransform(scrollY, [0, 800], [0, 90]);
  const hillsMidY = useTransform(scrollY, [0, 800], [0, 130]);
  const foregroundY = useTransform(scrollY, [0, 800], [0, 180]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* SKY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-sage to-sage/40" />

      {/* SUBTLE STAR TWINKLES (very faint dots) */}
      <div className="absolute inset-0 opacity-30" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-teal/40"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 60}%`,
            }}
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* SUN (peach circle, top right) — slow parallax + breathe */}
      <motion.div
        style={{ y: sunY }}
        className="absolute top-[8%] right-[8%] sm:right-[12%]"
        aria-hidden
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Sun glow */}
          <div className="absolute inset-0 -m-12 rounded-full bg-coral/30 blur-3xl" />
          <div className="absolute inset-0 -m-6 rounded-full bg-coral/40 blur-2xl" />
          {/* Sun body */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-coral-light via-coral to-coral-dark shadow-2xl shadow-coral/40" />
        </motion.div>
      </motion.div>

      {/* DISTANT HILLS (back layer, lightest teal) */}
      <motion.svg
        style={{ y: hillsBackY }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-[18%] left-0 w-full h-[28%] sm:h-[35%]"
        aria-hidden
      >
        <defs>
          <linearGradient id="hillBack" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5FB8A8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5FB8A8" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          fill="url(#hillBack)"
          d="M0,160 C120,100 240,200 360,140 C480,80 600,180 720,120 C840,60 960,160 1080,100 C1200,40 1320,140 1440,80 L1440,320 L0,320 Z"
        />
      </motion.svg>

      {/* MID HILLS */}
      <motion.svg
        style={{ y: hillsMidY }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-[10%] left-0 w-full h-[26%] sm:h-[32%]"
        aria-hidden
      >
        <defs>
          <linearGradient id="hillMid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2C9B8A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2C9B8A" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          fill="url(#hillMid)"
          d="M0,200 C160,120 320,240 480,160 C640,80 800,220 960,140 C1120,60 1280,200 1440,120 L1440,320 L0,320 Z"
        />
      </motion.svg>

      {/* FOREGROUND — deep teal hill + plants */}
      <motion.div style={{ y: foregroundY }} className="absolute bottom-0 left-0 right-0">
        {/* Deep hill */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-[180px] sm:h-[260px]"
          aria-hidden
        >
          <path
            fill="#1F7D6E"
            d="M0,260 C120,180 280,300 440,220 C600,140 760,280 920,200 C1080,120 1240,260 1440,180 L1440,320 L0,320 Z"
          />
        </svg>

        {/* Decorative leaves/plants silhouette overlay */}
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-[80px] sm:h-[120px] -mt-16 sm:-mt-24"
          aria-hidden
        >
          {/* Leafy tufts */}
          {[100, 280, 480, 680, 880, 1080, 1280].map((x, i) => (
            <g key={i} transform={`translate(${x}, 80)`}>
              <ellipse cx="0" cy="40" rx="40" ry="50" fill="#1F7D6E" opacity="0.85" />
              <ellipse cx="-15" cy="30" rx="22" ry="45" fill="#1F7D6E" opacity="0.85" transform="rotate(-15)" />
              <ellipse cx="15" cy="30" rx="22" ry="45" fill="#1F7D6E" opacity="0.85" transform="rotate(15)" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* SOFT VIGNETTE TO DARKEN BOTTOM SLIGHTLY (depth) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/5 pointer-events-none" />
    </div>
  );
}
