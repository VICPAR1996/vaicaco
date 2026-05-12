/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cacao': '#3B1A08',
        'espresso': '#1A0A00',
        'ivory': '#F5F0E8',
        'champagne': '#F7E7C1',
        'pale-gold': '#C9A84C',
        'forest': '#1A2E1A',
        'charcoal': '#1C1C1E',
        'cream': '#E8DCC8',
        'vanilla-pale': '#E8D5A3',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['"Cormorant Garamond"', 'Garamond', 'serif'],
        'mono': ['"IM Fell English"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(201,168,76,0.3))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(201,168,76,0.6))' },
        },
      },
    },
  },
  plugins: [],
}
