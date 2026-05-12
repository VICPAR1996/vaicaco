import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ColombiaMap from './ColombiaMap'

const COFFEE_ORIGINS = [
  { id: 'sierra-nevada', name: 'Sierra Nevada', x: 62, y: 12,
    note: 'High altitude, snow-melt waters. Bright acidity, stone fruit finish.' },
  { id: 'huila', name: 'Huila', x: 43, y: 58,
    note: "Colombia's most decorated origin. Caramel sweetness, full body." },
  { id: 'narino', name: 'Nariño', x: 26, y: 70,
    note: 'Extreme altitude, volcanic soils. Citrus brightness, clean cup.' },
  { id: 'quindio', name: 'Quindío', x: 37, y: 50,
    note: 'Coffee triangle heartland. Balanced, chocolatey, classic Colombian.' },
  { id: 'tolima', name: 'Tolima', x: 41, y: 47,
    note: 'Isolated terroirs, complex microclimates. Floral and nuanced.' },
]

const ROAST_LEVELS = ['Light', 'Medium', 'Dark']

function getBeanColor(roast) {
  const light = { r: 188, g: 128, b: 65 }
  const dark = { r: 25, g: 10, b: 4 }
  const t = roast / 100
  return {
    fill: `rgb(${Math.round(light.r + (dark.r - light.r) * t)},${Math.round(light.g + (dark.g - light.g) * t)},${Math.round(light.b + (dark.b - light.b) * t)})`,
    highlight: `rgb(${Math.round(225 + (55 - 225) * t)},${Math.round(165 + (22 - 165) * t)},${Math.round(85 + (8 - 85) * t)})`,
    shadow: `rgb(${Math.round(105 + (10 - 105) * t)},${Math.round(68 + (4 - 68) * t)},${Math.round(30 + (2 - 30) * t)})`,
    glow: `rgba(${Math.round(188 + (25 - 188) * t)},${Math.round(128 + (10 - 128) * t)},${Math.round(65 + (4 - 65) * t)}, 0.55)`,
  }
}

// ─── SVG Coffee Bean ──────────────────────────────────────────────────────
function CoffeeBean({ roastValue }) {
  const c = getBeanColor(roastValue)
  return (
    <svg viewBox="0 0 160 220" fill="none" className="w-full max-w-[110px]">
      <defs>
        <radialGradient id="beanGrad" cx="38%" cy="35%" r="55%">
          <stop offset="0%" stopColor={c.highlight} stopOpacity="0.5" />
          <stop offset="100%" stopColor={c.fill} stopOpacity="0" />
        </radialGradient>
        <filter id="beanBlur">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Ambient glow — fixed warm base keeps bean visible at darkest roast */}
      <ellipse cx="80" cy="112" rx="50" ry="78"
        fill={c.glow} opacity="0.22" filter="url(#beanBlur)" />
      <ellipse cx="80" cy="112" rx="38" ry="62"
        fill="rgba(160,90,30,0.2)" filter="url(#beanBlur)" />

      {/* Shadow offset */}
      <ellipse cx="84" cy="116" rx="50" ry="76" fill={c.shadow} opacity="0.5" />

      {/* Bean body */}
      <ellipse cx="80" cy="112" rx="50" ry="76" fill={c.fill} />

      {/* Surface radial highlight */}
      <ellipse cx="80" cy="112" rx="50" ry="76" fill="url(#beanGrad)" />

      {/* Left highlight lobe */}
      <ellipse cx="60" cy="82" rx="15" ry="32" fill={c.highlight}
        opacity="0.3" transform="rotate(-12 60 82)" />

      {/* Central crease — the coffee bean characteristic line */}
      <path
        d="M80,38 C72,72 72,110 80,148 C88,110 88,72 80,38"
        fill={c.shadow} opacity="0.65"
      />
      {/* Crease highlight */}
      <path
        d="M80,42 C76,74 76,110 80,144"
        stroke={c.highlight} strokeWidth="1" opacity="0.18"
        strokeLinecap="round" fill="none"
      />
    </svg>
  )
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function CoffeeExperience() {
  const [roast, setRoast] = useState(38)
  const [quantity, setQuantity] = useState(250)
  const [origin, setOrigin] = useState('huila')

  const roastIndex = roast < 34 ? 0 : roast < 67 ? 1 : 2
  const activeOrigin = COFFEE_ORIGINS.find((o) => o.id === origin)
  const beanColors = getBeanColor(roast)

  return (
    <section
      id="coffee"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D0603 0%, #070E06 50%, #050B05 100%)',
      }}
    >
      <svg className="absolute top-20 left-0 w-80 opacity-[0.03] pointer-events-none"
        viewBox="0 0 400 400" fill="none">
        {[60, 90, 120, 150, 180].map((r) => (
          <circle key={r} cx="100" cy="200" r={r} stroke="#C9A84C" strokeWidth="0.5" />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-20">
            <div className="section-label mb-4">02 — Coffee</div>
            <div className="gold-line mb-6" />
            <h2 className="cinematic-text text-[clamp(2rem,5vw,4rem)] font-light text-[#F5F0E8] leading-tight max-w-lg">
              Single Origin<br />
              <span className="italic text-[#A8C898]">Colombian Coffee</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* ── Bean + roast + quantity ── */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center gap-12">
              <div className="relative flex items-center justify-center">
                {/* Outer diffuse bloom */}
                <div className="absolute pointer-events-none transition-all duration-700"
                  style={{
                    width: '280px', height: '310px',
                    background: `radial-gradient(ellipse, ${beanColors.glow} 0%, transparent 58%)`,
                    filter: 'blur(52px)',
                    opacity: 0.6,
                  }}
                />
                {/* Mid halo — roast-toned */}
                <div className="absolute pointer-events-none transition-all duration-700"
                  style={{
                    width: '180px', height: '210px',
                    background: `radial-gradient(ellipse, ${beanColors.glow} 0%, rgba(140,70,15,0.45) 45%, transparent 72%)`,
                    filter: 'blur(28px)',
                    opacity: 0.75,
                  }}
                />
                {/* Inner bright core — soft white-amber hotspot */}
                <div className="absolute pointer-events-none transition-all duration-500"
                  style={{
                    width: '110px', height: '130px',
                    background: `radial-gradient(ellipse, rgba(255,225,160,0.2) 0%, ${beanColors.glow} 40%, transparent 75%)`,
                    filter: 'blur(14px)',
                    opacity: 0.9,
                  }}
                />
                {/* Fixed warm floor — guarantees silhouette at full dark roast */}
                <div className="absolute pointer-events-none"
                  style={{
                    width: '200px', height: '230px',
                    background: 'radial-gradient(ellipse, rgba(130,70,15,0.3) 0%, transparent 65%)',
                    filter: 'blur(32px)',
                  }}
                />
                <CoffeeBean roastValue={roast} />
              </div>

              {/* Roast slider */}
              <div className="w-full max-w-xs">
                <div className="flex justify-between items-center mb-4">
                  <span className="section-label text-[0.6rem]">Light</span>
                  <motion.span
                    key={roastIndex}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#C9A84C] text-sm tracking-widest"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {ROAST_LEVELS[roastIndex]} Roast
                  </motion.span>
                  <span className="section-label text-[0.6rem]">Dark</span>
                </div>
                <input
                  type="range" min="0" max="100" value={roast}
                  onChange={(e) => setRoast(Number(e.target.value))}
                  className="w-full" aria-label="Roast level"
                />
                <div className="mt-3 h-px rounded-full"
                  style={{
                    background: `linear-gradient(to right,
                      ${getBeanColor(0).fill},
                      ${getBeanColor(50).fill},
                      ${getBeanColor(100).fill})`,
                  }}
                />
              </div>

              {/* Quantity */}
              <div className="w-full max-w-xs">
                <div className="section-label text-center mb-5">Quantity</div>
                <div className="flex items-center justify-center gap-3">
                  {[100, 250, 500, 1000].map((g) => (
                    <button
                      key={g}
                      onClick={() => setQuantity(g)}
                      className={`w-14 h-14 border text-sm transition-all duration-300 ${
                        quantity === g
                          ? 'border-[#C9A84C] text-[#C9A84C]'
                          : 'border-[#F5F0E8]/15 text-[#F5F0E8]/32 hover:border-[#F5F0E8]/35 hover:text-[#F5F0E8]/55'
                      }`}
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {g >= 1000 ? '1kg' : `${g}g`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Colombia dept map + origin info ── */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-8">
              <div className="section-label mb-0">Select Origin</div>

              <ColombiaMap
                origins={COFFEE_ORIGINS}
                selectedOrigin={origin}
                onSelect={setOrigin}
                accentColor="#C9A84C"
              />

              <motion.div
                key={origin}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-xs"
              >
                <div className="text-[#C9A84C] tracking-[0.25em] text-sm mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {activeOrigin?.name}
                </div>
                <p className="text-[#7A8E72] text-sm leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {activeOrigin?.note}
                </p>
              </motion.div>

              {/* Region pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {COFFEE_ORIGINS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOrigin(o.id)}
                    className={`px-3 py-1.5 text-[0.65rem] tracking-widest uppercase border transition-all duration-300 ${
                      origin === o.id
                        ? 'border-[#C9A84C] text-[#C9A84C]'
                        : 'border-[#F5F0E8]/12 text-[#F5F0E8]/32 hover:border-[#F5F0E8]/30 hover:text-[#F5F0E8]/55'
                    }`}
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {o.name}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050B05)' }} />
    </section>
  )
}
