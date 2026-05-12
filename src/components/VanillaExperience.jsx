import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ColombiaMap from './ColombiaMap'

const VANILLA_ORIGINS = [
  { id: 'sierra-nevada', name: 'Sierra Nevada', x: 62, y: 12,
    note: 'Mountain-grown vanilla. Delicate floral tones, woody base note.' },
  { id: 'amazonia', name: 'Amazonía', x: 65, y: 82,
    note: 'Dense tropical rainforest. Rich, creamy, intensely complex.' },
  { id: 'choco', name: 'Chocó', x: 13, y: 42,
    note: 'Pacific rainforest. Dark, smoky, raisin and rum undertones.' },
  { id: 'magdalena', name: 'Magdalena', x: 60, y: 18,
    note: 'Caribbean foothills. Fruity brightness, warm floral notes.' },
]

const MATURITY_LABELS = [
  { max: 25, label: 'Green · Fresh Harvest' },
  { max: 50, label: 'Early Cured' },
  { max: 78, label: 'Fully Cured' },
  { max: 100, label: 'Prime · Frosted' },
]

function getMaturityLabel(v) {
  return MATURITY_LABELS.find((l) => v <= l.max)?.label || MATURITY_LABELS[3].label
}

function getVanillaColors(maturity) {
  const green = { r: 88, g: 102, b: 38 }
  const cured = { r: 42, g: 22, b: 8 }
  const t = maturity / 100
  return {
    fill: `rgb(${Math.round(green.r + (cured.r - green.r) * t)},${Math.round(green.g + (cured.g - green.g) * t)},${Math.round(green.b + (cured.b - green.b) * t)})`,
    highlight: `rgb(${Math.round(135 + (78 - 135) * t)},${Math.round(152 + (48 - 152) * t)},${Math.round(58 + (18 - 58) * t)})`,
    shadow: `rgb(${Math.round(48 + (16 - 48) * t)},${Math.round(58 + (9 - 58) * t)},${Math.round(18 + (3 - 18) * t)})`,
    bloomOpacity: Math.max(0, (maturity - 60) / 40) * 0.45,
    // Glow base that stays warm even at full dark
    glowR: Math.round(120 + (80 - 120) * t),
    glowG: Math.round(100 + (50 - 100) * t),
    glowB: Math.round(30 + (15 - 30) * t),
  }
}

// ─── SVG Vanilla Pod ──────────────────────────────────────────────────────
function VanillaPod({ maturity }) {
  const c = getVanillaColors(maturity)

  // The pod has a slight natural curve
  const podPath = `
    M 40,22
    C 46,26 50,42 51,65
    C 52,88 51,115 50,140
    C 49,162 46,180 42,196
    C 40,200 39,202 40,204
    C 41,202 42,200 44,196
    C 48,180 51,162 52,140
    C 53,115 54,88 53,65
    C 52,42 48,26 42,22 Z
  `
  const podBody = `
    M 40,22
    C 46,26 50,42 51,65
    C 52,88 51,115 50,140
    C 49,162 46,180 42,196
    C 40,202 38,202 36,196
    C 32,180 29,162 28,140
    C 27,115 26,88 27,65
    C 28,42 32,26 38,22 Z
  `

  return (
    <motion.svg
      viewBox="0 0 80 225"
      fill="none"
      className="w-full max-w-[64px]"
    >
      <defs>
        <radialGradient id="vanillaGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={c.highlight} stopOpacity="0.55" />
          <stop offset="100%" stopColor={c.fill} stopOpacity="0" />
        </radialGradient>
        <filter id="vanillaBlur">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* ── Ambient glow — adapts to maturity but always warm ── */}
      <ellipse cx="40" cy="116" rx="28" ry="82"
        fill={`rgba(${c.glowR},${c.glowG},${c.glowB},0.28)`}
        filter="url(#vanillaBlur)" />
      {/* Fixed base warm light — keeps pod visible at maximum curing */}
      <ellipse cx="40" cy="116" rx="20" ry="65"
        fill="rgba(140,100,30,0.18)"
        filter="url(#vanillaBlur)" />

      {/* Shadow */}
      <path d={podBody} fill={c.shadow} opacity="0.5" transform="translate(3,4)" />

      {/* Main pod */}
      <path d={podBody} fill={c.fill} />

      {/* Surface gradient sheen */}
      <path d={podBody} fill="url(#vanillaGrad)" />

      {/* Highlight streak (left edge of pod surface) */}
      <path
        d="M 36,24 C 34,68 33,115 34,195"
        stroke={c.highlight}
        strokeWidth="1.5"
        opacity="0.32"
        strokeLinecap="round"
        fill="none"
      />
      {/* Subtle secondary highlight */}
      <path
        d="M 38,24 C 37,80 36,130 37,194"
        stroke={c.highlight}
        strokeWidth="0.8"
        opacity="0.15"
        strokeLinecap="round"
        fill="none"
      />

      {/* Natural longitudinal groove (vanilla beans have one central crease) */}
      <path
        d="M 40,24 C 40,80 40,135 40,196"
        stroke={c.shadow}
        strokeWidth="1.2"
        opacity="0.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bloom frost — crystalline vanillin deposits at high maturity */}
      {maturity > 60 && (
        <g opacity={c.bloomOpacity}>
          {[45, 68, 95, 125, 155, 178, 196].map((y, i) => (
            <circle key={i}
              cx={34 + (i % 3) * 5}
              cy={y}
              r="0.9"
              fill="#E8DEC8"
            />
          ))}
          {/* Extra frost specks at very high maturity */}
          {maturity > 85 && [55, 82, 108, 140, 168].map((y, i) => (
            <circle key={i}
              cx={42 + (i % 2) * 4}
              cy={y}
              r="0.7"
              fill="#F0E8D5"
            />
          ))}
        </g>
      )}

      {/* Stem */}
      <path d="M38,14 Q40,8 42,14 L44,22 L36,22 Z"
        fill={c.shadow} opacity="0.8" />
      <path d="M39,14 Q40,9 41,14"
        stroke={c.highlight} strokeWidth="0.8" opacity="0.5" fill="none" />

      {/* Tip */}
      <ellipse cx="40" cy="202" rx="4" ry="2.5"
        fill={c.shadow} opacity="0.6" />
    </motion.svg>
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

export default function VanillaExperience() {
  const [maturity, setMaturity] = useState(50)
  const [quantity, setQuantity] = useState(5)
  const [origin, setOrigin] = useState('amazonia')

  const activeOrigin = VANILLA_ORIGINS.find((o) => o.id === origin)
  const vc = getVanillaColors(maturity)

  return (
    <section
      id="vanilla"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050B05 0%, #0C0A04 50%, #090704 100%)',
      }}
    >
      <svg className="absolute bottom-20 right-0 w-96 opacity-[0.03] pointer-events-none"
        viewBox="0 0 400 400" fill="none">
        {[40, 80, 120, 160, 200].map((r) => (
          <circle key={r} cx="350" cy="300" r={r} stroke="#C9A84C" strokeWidth="0.5" />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-20">
            <div className="section-label mb-4">03 — Vanilla</div>
            <div className="gold-line mb-6" />
            <h2 className="cinematic-text text-[clamp(2rem,5vw,4rem)] font-light text-[#F5F0E8] leading-tight max-w-lg">
              Wild-Grown<br />
              <span className="italic text-[#D4C890]">Colombian Vanilla</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* ── Vanilla pod + controls ── */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center gap-12">
              <div className="relative flex items-center justify-center h-64">
                {/* Outer diffuse bloom — tall vertical halo matching pod shape */}
                <div className="absolute pointer-events-none transition-all duration-700"
                  style={{
                    width: '180px', height: '320px',
                    background: `radial-gradient(ellipse, rgba(${vc.glowR},${vc.glowG},${vc.glowB},0.7) 0%, transparent 58%)`,
                    filter: 'blur(50px)',
                    opacity: 0.55,
                  }}
                />
                {/* Mid halo — warm amber core */}
                <div className="absolute pointer-events-none transition-all duration-700"
                  style={{
                    width: '110px', height: '240px',
                    background: `radial-gradient(ellipse, rgba(${vc.glowR},${vc.glowG},${vc.glowB},0.9) 0%, rgba(120,90,20,0.4) 48%, transparent 72%)`,
                    filter: 'blur(26px)',
                    opacity: 0.75,
                  }}
                />
                {/* Inner bright core — the tight spotlight on the pod */}
                <div className="absolute pointer-events-none transition-all duration-500"
                  style={{
                    width: '65px', height: '190px',
                    background: `radial-gradient(ellipse, rgba(255,235,170,0.22) 0%, rgba(${vc.glowR},${vc.glowG},${vc.glowB},0.65) 40%, transparent 75%)`,
                    filter: 'blur(12px)',
                    opacity: 0.9,
                  }}
                />
                {/* Fixed warm floor — always on, keeps pod visible at darkest curing */}
                <div className="absolute pointer-events-none"
                  style={{
                    width: '130px', height: '260px',
                    background: 'radial-gradient(ellipse, rgba(120,95,25,0.32) 0%, transparent 65%)',
                    filter: 'blur(28px)',
                  }}
                />
                <VanillaPod maturity={maturity} />
              </div>

              {/* Maturity slider */}
              <div className="w-full max-w-xs">
                <div className="flex justify-between items-center mb-4">
                  <span className="section-label text-[0.6rem]">Green</span>
                  <motion.span
                    key={getMaturityLabel(maturity)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#C9A84C] text-sm tracking-widest text-center"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {getMaturityLabel(maturity)}
                  </motion.span>
                  <span className="section-label text-[0.6rem]">Prime</span>
                </div>
                <input
                  type="range" min="0" max="100" value={maturity}
                  onChange={(e) => setMaturity(Number(e.target.value))}
                  className="w-full" aria-label="Vanilla maturity"
                />
                <div className="mt-3 h-px rounded-full"
                  style={{
                    background: `linear-gradient(to right,
                      ${getVanillaColors(0).fill},
                      ${getVanillaColors(55).fill},
                      ${getVanillaColors(100).fill})`,
                  }}
                />
              </div>

              {/* Quantity */}
              <div className="w-full max-w-xs">
                <div className="section-label text-center mb-5">Quantity — Pods</div>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-[#F5F0E8]/18 text-[#F5F0E8]/45 hover:border-[#C9A84C]/55 hover:text-[#C9A84C] transition-all duration-300 text-lg"
                  >−</button>
                  <div className="text-center">
                    <div className="text-[#F5F0E8] text-2xl tracking-widest"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {quantity}
                    </div>
                    <div className="section-label text-[0.55rem] mt-1">pods</div>
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(20, quantity + 1))}
                    className="w-10 h-10 border border-[#F5F0E8]/18 text-[#F5F0E8]/45 hover:border-[#C9A84C]/55 hover:text-[#C9A84C] transition-all duration-300 text-lg"
                  >+</button>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Colombia dept map + origin info ── */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-8">
              <div className="section-label mb-0">Select Origin</div>

              <ColombiaMap
                origins={VANILLA_ORIGINS}
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
                <p className="text-[#8A8858] text-sm leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {activeOrigin?.note}
                </p>
              </motion.div>

              {/* Region pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                {VANILLA_ORIGINS.map((o) => (
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
        style={{ background: 'linear-gradient(to bottom, transparent, #090704)' }} />
    </section>
  )
}
