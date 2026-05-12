import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COFFEE_ORIGINS = [
  { id: 'sierra-nevada', name: 'Sierra Nevada', x: 62, y: 12,
    note: 'High altitude, snow-melt waters. Bright acidity, stone fruit finish.' },
  { id: 'huila', name: 'Huila', x: 43, y: 62,
    note: "Colombia's most decorated origin. Caramel sweetness, full body." },
  { id: 'narino', name: 'Nariño', x: 30, y: 80,
    note: 'Extreme altitude, volcanic soils. Citrus brightness, clean cup.' },
  { id: 'quindio', name: 'Quindío', x: 40, y: 52,
    note: 'Coffee triangle heartland. Balanced, chocolatey, classic Colombian.' },
  { id: 'tolima', name: 'Tolima', x: 46, y: 48,
    note: 'Isolated terroirs, complex microclimates. Floral and nuanced.' },
]

const ROAST_LEVELS = ['Light', 'Medium', 'Dark']

const COFFEE_PRICES = { 100: 4, 250: 9, 500: 16, 1000: 30 }

function PriceTag({ price, sublabel }) {
  return (
    <div className="text-center">
      <motion.div
        key={price}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-baseline justify-center gap-1"
      >
        <span
          className="text-[#C9A84C]"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem,7vw,3rem)', fontWeight: 300 }}
        >
          {price}
        </span>
        <span
          className="text-[#C9A84C] opacity-70"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}
        >€</span>
      </motion.div>
      {sublabel && <div className="section-label text-[0.55rem] mt-1 opacity-60">{sublabel}</div>}
    </div>
  )
}

function getBeanColor(roast) {
  const light = { r: 188, g: 128, b: 65 }
  const dark = { r: 25, g: 10, b: 4 }
  const t = roast / 100
  return {
    fill: `rgb(${Math.round(light.r + (dark.r - light.r) * t)},${Math.round(light.g + (dark.g - light.g) * t)},${Math.round(light.b + (dark.b - light.b) * t)})`,
    highlight: `rgb(${Math.round(225 + (55 - 225) * t)},${Math.round(165 + (22 - 165) * t)},${Math.round(85 + (8 - 85) * t)})`,
    shadow: `rgb(${Math.round(105 + (10 - 105) * t)},${Math.round(68 + (4 - 68) * t)},${Math.round(30 + (2 - 30) * t)})`,
  }
}

function CoffeeBean({ roastValue }) {
  const c = getBeanColor(roastValue)
  return (
    <svg viewBox="0 0 160 220" fill="none" className="w-full max-w-[130px] md:max-w-[110px]">
      <defs>
        <radialGradient id="beanGrad" cx="38%" cy="35%" r="55%">
          <stop offset="0%" stopColor={c.highlight} stopOpacity="0.5" />
          <stop offset="100%" stopColor={c.fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="84" cy="116" rx="50" ry="76" fill={c.shadow} opacity="0.5" />
      <ellipse cx="80" cy="112" rx="50" ry="76" fill={c.fill} />
      <ellipse cx="80" cy="112" rx="50" ry="76" fill="url(#beanGrad)" />
      <ellipse cx="60" cy="82" rx="15" ry="32" fill={c.highlight}
        opacity="0.3" transform="rotate(-12 60 82)" />
      <path d="M80,38 C72,72 72,110 80,148 C88,110 88,72 80,38" fill={c.shadow} opacity="0.65" />
      <path d="M80,42 C76,74 76,110 80,144"
        stroke={c.highlight} strokeWidth="1" opacity="0.18" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// Simple Colombia map with large invisible tap targets on each origin dot
function ColombiaMap({ selectedOrigin, onSelect }) {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <svg viewBox="0 0 120 140" fill="none" className="w-full">
        <path
          d="M60 4 L72 6 L82 10 L88 16 L90 24 L86 28 L90 34 L92 42 L88 50
             L90 56 L88 62 L86 68 L80 76 L78 84 L72 92 L68 100 L62 108
             L56 116 L52 124 L50 132 L46 130 L44 122 L40 114 L36 108
             L32 100 L28 92 L24 84 L22 76 L20 68 L18 60 L16 52 L20 44
             L22 38 L18 30 L20 22 L24 16 L32 10 L42 6 Z"
          fill="#1A1208" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.4"
        />
        {COFFEE_ORIGINS.map((origin) => {
          const x = (origin.x / 100) * 120
          const y = (origin.y / 100) * 140
          const isActive = selectedOrigin === origin.id
          return (
            <g key={origin.id} onClick={() => onSelect(origin.id)} style={{ cursor: 'pointer' }}>
              {/* Pulse ring */}
              {isActive && (
                <motion.circle cx={x} cy={y} r="8" fill="none"
                  stroke="#C9A84C" strokeWidth="0.8"
                  initial={{ r: 4, opacity: 0 }}
                  animate={{ r: 9, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              {/* Visible dot */}
              <circle cx={x} cy={y} r={isActive ? 4 : 3}
                fill={isActive ? '#C9A84C' : '#F5F0E8'}
                opacity={isActive ? 1 : 0.4}
                className="transition-all duration-300"
              />
              {/* Invisible large tap target (r=10 in SVG ≈ 23px on screen, fine for touch) */}
              <circle cx={x} cy={y} r="10" fill="transparent" />
              {/* Label */}
              <text x={x + 6} y={y + 1.5} fontSize="5"
                fill={isActive ? '#C9A84C' : '#F5F0E8'}
                opacity={isActive ? 0.9 : 0.32}
                fontFamily="Cormorant Garamond, serif"
                className="select-none pointer-events-none"
              >
                {origin.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
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

  return (
    <section
      id="coffee"
      className="relative py-16 md:py-40 overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <FadeIn>
          <div className="mb-10 md:mb-20">
            <div className="section-label mb-4">02 — Coffee</div>
            <div className="gold-line mb-5" />
            <h2 className="cinematic-text font-light text-[#F5F0E8] leading-tight max-w-lg"
              style={{ fontSize: 'clamp(1.8rem, 6vw, 4rem)' }}>
              Single Origin<br />
              <span className="italic text-[#A8C898]">Colombian Coffee</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start">

          {/* ── Bean + roast + quantity ── */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center gap-8 md:gap-12">
              <CoffeeBean roastValue={roast} />

              {/* Roast slider */}
              <div className="w-full max-w-sm">
                <div className="flex justify-between items-center mb-2">
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
                <div className="py-1">
                  <input
                    type="range" min="0" max="100" value={roast}
                    onChange={(e) => setRoast(Number(e.target.value))}
                    className="w-full" aria-label="Roast level"
                  />
                </div>
                <div className="mt-2 h-px rounded-full"
                  style={{
                    background: `linear-gradient(to right,
                      ${getBeanColor(0).fill},
                      ${getBeanColor(50).fill},
                      ${getBeanColor(100).fill})`,
                  }}
                />
              </div>

              {/* Quantity — 56px buttons, comfortable on thumb */}
              <div className="w-full max-w-sm">
                <div className="section-label text-center mb-4">Quantity</div>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 250, 500, 1000].map((g) => (
                    <button
                      key={g}
                      onClick={() => setQuantity(g)}
                      className={`h-14 border text-sm transition-all duration-300 ${
                        quantity === g
                          ? 'border-[#C9A84C] text-[#C9A84C]'
                          : 'border-[#F5F0E8]/15 text-[#F5F0E8]/32 hover:border-[#F5F0E8]/35'
                      }`}
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {g >= 1000 ? '1kg' : `${g}g`}
                    </button>
                  ))}
                </div>
              </div>

              <PriceTag price={COFFEE_PRICES[quantity]} sublabel={`${quantity >= 1000 ? '1 kg' : quantity + 'g'} bag`} />
            </div>
          </FadeIn>

          {/* ── Map + origin ── */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div className="section-label">Select Origin</div>
              <ColombiaMap selectedOrigin={origin} onSelect={setOrigin} />

              <motion.div
                key={origin}
                initial={{ opacity: 0, y: 8 }}
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

              {/* Region pills — full-width grid on mobile for easier tapping */}
              <div className="w-full max-w-sm grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center">
                {COFFEE_ORIGINS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setOrigin(o.id)}
                    className={`min-h-[44px] px-3 py-2 text-[0.65rem] tracking-widest uppercase border transition-all duration-300 ${
                      origin === o.id
                        ? 'border-[#C9A84C] text-[#C9A84C]'
                        : 'border-[#F5F0E8]/12 text-[#F5F0E8]/32 hover:border-[#F5F0E8]/30'
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
