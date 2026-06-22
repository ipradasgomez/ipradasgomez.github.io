/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          muted: 'var(--color-surface-muted)',
        },
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          900: 'var(--color-brand-900)',
        },
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
      transitionDuration: {
        280: '280ms',
      },
    },
  },
  plugins: [],
}
