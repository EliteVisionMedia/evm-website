/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0D11',
        paper: '#F4F4F1',
        teal: { DEFAULT: '#019A9D', deep: '#017F82' }, // from the EVM logo; deep = AA button fill
        slate: { DEFAULT: '#6A6E7B', light: '#9A9DA8' },
        mist: '#E6E7EC',
        line: '#D8D9DE',
        coal: '#1A1C25',
      },
      fontFamily: {
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.015em' },
      maxWidth: { site: '1440px' },
    },
  },
  plugins: [],
};
