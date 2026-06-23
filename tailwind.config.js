import typography from '@tailwindcss/typography'

/**
 * Design tokens live in src/style.css (:root).
 * Prefer semantic classes (.title-section, .accent-rule, .page-section) over ad-hoc utilities.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--c-surface) / <alpha-value>)',
          elevated: 'rgb(var(--c-surface-elevated) / <alpha-value>)',
          muted: 'rgb(var(--c-ink) / 0.03)',
        },
        line: {
          DEFAULT: 'rgb(var(--c-ink) / var(--alpha-divider))',
          strong: 'rgb(var(--c-ink) / var(--alpha-divider-strong))',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          muted: 'rgb(var(--c-ink-muted) / <alpha-value>)',
          subtle: 'rgb(var(--c-ink-subtle) / <alpha-value>)',
        },
        brand: {
          50: 'rgb(var(--c-brand-50) / <alpha-value>)',
          100: 'rgb(var(--c-brand-100) / <alpha-value>)',
          200: 'rgb(var(--c-brand-200) / <alpha-value>)',
          300: 'rgb(var(--c-brand-300) / <alpha-value>)',
          400: 'rgb(var(--c-brand-400) / <alpha-value>)',
          500: 'rgb(var(--c-brand-500) / <alpha-value>)',
          600: 'rgb(var(--c-brand-600) / <alpha-value>)',
          700: 'rgb(var(--c-brand-700) / <alpha-value>)',
          900: 'rgb(var(--c-brand-900) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          soft: 'rgb(var(--c-accent-soft) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        gallifreyan: ['var(--font-gallifreyan)'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        glow: 'var(--glow-accent)',
        media: 'var(--shadow-media)',
        cover: 'var(--shadow-cover)',
      },
      maxWidth: {
        content: '64rem',
        prose: '42rem',
        article: '48rem',
      },
      transitionDuration: {
        280: '280ms',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.ink.muted'),
            '--tw-prose-headings': theme('colors.ink.DEFAULT'),
            '--tw-prose-lead': theme('colors.ink.muted'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.ink.DEFAULT'),
            '--tw-prose-counters': theme('colors.ink.subtle'),
            '--tw-prose-bullets': theme('colors.ink.subtle'),
            '--tw-prose-hr': theme('colors.line.DEFAULT'),
            '--tw-prose-quotes': theme('colors.ink.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-captions': theme('colors.ink.subtle'),
            '--tw-prose-code': theme('colors.ink.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.ink.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.surface.elevated'),
            '--tw-prose-th-borders': theme('colors.line.strong'),
            '--tw-prose-td-borders': theme('colors.line.DEFAULT'),
            a: {
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.brand.300'),
              },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: 'rgb(var(--c-ink) / 0.06)',
              padding: '0.15rem 0.4rem',
              borderRadius: theme('borderRadius.sm'),
              fontWeight: '400',
            },
            pre: {
              border: '1px solid rgb(var(--c-ink) / var(--alpha-divider))',
              borderRadius: theme('borderRadius.lg'),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
