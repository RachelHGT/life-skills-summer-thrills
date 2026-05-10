import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Refined palette: nature, growth, wellness ──
        // Primary: muted forest teal (richer than logo, more wellness-y)
        teal: {
          DEFAULT: '#2A8074',
          50:  '#F0F7F5',
          100: '#DCEDE8',
          200: '#B8DBD2',
          300: '#88C2B5',
          400: '#5AA395',
          500: '#2A8074',
          600: '#23685F',
          700: '#1B524B',
          800: '#143E38',
          900: '#0E2A26',
        },
        // Secondary: warm sand/cream
        sand: {
          50:  '#FBF8F3',
          100: '#F6F1E8',
          200: '#EEE5D2',
          300: '#E3D5B8',
          400: '#D2BD92',
          500: '#B89D6A',
        },
        cream: {
          DEFAULT: '#FBF8F3',
          dark: '#F4EDDF',
        },
        // Brand colors (from logo) — used sparingly
        brand: {
          blue: '#2E7DC6',
          'blue-light': '#5AA0DD',
          'blue-dark': '#1F5C99',
          green: '#2A8074',
          'green-light': '#5AA395',
          'green-dark': '#1B524B',
          coral: '#E85A4F',
          'coral-dark': '#C9463C',
        },
        // CTA accent
        coral: {
          DEFAULT: '#E85A4F',
          dark: '#C9463C',
          light: '#F4837A',
        },
        // Typography
        ink: {
          DEFAULT: '#1F2937',
          50:  '#F8F9FA',
          100: '#EAECEE',
          200: '#C7CCD1',
          300: '#9CA3AB',
          400: '#6B7480',
          500: '#4B5563',
          600: '#374151',
          700: '#28323D',
          900: '#1F2937',
        },
        // Sage tints (for soft backgrounds)
        sage: {
          50:  '#F4F8F5',
          100: '#E8EFE9',
          200: '#CFDFD1',
          300: '#A8C5AC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Modern scale — tighter than default
        'display-xl': ['clamp(48px, 6vw, 80px)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(36px, 4.5vw, 60px)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(28px, 3.5vw, 44px)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(22px, 2.5vw, 32px)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        // Soft, premium shadows
        'card-sm':  '0 1px 2px rgba(15,27,26,0.04), 0 4px 12px rgba(15,27,26,0.04)',
        'card':     '0 2px 4px rgba(15,27,26,0.04), 0 8px 24px rgba(15,27,26,0.06)',
        'card-lg':  '0 4px 8px rgba(15,27,26,0.05), 0 16px 40px rgba(15,27,26,0.08)',
        'card-xl':  '0 8px 16px rgba(15,27,26,0.06), 0 24px 60px rgba(15,27,26,0.10)',
        'cta':      '0 4px 14px rgba(232,90,79,0.3)',
        'cta-hover':'0 8px 24px rgba(232,90,79,0.4)',
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
        'card-xl': '32px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
