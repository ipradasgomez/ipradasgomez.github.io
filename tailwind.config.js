/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        isma: {
          black: 'var(--color-isma-black)',
          orange: 'var(--color-isma-orange)',
          'orange-muted': 'var(--color-isma-orange-muted)',
        },
      },
      fontFamily: {
        isma: ['var(--font-isma-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-isma-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
