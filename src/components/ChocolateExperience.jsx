import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CACAO_VARIETIES = [
  {
    id: 'criollo',
    label: 'Criollo',
    podColor: '#7B3F2E',
    podHighlight: '#C4744E',
    podShadow: '#3D1A0C',
    ribColor: '#5C2A14',
    note: 'The rarest. Floral, delicate, low bitterness. Found in isolated Colombian valleys.',
  },
  {
    id: 'trinitario',
    label: 'Trinitario',
    podColor: '#8B1A1A',
    podHighlight: '#D04030',
    podShadow: '#4A0A0A',
    ribColor: '#6A1010',
    note: 'Complex and aromatic. A natural hybrid with deep fruity notes and nuanced tannins.',
  },
  {
    id: 'forastero',
    label: 'Forastero',
    podColor: '#3E6035',
    podHighlight: '#72A862',
    podShadow: '#1E3018',
    ribColor: '#2E4828',
    note: "Robust and earthy. Bold, full-bodied intensity from Colombia's lowland valleys.",
  },
]

// Tablet sizes: label shown to user, weight in grams, price multiplier vs 100g base
const TABLET_SIZES = [
  { id: '50',  label: '50g',  multiplier: 0.60 },
  { id: '100', label: '100g', multiplier: 1.00 },
  { id: '200', label: '200g', multiplier: 1.80 },
]

// Price per 100g tablet: 3 € (milk) → 10 € (extra brut), linear with tone 0–100
function calcBasePrice(tone) {
  return 3 + 7 * (tone / 100)
}

// Round to nearest 0.50 for clean luxury pricing
function roundHalf(n) {
  return Math.round(n * 2) / 2
}

function calcPrice(tone, sizeId) {
  const size = TABLET_SIZES.find((s) => s.id === sizeId) || TABLET_SIZES[1]
  return roundHalf(calcBasePrice(tone) * size.multiplier)
}

function getChocolateColor(value) {
  const light = { r: 185, g: 118, b: 65 }
  const dark = { r: 35, g: 14, b: 5 }
  const t = value / 100
  return {
    fill: `rgb(${Math.round(light.r + (dark.r - light.r) * t)},${Math.round(light.g + (dark.g - light.g) * t)},${Math.round(light.b + (dark.b - light.b) * t)})`,
    highlight: `rgb(${Math.round(220 + (65 - 220) * t)},${Math.round(155 + (28 - 155) * t)},${Math.round(85 + (10 - 85) * t)})`,
    shadow: `rgb(${Math.round(105 + (15 - 105) * t)},${Math.round(62 + (6 - 62) * t)},${Math.round(28 + (2 - 28) * t)})`,
  }
}

function getChocolateLabel(value) {
  if (value < 28) return 'Milk · 35%'
  if (value < 52) return 'Semi-Dark · 55%'
  if (value < 76) return 'Dark · 72%'
  return 'Extra Brut · 90%'
}

function ChocolateBar({ tone }) {
  const c = getChocolateColor(tone)
  return (
    <svg viewBox="0 0 280 180" fill="none" className="w-full max-w-[280px]">
      <defs>
        <radialGradient id="barGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={c.highlight} stopOpacity="0.3" />
          <stop offset="100%" stopColor={c.fill} stopOpacity="0" />
        </radialGradient>
        <filter id="barShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={c.shadow} floodOpacity="0.6" />
        </filter>
      </defs>
      <rect x="10" y="10" width="260" height="160" rx="12" fill={c.shadow} filter="url(#barShadow)" />
      <rect x="14" y="14" width="252" height="152" rx="10" fill={c.fill} />
      <rect x="14" y="14" width="252" height="28" rx="10" fill={c.highlight} opacity="0.22" />
      <rect x="14" y="14" width="36" height="152" rx="10" fill={c.highlight} opacity="0.07" />
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => (
          <g key={`${col}-${row}`}>
            <rect x={22 + col * 62} y={22 + row * 46} width="54" height="38" rx="4"
              fill={c.shadow} opacity="0.45" />
            <rect x={23 + col * 62} y={23 + row * 46} width="52" height="10" rx="3"
              fill={c.highlight} opacity="0.18" />
          </g>
        ))
      )}
      <text x="140" y="156" textAnchor="middle"
        fill={c.highlight} opacity="0.3" fontSize="7"
        fontFamily="Playfair Display, serif" letterSpacing="4">
        VAICACO
      </text>
    </svg>
  )
}

function CacaoPod({ variety }) {
  const v = CACAO_VARIETIES.find((x) => x.id === variety) || CACAO_VARIETIES[0]
  const podOutline = `
    M 72,30 C 85,33 95,48 98,62 C 100,68 98,75 96,80
    C 100,87 102,95 100,103 C 98,110 96,116 98,122
    C 102,130 104,138 101,147 C 98,155 95,162 96,170
    C 94,178 88,188 82,195 C 78,199 74,202 72,203
    C 70,202 66,199 62,195 C 56,188 50,178 48,170
    C 49,162 46,155 44,147 C 41,138 43,130 47,122
    C 49,116 47,110 44,103 C 42,95 44,87 48,80
    C 46,75 44,68 46,62 C 49,48 59,33 72,30 Z
  `
  const ridgeOffsets = [-26, -13, 0, 13, 26]
  const grooves = ridgeOffsets.map((ox) => {
    const cx = 72 + ox
    return `M ${cx},34 C ${cx + ox * 0.1},90 ${cx + ox * 0.05},140 ${cx},198`
  })
  return (
    <motion.svg key={variety} viewBox="0 0 144 230" fill="none"
      className="w-full max-w-[130px] md:max-w-[110px]"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <defs>
        <radialGradient id={`podGlow_${variety}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={v.podHighlight} stopOpacity="0.7" />
          <stop offset="100%" stopColor={v.podColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={podOutline} fill={v.podShadow} opacity="0.5" transform="translate(4,5)" />
      <path d={podOutline} fill={v.podColor} />
      <path d={podOutline} fill={`url(#podGlow_${variety})`} opacity="0.4" />
      {grooves.map((d, i) => (
        <path key={i} d={d} stroke={v.podShadow}
          strokeWidth={i === 2 ? '2.2' : '1.4'}
          opacity={i === 2 ? 0.55 : 0.35} strokeLinecap="round" fill="none" />
      ))}
      {[-20, -7, 7, 20].map((ox, i) => (
        <path key={i} d={`M ${72+ox},36 C ${72+ox},80 ${72+ox},130 ${72+ox},196`}
          stroke={v.podHighlight} strokeWidth="0.8" opacity="0.2" strokeLinecap="round" fill="none" />
      ))}
      {[[58,70],[80,58],[90,95],[55,110],[85,130],[62,148],[78,165],[66,88],[82,108],[60,130]].map(([px,py],i) => (
        <circle key={i} cx={px} cy={py} r="1.2" fill={v.podShadow} opacity="0.3" />
      ))}
      <rect x="64" y="12" width="16" height="22" rx="7" fill={v.ribColor} />
      <ellipse cx="72" cy="30" rx="11" ry="5" fill={v.podHighlight} opacity="0.35" />
      <ellipse cx="72" cy="33" rx="16" ry="6" fill={v.podColor} opacity="0.6" />
      <ellipse cx="72" cy="200" rx="11" ry="5" fill={v.podShadow} opacity="0.6" />
    </motion.svg>
  )
}

// Animated price display — re-animates whenever price value changes
function PriceTag({ price, sublabel }) {
  return (
    <div className="text-center">
      <motion.div
        key={price}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-baseline justify-center gap-1"
      >
        <span className="text-[#C9A84C]"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,7vw,3rem)', fontWeight: 300 }}>
          {price % 1 === 0 ? `${price}` : price.toFixed(1)}
        </span>
        <span className="text-[#C9A84C] opacity-70"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>
          €
        </span>
      </motion.div>
      {sublabel && (
        <div className="section-label text-[0.55rem] mt-1 opacity-60">{sublabel}</div>
      )}
    </div>
  )
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  )
}

export default function ChocolateExperience() {
  const [tone, setTone] = useState(65)
  const [variety, setVariety] = useState('criollo')
  const [tabletSize, setTabletSize] = useState('100')
  const activeVariety = CACAO_VARIETIES.find((v) => v.id === variety)
  const price = calcPrice(tone, tabletSize)

  return (
    <section id="chocolate" className="relative py-16 md:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0D0603 0%, #1A0800 40%, #120500 100%)' }}>
      <svg className="absolute top-0 right-0 w-96 opacity-[0.04] pointer-events-none"
        viewBox="0 0 400 400" fill="none">
        <circle cx="300" cy="100" r="150" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="300" cy="100" r="120" stroke="#C9A84C" strokeWidth="0.5" />
        <circle cx="300" cy="100" r="90" stroke="#C9A84C" strokeWidth="0.5" />
      </svg>

      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <FadeIn>
          <div className="mb-10 md:mb-20">
            <div className="section-label mb-4">01 — Cacao</div>
            <div className="gold-line mb-5" />
            <h2 className="cinematic-text font-light text-[#F5F0E8] leading-tight max-w-lg"
              style={{ fontSize: 'clamp(1.8rem, 6vw, 4rem)' }}>
              The Dark<br />
              <span className="italic text-[#C9A898]">Art of Cacao</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* ── Chocolate bar + tone + size ── */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center gap-8 md:gap-10">
              <div className="flex items-center justify-center w-full">
                <ChocolateBar tone={tone} />
              </div>

              {/* Tone slider */}
              <div className="w-full max-w-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="section-label text-[0.6rem]">Milk</span>
                  <motion.span key={getChocolateLabel(tone)}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[#C9A84C] text-sm tracking-widest"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {getChocolateLabel(tone)}
                  </motion.span>
                  <span className="section-label text-[0.6rem]">Dark</span>
                </div>
                <div className="py-1">
                  <input type="range" min="0" max="100" value={tone}
                    onChange={(e) => setTone(Number(e.target.value))}
                    className="w-full" aria-label="Chocolate tone" />
                </div>
                <div className="mt-2 h-px rounded-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(to right,
                      ${getChocolateColor(0).fill},
                      ${getChocolateColor(50).fill},
                      ${getChocolateColor(100).fill})`,
                  }} />
              </div>

              {/* Tablet size selector */}
              <div className="w-full max-w-sm">
                <div className="section-label text-center mb-4">Tablet Size</div>
                <div className="grid grid-cols-3 gap-2">
                  {TABLET_SIZES.map((s) => (
                    <button key={s.id} onClick={() => setTabletSize(s.id)}
                      className={`min-h-[44px] border text-sm tracking-widest transition-all duration-300 ${
                        tabletSize === s.id
                          ? 'border-[#C9A84C] text-[#C9A84C]'
                          : 'border-[#F5F0E8]/15 text-[#F5F0E8]/35 hover:border-[#F5F0E8]/35'
                      }`}
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <PriceTag price={price} sublabel="per tablet" />
            </div>
          </FadeIn>

          {/* ── Cacao pod + variety ── */}
          <FadeIn delay={0.15}>
            <div className="flex flex-col items-center gap-8 md:gap-10">
              <div className="flex items-center justify-center" style={{ minHeight: '200px' }}>
                <CacaoPod variety={variety} />
              </div>

              <div className="w-full max-w-sm">
                <div className="section-label text-center mb-5">Cacao Variety</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {CACAO_VARIETIES.map((v) => (
                    <button key={v.id} onClick={() => setVariety(v.id)}
                      className={`relative min-h-[44px] px-5 py-2 text-[0.68rem] tracking-widest uppercase transition-all duration-300 border ${
                        variety === v.id
                          ? 'border-[#C9A84C] text-[#C9A84C]'
                          : 'border-[#F5F0E8]/15 text-[#F5F0E8]/38 hover:border-[#F5F0E8]/40'
                      }`}
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {variety === v.id && (
                        <motion.div layoutId="variety-indicator"
                          className="absolute inset-0 bg-[#C9A84C]/6" />
                      )}
                      {v.label}
                    </button>
                  ))}
                </div>

                <motion.p key={variety}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-5 text-center text-[#9A7868] text-sm leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {activeVariety.note}
                </motion.p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0D0603)' }} />
    </section>
  )
}
