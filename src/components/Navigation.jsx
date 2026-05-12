import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Chocolate', href: '#chocolate' },
  { label: 'Coffee', href: '#coffee' },
  { label: 'Vanilla', href: '#vanilla' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when user taps a link
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-[#0D0603]/95 backdrop-blur-md border-b border-[#C9A84C]/10'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-4 md:py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group py-2">
          <span className="font-['Playfair_Display'] text-lg md:text-xl tracking-[0.25em] text-[#F5F0E8] group-hover:text-[#C9A84C] transition-colors duration-500">
            VAICACO
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="section-label hover:text-[#F5F0E8] transition-colors duration-300 hover:opacity-100 py-2"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger — 48×48 tap target */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-12 h-12 gap-[5px] -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-px bg-[#C9A84C] origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 h-px bg-[#C9A84C]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-6 h-px bg-[#C9A84C] origin-center"
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#0D0603]/98 backdrop-blur-md border-t border-[#C9A84C]/10 overflow-hidden"
          >
            <div className="flex flex-col py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  /* Each link is 56px tall for comfortable tapping */
                  className="flex items-center justify-center h-14 section-label text-sm hover:text-[#F5F0E8] transition-colors duration-300 hover:opacity-100 hover:bg-[#C9A84C]/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
