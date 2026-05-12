import React from 'react'
import { motion } from 'framer-motion'

// ─── Simplified Colombia department polygons ───────────────────────────────
// ViewBox: "0 0 180 240"
// Coordinate derivation (approximate):
//   x = (lon + 80) * 11.3 + 8
//   y = (13 - lat) * 12.2 + 8
// All paths are simplified approximations — accurate enough to be recognisable.

export const DEPT_PATHS = [
  // ── Caribbean coast ──────────────────────────────────────────────────────
  {
    id: 'guajira',
    name: 'La Guajira',
    d: 'M88,24 L103,8 L138,8 L152,18 L146,32 L122,38 L102,34 L89,28 Z',
  },
  {
    id: 'magdalena',
    name: 'Magdalena',
    d: 'M62,30 L88,24 L89,28 L102,34 L122,38 L114,52 L92,56 L72,52 L62,40 Z',
  },
  {
    id: 'atlantico',
    name: 'Atlántico',
    d: 'M50,36 L62,30 L62,40 L54,43 L50,40 Z',
  },
  {
    id: 'bolivar',
    name: 'Bolívar',
    d: 'M34,42 L50,36 L50,40 L54,43 L62,40 L72,52 L92,56 L88,68 L72,72 L54,72 L42,66 L35,55 Z',
  },
  {
    id: 'sucre',
    name: 'Sucre',
    d: 'M24,52 L34,42 L35,55 L42,66 L38,72 L30,72 L22,62 L22,55 Z',
  },
  {
    id: 'cordoba',
    name: 'Córdoba',
    d: 'M10,50 L24,52 L22,55 L22,62 L30,72 L24,80 L16,78 L10,64 L8,54 Z',
  },
  {
    id: 'cesar',
    name: 'Cesar',
    d: 'M92,56 L114,52 L122,38 L146,32 L142,48 L130,62 L115,66 L100,66 L88,68 Z',
  },
  // ── Andean north-east ────────────────────────────────────────────────────
  {
    id: 'nortedesantander',
    name: 'Norte de Santander',
    d: 'M100,66 L115,66 L130,62 L142,48 L156,46 L162,58 L150,72 L135,76 L120,74 L108,72 Z',
  },
  {
    id: 'santander',
    name: 'Santander',
    d: 'M72,72 L88,68 L100,66 L108,72 L106,88 L94,93 L85,88 L80,80 Z',
  },
  {
    id: 'boyaca',
    name: 'Boyacá',
    d: 'M94,93 L106,88 L108,72 L120,74 L135,76 L134,92 L120,102 L108,104 L97,101 L93,96 Z',
  },
  {
    id: 'cundinamarca',
    name: 'Cundinamarca',
    d: 'M85,88 L94,93 L93,96 L97,101 L90,112 L80,114 L75,108 L77,96 Z',
  },
  {
    id: 'bogota',
    name: 'Bogotá D.C.',
    d: 'M83,101 L90,101 L90,110 L82,113 Z',
  },
  // ── Antioquia (large) ────────────────────────────────────────────────────
  {
    id: 'antioquia',
    name: 'Antioquia',
    d: 'M18,78 L24,80 L30,72 L38,72 L42,66 L54,72 L72,72 L80,80 L77,96 L68,103 L56,106 L44,102 L34,96 L24,87 L18,82 Z',
  },
  // ── Pacific coast ────────────────────────────────────────────────────────
  {
    id: 'choco',
    name: 'Chocó',
    d: 'M8,66 L16,64 L10,64 L16,78 L18,82 L24,87 L34,96 L31,108 L23,120 L16,134 L10,150 L8,163 L12,172 L10,160 L8,143 L10,126 L14,108 L12,88 L10,72 Z',
  },
  // ── Coffee triangle ──────────────────────────────────────────────────────
  {
    id: 'caldas',
    name: 'Caldas',
    d: 'M48,97 L58,91 L68,103 L56,106 L48,104 Z',
  },
  {
    id: 'risaralda',
    name: 'Risaralda',
    d: 'M40,104 L48,104 L56,106 L54,114 L44,117 L38,112 Z',
  },
  {
    id: 'quindio',
    name: 'Quindío',
    d: 'M44,117 L54,114 L53,122 L44,122 Z',
  },
  // ── Valle del Cauca ──────────────────────────────────────────────────────
  {
    id: 'valle',
    name: 'Valle del Cauca',
    d: 'M20,111 L31,108 L34,96 L44,102 L48,104 L40,104 L38,112 L44,117 L44,122 L53,122 L57,131 L47,140 L37,138 L25,130 L19,120 Z',
  },
  // ── Tolima ───────────────────────────────────────────────────────────────
  {
    id: 'tolima',
    name: 'Tolima',
    d: 'M56,106 L68,103 L77,96 L75,108 L80,114 L90,112 L88,126 L79,138 L68,142 L55,138 L53,130 L53,122 L54,114 Z',
  },
  // ── Huila ────────────────────────────────────────────────────────────────
  {
    id: 'huila',
    name: 'Huila',
    d: 'M80,114 L90,112 L97,101 L108,104 L112,120 L108,137 L98,150 L86,155 L76,151 L72,141 L78,132 L80,122 Z',
  },
  // ── Cauca ────────────────────────────────────────────────────────────────
  {
    id: 'cauca',
    name: 'Cauca',
    d: 'M37,138 L47,140 L57,131 L68,142 L76,151 L68,165 L57,170 L45,164 L35,157 L27,145 Z',
  },
  // ── Nariño ───────────────────────────────────────────────────────────────
  {
    id: 'narino',
    name: 'Nariño',
    d: 'M24,160 L35,157 L45,164 L57,170 L59,184 L48,192 L36,188 L24,180 L17,169 Z',
  },
  // ── Putumayo ─────────────────────────────────────────────────────────────
  {
    id: 'putumayo',
    name: 'Putumayo',
    d: 'M57,170 L72,165 L76,181 L66,192 L55,192 L46,184 L56,176 Z',
  },
  // ── Caquetá ──────────────────────────────────────────────────────────────
  {
    id: 'caqueta',
    name: 'Caquetá',
    d: 'M86,155 L98,150 L108,137 L112,120 L124,130 L119,152 L109,166 L97,170 L85,168 L74,162 L72,152 L76,151 Z',
  },
  // ── Meta (large eastern) ─────────────────────────────────────────────────
  {
    id: 'meta',
    name: 'Meta',
    d: 'M90,112 L97,101 L108,104 L120,102 L134,92 L148,98 L158,114 L154,140 L140,153 L125,162 L111,159 L109,148 L108,137 L112,120 L90,112 Z',
  },
  // ── Casanare ─────────────────────────────────────────────────────────────
  {
    id: 'casanare',
    name: 'Casanare',
    d: 'M120,102 L134,92 L135,76 L150,72 L162,58 L172,66 L171,88 L162,100 L154,110 L148,98 Z',
  },
  // ── Arauca ───────────────────────────────────────────────────────────────
  {
    id: 'arauca',
    name: 'Arauca',
    d: 'M120,74 L135,76 L150,72 L162,58 L156,46 L165,44 L170,56 L172,66 L162,58 L150,72 Z',
  },
  // ── Vichada ──────────────────────────────────────────────────────────────
  {
    id: 'vichada',
    name: 'Vichada',
    d: 'M148,98 L154,110 L162,100 L171,88 L182,92 L186,113 L183,136 L172,150 L160,154 L149,147 L148,128 L156,115 Z',
  },
  // ── Guainía ──────────────────────────────────────────────────────────────
  {
    id: 'guainia',
    name: 'Guainía',
    d: 'M160,154 L172,150 L183,136 L192,153 L188,174 L177,180 L164,174 L157,162 Z',
  },
  // ── Guaviare ─────────────────────────────────────────────────────────────
  {
    id: 'guaviare',
    name: 'Guaviare',
    d: 'M109,166 L119,162 L125,162 L140,153 L149,147 L148,165 L138,176 L124,179 L110,175 L105,167 Z',
  },
  // ── Vaupés ───────────────────────────────────────────────────────────────
  {
    id: 'vaupes',
    name: 'Vaupés',
    d: 'M138,176 L148,165 L160,163 L164,174 L177,180 L180,198 L170,210 L156,212 L144,202 L137,190 Z',
  },
  // ── Amazonas ─────────────────────────────────────────────────────────────
  {
    id: 'amazonas',
    name: 'Amazonas',
    d: 'M105,170 L110,175 L124,179 L138,176 L137,190 L144,202 L142,217 L130,228 L112,234 L94,234 L78,228 L68,214 L68,200 L77,190 L86,180 L95,172 Z',
  },
]

// Maps origin IDs (used in coffee/vanilla selectors) to department IDs
export const ORIGIN_TO_DEPT = {
  // Coffee origins
  'sierra-nevada': ['magdalena', 'cesar', 'guajira'],
  'huila': ['huila'],
  'narino': ['narino'],
  'quindio': ['quindio', 'risaralda', 'caldas'],
  'tolima': ['tolima'],
  // Vanilla origins
  'amazonia': ['amazonas', 'caqueta', 'putumayo'],
  'choco': ['choco'],
  'magdalena': ['magdalena'],
}

// ─── Component ────────────────────────────────────────────────────────────
export default function ColombiaMap({ origins, selectedOrigin, onSelect, accentColor = '#C9A84C' }) {
  // Build a set of deptIds that should be highlighted
  const activeDepts = new Set(
    selectedOrigin ? (ORIGIN_TO_DEPT[selectedOrigin] || [selectedOrigin]) : []
  )

  // Build a map from deptId → origin for hover tooltips
  const deptToOrigin = {}
  origins.forEach((origin) => {
    const depts = ORIGIN_TO_DEPT[origin.id] || [origin.id]
    depts.forEach((d) => { deptToOrigin[d] = origin })
  })

  // Build set of all selectable dept IDs
  const selectableDepts = new Set(Object.keys(deptToOrigin))

  return (
    <div className="relative w-full max-w-[220px] mx-auto select-none">
      <svg
        viewBox="0 0 180 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        {/* Ambient background glow for the whole map */}
        <ellipse
          cx="95" cy="125" rx="80" ry="100"
          fill={accentColor}
          opacity="0.03"
        />

        {/* Render each department */}
        {DEPT_PATHS.map((dept) => {
          const isActive = activeDepts.has(dept.id)
          const isSelectable = selectableDepts.has(dept.id)
          const origin = deptToOrigin[dept.id]

          return (
            <motion.path
              key={dept.id}
              d={dept.d}
              fill={isActive ? accentColor : '#1A1A14'}
              stroke={isActive ? accentColor : '#C9A84C'}
              strokeWidth={isActive ? '0.8' : '0.4'}
              strokeOpacity={isActive ? 0.9 : 0.25}
              fillOpacity={isActive ? 0.35 : 0.9}
              style={{ cursor: isSelectable ? 'pointer' : 'default' }}
              animate={{
                fillOpacity: isActive ? 0.35 : 0.9,
                fill: isActive ? accentColor : '#1A1A14',
              }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                if (isSelectable && origin) onSelect(origin.id)
              }}
              whileHover={
                isSelectable
                  ? { fillOpacity: 0.5, fill: accentColor, strokeOpacity: 0.7 }
                  : {}
              }
            >
              <title>{dept.name}</title>
            </motion.path>
          )
        })}

        {/* Origin label dots */}
        {origins.map((origin) => {
          const isActive = selectedOrigin === origin.id
          const cx = (origin.x / 100) * 180
          const cy = (origin.y / 100) * 240
          return (
            <g
              key={origin.id}
              onClick={() => onSelect(origin.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse ring when active */}
              {isActive && (
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={8}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="0.8"
                  initial={{ r: 4, opacity: 0.6 }}
                  animate={{ r: 10, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <circle
                cx={cx}
                cy={cy}
                r={isActive ? 4 : 2.8}
                fill={isActive ? accentColor : '#E8DCC8'}
                opacity={isActive ? 1 : 0.5}
                className="transition-all duration-300"
              />
              {/* Label */}
              <text
                x={cx + 6}
                y={cy + 1.5}
                fontSize="5"
                fill={isActive ? accentColor : '#E8DCC8'}
                opacity={isActive ? 1 : 0.45}
                fontFamily="Cormorant Garamond, serif"
                className="pointer-events-none"
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
