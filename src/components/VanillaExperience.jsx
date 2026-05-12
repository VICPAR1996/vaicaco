import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VANILLA_ORIGINS = [
  { id: 'sierra-nevada', name: 'Sierra Nevada', x: 62, y: 12,
    note: 'Mountain-grown vanilla. Delicate floral tones, woody base note.' },
  { id: 'amazonia', name: 'Amazonía', x: 68, y: 75,
    note: 'Dense tropical rainforest. Rich, creamy, intensely complex.' },
  { id: 'choco', name: 'Chocó', x: 20, y: 45,
    note: 'Pacific rainforest. Dark, smoky, raisin and rum undertones.' },
  { id: 'magdalena', name: 'Magdalena', x: 55, y: 22,
    note: 'Caribbean foothills. Fruity brightness, warm floral notes.' },
]

const VANILLA_GRADES = [
  { id: 'A', label: 'Grade A', sublabel: 'Gourmet · Prime pods', price: 4.50 },
  { id: 'B', label: 'Grade B', sublabel: 'Culinary · Rich extract', price: 2.50 },
]

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
          {price % 1 === 0 ? `${price}` : price.toFixed(2)}
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
  }
}

function VanillaPod({ maturity }) {
  const c = getVanillaColors(maturity)
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
    <motion.svg viewBox="0 0 80 225" fill="none"
      className="w-full max-w-[80px] md:max-w-[64px]">
      <defs>
        <radialGradient id="vanillaGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor={c.highlight} stopOpacity="0.55" />
          <stop offset="100%" stopColor={c.fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={podBody} fill={c.shadow} opacity="0.5" transform="translate(3,4)" />
      <path d={podBody} fill={c.fill} />
      <path d={podBody} fill="url(#vanillaGrad)" />
      <path d="M 36,24 C 34,68 33,115 34,195"
        stroke={c.highlight} strokeWidth="1.5" opacity="0.32" strokeLinecap="round" fill="none" />
      <path d="M 40,24 C 40,80 40,135 40,196"
        stroke={c.shadow} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" fill="none" />
      {maturity > 60 && (
        <g opacity={c.bloomOpacity}>
          {[45, 68, 95, 125, 155, 178, 196].map((y, i) => (
            <circle key={i} cx={34 + (i % 3) * 5} cy={y} r="0.9" fill="#E8DEC8" />
          ))}
          {maturity > 85 && [55, 82, 108, 140, 168].map((y, i) => (
            <circle key={i} cx={42 + (i % 2) * 4} cy={y} r="0.7" fill="#F0E8D5" />
          ))}
        </g>
      )}
      <path d="M38,14 Q40,8 42,14 L44,22 L36,22 Z" fill={c.shadow} opacity="0.8" />
      <path d="M39,14 Q40,9 41,14"
        stroke={c.highlight} strokeWidth="0.8" opacity="0.5" fill="none" />
      <ellipse cx="40" cy="202" rx="4" ry="2.5" fill={c.shadow} opacity="0.6" />
    </motion.svg>
  )
}

// Simple Colombia map with enlarged tap targets
function VanillaMap({ selectedOrigin, onSelect }) {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <svg viewBox="0 0 120 140" fill="none" className="w-full">
        <path
          d="M60 4 L72 6 L82 10 L88 16 L90 24 L86 28 L90 34 L92 42 L88 50
             L90 56 L88 62 L86 68 L80 76 L78 84 L72 92 L68 100 L62 108
             L56 116 L52 124 L50 132 L46 130 L44 122 L40 114 L36 108
             L32 100 L28 92 L24 84 L22 76 L20 68 L18 60 L16 52 L20 44
             L22 38 L18 30 L20 22 L24 16 L32 10 L42 6 Z"
          fill="#0D1208" stroke="#C9A84C" strokeWidth="0.6" strokeOpacity="0.3"
        />
        {VANILLA_ORIGINS.map((origin) => {
          const x = (origin.x / 100) * 120
          const y = (origin.y / 100) * 140
          const isActive = selectedOrigin === origin.id
          return (
            <g key={origin.id} onClick={() => onSelect(origin.id)} style={{ cursor: 'pointer' }}>
              {isActive && (
                <motion.circle cx={x} cy={y} r="8" fill="none"
                  stroke="#C9A84C" strokeWidth="0.8"
                  initial={{ r: 3, opacity: 0.5 }}
                  animate={{ r: 9, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <circle cx={x} cy={y} r={isActive ? 4 : 3}
                fill={isActive ? '#C9A84C' : '#E8DCC8'}
                opacity={isActive ? 1 : 0.35}
                className="transition-all duration-300"
              />
              {/* Invisible large tap target */}
              <circle cx={x} cy={y} r="10" fill="transparent" />
              <text x={x + 6} y={y + 1.5} fontSize="5"
                fill={isActive ? '#C9A84C' : '#E8DCC8'}
                opacity={isActive ? 0.9 : 0.28}
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

export default function VanillaExperience() {
  const [maturity, setMaturity] = useState(50)
  const [quantity, setQuantity] = useState(5)
  const [origin, setOrigin] = useState('amazonia')
  const [grade, setGrade] = useState('A')

  const activeGrade = VANILLA_GRADES.find((g) => g.id === grade)
  const totalPrice = Math.round(activeGrade.price * quantity * 100) / 100

  const activeOrigin = VANILLA_ORIGINS.find((o) => o.id === origin)

  return (
    <section
      id="vanilla"
      className="relative py-16 md:py-40 overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <FadeIn>
          <div className="mb-10 md:mb-20">
            <div className="section-label mb-4">03 — Vanilla</div>
            <div className="gold-line mb-5" />
            <h2 className="cinematic-text font-light text-[#F5F0E8] leading-tight max-w-lg"
              style={{ fontSize: 'clamp(1.8rem, 6vw, 4rem)' }}>
              Wild-Grown<br />
              <span className="italic text-[#D4C890]">Colombian Vanilla</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start">

          {/* ── Pod + controls ── */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col items-center gap-8 md:gap-12">
              <div className="flex items-center justify-center" style={{ minHeight: '180px' }}>
                <VanillaPod maturity={maturity} />
              </div>

              {/* Maturity slider */}
              <div className="w-full max-w-sm">
                <div className="flex justify-between items-center mb-2">
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
                <div className="py-1">
                  <input
                    type="range" min="0" max="100" value={maturity}
                    onChange={(e) => setMaturity(Number(e.target.value))}
                    className="w-full" aria-label="Vanilla maturity"
                  />
                </div>
                <div className="mt-2 h-px rounded-full"
                  style={{
                    background: `linear-gradient(to right,
                      ${getVanillaColors(0).fill},
                      ${getVanillaColors(55).fill},
                      ${getVanillaColors(100).fill})`,
                  }}
                />
              </div>

              {/* Grade selector */}
              <div className="w-full max-w-sm">
                <div className="section-label text-center mb-4">Grade</div>
                <div className="grid grid-cols-2 gap-2">
                  {VANILLA_GRADES.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGrade(g.id)}
                      className={`min-h-[56px] px-3 py-3 border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                        grade === g.id
                          ? 'border-[#C9A84C] text-[#C9A84C]'
                          : 'border-[#F5F0E8]/15 text-[#F5F0E8]/35 hover:border-[#F5F0E8]/35'
                      }`}
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      <span className="text-sm tracking-widest uppercase">{g.label}</span>
                      <span className="text-[0.6rem] opacity-60 tracking-wide">{g.sublabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity — 48px buttons */}
              <div className="w-full max-w-sm">
                <div className="section-label text-center mb-4">Quantity — Pods</div>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border border-[#F5F0E8]/18 text-[#F5F0E8]/45 hover:border-[#C9A84C]/55 hover:text-[#C9A84C] transition-all duration-300 text-xl"
                    aria-label="Decrease quantity"
                  >−</button>
                  <div className="text-center min-w-[48px]">
                    <div className="text-[#F5F0E8] text-2xl tracking-widest"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {quantity}
                    </div>
                    <div className="section-label text-[0.55rem] mt-1">pods</div>
                  </div>
                  <button
                    onClick={() => setQuantity(Math.min(20, quantity + 1))}
                    className="w-12 h-12 border border-[#F5F0E8]/18 text-[#F5F0E8]/45 hover:border-[#C9A84C]/55 hover:text-[#C9A84C] transition-all duration-300 text-xl"
                    aria-label="Increase quantity"
                  >+</button>
                </div>
              </div>

              <PriceTag
                price={totalPrice}
                sublabel={`${quantity} pod${quantity > 1 ? 's' : ''} · ${activeGrade.label} · ${activeGrade.price.toFixed(2)}€/pod`}
              />
            </div>
          </FadeIn>

          {/* ── Map + origin ── */}
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div className="section-label">Select Origin</div>
              <VanillaMap selectedOrigin={origin} onSelect={setOrigin} />

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
                <p className="text-[#8A8858] text-sm leading-relaxed"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {activeOrigin?.note}
                </p>
              </motion.div>

              {/* Region pills — 2-col grid on mobile */}
              <div className="w-full max-w-sm grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center">
                {VANILLA_ORIGINS.map((o) => (
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
        style={{ background: 'linear-gradient(to bottom, transparent, #090704)' }} />
    </section>
  )
}
