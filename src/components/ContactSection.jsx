import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

function LuxuryInput({ label, name, type = 'text', multiline = false, value, onChange }) {
  const [focused, setFocused] = useState(false)

  // font-size 16px prevents iOS Safari from auto-zooming on focus
  const inputStyle = { fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }
  const baseClass = `w-full bg-transparent border-b py-3 text-[#F5F0E8] placeholder-[#F5F0E8]/20 outline-none transition-all duration-400 resize-none`
  const borderClass = focused
    ? 'border-[#C9A84C]/70'
    : 'border-[#F5F0E8]/15'

  return (
    <div className="relative">
      <label
        className="section-label text-[0.6rem] mb-2 block"
        style={{ color: focused ? '#C9A84C' : 'rgba(245,240,232,0.4)' }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name} value={value} onChange={onChange} rows={4}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={`Your ${label.toLowerCase()}…`}
          className={`${baseClass} ${borderClass}`}
          style={inputStyle}
        />
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={`Your ${label.toLowerCase()}…`}
          className={`${baseClass} ${borderClass}`}
          style={inputStyle}
        />
      )}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A84C] origin-left pointer-events-none"
      />
    </div>
  )
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative py-16 md:py-48 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0804 0%, #0D0603 100%)',
      }}
    >
      {/* Botanical circles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]"
        viewBox="0 0 1440 600" fill="none" preserveAspectRatio="xMidYMid slice"
      >
        {[120, 200, 280, 360, 440].map((r) => (
          <circle key={r} cx="720" cy="300" r={r} stroke="#C9A84C" strokeWidth="0.5" />
        ))}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <line key={i} x1="720" y1="300"
              x2={720 + Math.cos(angle) * 500}
              y2={300 + Math.sin(angle) * 500}
              stroke="#C9A84C" strokeWidth="0.3" />
          )
        })}
      </svg>

      <div className="max-w-3xl mx-auto px-5 md:px-12 relative z-10">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10 md:mb-16">
            <div className="section-label mb-4">Private Orders</div>
            <div className="gold-line mx-auto mb-6 md:mb-8" />
            <h2 className="cinematic-text font-light text-[#F5F0E8] mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 3.2rem)' }}>
              For the<br />
              <span className="italic text-[#C9A898]">Discerning Palate</span>
            </h2>
            <p className="text-[#8A7A6A] leading-relaxed mx-auto max-w-xs md:max-w-md"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
              For private orders, sourcing partnerships or more information, contact us.
            </p>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.15}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="gold-line mx-auto mb-6" />
              <p className="text-[#C9A84C] text-xl tracking-widest"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                Thank you.
              </p>
              <p className="text-[#8A7A6A] mt-3 text-sm"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                We will be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
              {/* Name + email stack on mobile, side-by-side on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <LuxuryInput label="Name" name="name" value={form.name} onChange={handleChange} />
                <LuxuryInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              </div>
              <LuxuryInput label="Message" name="message" multiline value={form.message} onChange={handleChange} />

              {/* CTA — full width on mobile, auto-width on desktop */}
              <div className="flex justify-center mt-4">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="w-full md:w-auto px-12 py-4 border border-[#C9A84C]/50 text-[#C9A84C] tracking-[0.3em] uppercase transition-colors duration-500 active:bg-[#C9A84C]/10 hover:bg-[#C9A84C]/8"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.85rem' }}
                >
                  Contact Us
                </motion.button>
              </div>
            </form>
          )}
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.3}>
          <div className="mt-16 md:mt-24 text-center">
            <div className="gold-line mx-auto mb-6 md:mb-8" />
            <div className="text-[#F5F0E8] text-lg tracking-[0.4em] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              VAICACO
            </div>
            <div className="section-label text-[0.6rem]">
              Colombian Origins — Vanilla · Cacao · Coffee
            </div>
            <div className="mt-5 text-[#4A3A2A] text-xs tracking-widest"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              © 2025 Vaicaco. All rights reserved.
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
