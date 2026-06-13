/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Oasis palette — barren sand → lush gold
        sand: {
          50: '#f7efdf',
          100: '#ecdcc0',
          200: '#dcc299',
          300: '#c9a36e',
          400: '#b3854b',
          500: '#946838',
          600: '#74502b',
          700: '#553a20',
          800: '#392716',
          900: '#1f150c',
          950: '#130d07',
        },
        gold: {
          DEFAULT: '#e7b24c',
          light: '#f6d488',
          deep: '#c8902f',
        },
        oasis: {
          green: '#3f8a5b',
          teal: '#2f7d72',
          water: '#4cc4d4',
          palm: '#5aa469',
        },
        // Wailing Caverns — overgrown, bioluminescent, deep water
        cavern: {
          moss: '#6f8f3f',
          fern: '#3f7a4a',
          glow: '#7ff0c0', // bioluminescent spore light
          pool: '#1c6f68',
          deep: '#0c3b3a',
          stone: '#2a2118',
        },
        dusk: {
          rose: '#d98a6a',
          violet: '#6b4a6e',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(231, 178, 76, 0.45)',
        card: '0 8px 30px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'dune': 'radial-gradient(120% 80% at 50% 0%, rgba(231,178,76,0.18) 0%, rgba(231,178,76,0) 55%), linear-gradient(180deg, #1f150c 0%, #130d07 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '20%': { opacity: '0.9' },
          '80%': { opacity: '0.7' },
          '100%': { transform: 'translateY(-26px) translateX(4px)', opacity: '0' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0.6)', opacity: '0.6' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        floatUp: 'floatUp 0.4s ease-out both',
        sway: 'sway 6s ease-in-out infinite',
        drift: 'drift 7s ease-in-out infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        ripple: 'ripple 4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
