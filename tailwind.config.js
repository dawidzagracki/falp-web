/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7DD13F',
          light: '#9CE65A',
          dark: '#5BA82A',
          glow: '#A8FF6C',
          text: '#46901F' // ciemniejsza zieleń pod tekst na bieli (kontrast WCAG)
        },
        // Jasne powierzchnie
        paper: '#F7F9F4',   // główne tło strony (off-white z zielonym podtonem)
        cream: '#EDF2E6',   // drugorzędna powierzchnia / sekcje
        surface: '#FFFFFF', // karty
        // Tekst (ciemny, zielono-podbarwiony)
        ink: {
          900: '#0F1B0A',
          800: '#1B2A12',
          700: '#2C3A23',
          600: '#3E4D33',
          muted: '#5A6B50'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'fluid-h1': 'clamp(2.75rem, 7.5vw, 6rem)',
        'fluid-h2': 'clamp(2rem, 5vw, 3.75rem)',
        'fluid-h3': 'clamp(1.5rem, 3vw, 2.25rem)'
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 40s linear infinite reverse',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'led-pulse': 'ledPulse 2.4s ease-in-out infinite',
        'eq': 'eq 0.9s ease-in-out infinite',
        'beam': 'beam 6s ease-in-out infinite',
        'confetti': 'confetti 3.6s linear infinite',
        'drift': 'drift 16s ease-in-out infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(8%, -10%) scale(1.15)' },
          '66%': { transform: 'translate(-8%, 8%) scale(0.92)' }
        },
        ledPulse: {
          '0%, 100%': { opacity: '0.12' },
          '50%': { opacity: '1' }
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.25)' },
          '50%': { transform: 'scaleY(1)' }
        },
        beam: {
          '0%': { opacity: '0.15', transform: 'rotate(-14deg)' },
          '50%': { opacity: '0.55', transform: 'rotate(10deg)' },
          '100%': { opacity: '0.15', transform: 'rotate(-14deg)' }
        },
        confetti: {
          '0%': { transform: 'translateY(10px) rotate(0deg)', opacity: '0' },
          '12%': { opacity: '1' },
          '100%': { transform: 'translateY(-130px) rotate(260deg)', opacity: '0' }
        },
        drift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(14px,-18px)' }
        }
      },
      boxShadow: {
        'glow-brand': '0 12px 40px -12px rgba(125,209,63,0.45)',
        'glow-brand-lg': '0 24px 70px -18px rgba(125,209,63,0.5)',
        'soft': '0 4px 24px -12px rgba(15,27,10,0.12)',
        'soft-lg': '0 24px 60px -24px rgba(15,27,10,0.18)',
        'card-hover': '0 30px 70px -28px rgba(15,27,10,0.25)'
      }
    }
  },
  plugins: []
}
