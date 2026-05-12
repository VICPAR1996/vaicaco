import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Botanical line SVG decorations drawn inline as SVG paths
function BotanicalLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left botanical branch */}
      <g opacity="0.12" stroke="#C9A84C" strokeWidth="0.8">
        <path d="M-40 600 Q 80 500 120 350 Q 160 200 100 80" />
        <path d="M120 350 Q 60 320 20 280" />
        <path d="M120 350 Q 90 290 110 240" />
        <path d="M100 200 Q 50 180 30 140" />
        <path d="M100 200 Q 130 170 120 130" />
        {/* Leaf shapes */}
        <ellipse cx="20" cy="280" rx="22" ry="10" transform="rotate(-40 20 280)" />
        <ellipse cx="110" cy="240" rx="18" ry="8" transform="rotate(20 110 240)" />
        <ellipse cx="30" cy="140" rx="20" ry="9" transform="rotate(-50 30 140)" />
        <ellipse cx="120" cy="130" rx="16" ry="7" transform="rotate(30 120 130)" />
        {/* Small berries */}
        <circle cx="25" cy="280" r="3" />
        <circle cx="115" cy="240" r="2.5" />
      </g>

      {/* Right botanical branch */}
      <g opacity="0.12" stroke="#C9A84C" strokeWidth="0.8">
        <path d="M1480 700 Q 1360 600 1320 450 Q 1280 300 1340 160" />
        <path d="M1320 450 Q 1380 420 1420 380" />
        <path d="M1320 450 Q 1350 390 1330 340" />
        <path d="M1340 260 Q 1390 240 1410 200" />
        <path d="M1340 260 Q 1310 230 1320 190" />
        <ellipse cx="1420" cy="380" rx="22" ry="10" transform="rotate(40 1420 380)" />
        <ellipse cx="1330" cy="340" rx="18" ry="8" transform="rotate(-20 1330 340)" />
        <ellipse cx="1410" cy="200" rx="20" ry="9" transform="rotate(50 1410 200)" />
        <ellipse cx="1320" cy="190" rx="16" ry="7" transform="rotate(-30 1320 190)" />
        <circle cx="1415" cy="380" r="3" />
        <circle cx="1325" cy="340" r="2.5" />
      </g>

      {/* Bottom center botanical flourish */}
      <g opacity="0.08" stroke="#C9A84C" strokeWidth="0.6">
        <path d="M720 900 Q 720 820 720 780" />
        <path d="M720 820 Q 680 800 650 770" />
        <path d="M720 820 Q 760 800 790 770" />
        <ellipse cx="650" cy="770" rx="20" ry="8" transform="rotate(-30 650 770)" />
        <ellipse cx="790" cy="770" rx="20" ry="8" transform="rotate(30 790 770)" />
      </g>

      {/* Scattered dots — spore-like texture */}
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          cx={100 + i * 65 + (i % 3) * 20}
          cy={120 + (i % 5) * 140}
          r="1"
          fill="#C9A84C"
          opacity={0.06 + (i % 4) * 0.02}
        />
      ))}
    </svg>
  )
}

// Animated grain/noise overlay for cinematic texture
function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px',
        opacity: 0.4,
      }}
    />
  )
}

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.8 },
  },
}
const letter = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1A0A00 0%, #0D0603 55%, #080402 100%)',
      }}
    >
      <BotanicalLines />
      <GrainOverlay />

      {/* Radial gold glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Origin label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="section-label mb-10"
        >
          Colombia · Single Origin
        </motion.div>

        {/* Gold divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="gold-line mx-auto mb-10"
        />

        {/* Main title — animated word by word */}
        <motion.h1
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="cinematic-text text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[1.1] tracking-wide text-[#F5F0E8] mb-8"
        >
          {'Colombian Origins,'.split('').map((char, i) => (
            <motion.span key={i} variants={letter}>
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
          <br />
          <motion.span
            variants={letter}
            className="italic text-[#E0D0B0]"
          >
            {'Crafted for the Rare Palate'.split('').map((char, i) => (
              <motion.span key={i} variants={letter}>
                {char === ' ' ? ' ' : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-[#C9A898] font-light text-[clamp(1rem,2vw,1.35rem)] tracking-wide max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Coffee, cacao and vanilla from selected Colombian terroirs.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <span className="section-label text-[0.6rem]">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent"
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0D0603)',
        }}
      />
    </section>
  )
}
