/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: '#111111',
        cyan: { DEFAULT: '#0DC9B4', 100: '#0BA890' },
        teal: '#10767E',
        indigo: { 100: '#401F71', 200: '#D9D2E3', 300: '#2E1456' },
        yellow: '#FFC700',
        gray: {
          50: '#F8F8F8',
          100: '#F7F7F7',
          200: '#F2F5FA',
          300: '#EDEDED',
          400: '#DBDBDB',
          500: '#989898',
          600: '#717171',
        },
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
    },
    container: {
      center: true,
      screens: {
        xl: '1184px',
      },
    },
  },
  plugins: [],
}
