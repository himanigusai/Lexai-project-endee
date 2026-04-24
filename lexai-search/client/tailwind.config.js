/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#081120',
        navy: '#0e2342',
        gold: '#d4a94f',
        mist: '#d8e2f0'
      },
      boxShadow: {
        glass: '0 24px 60px rgba(8, 17, 32, 0.22)'
      },
      fontFamily: {
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(212, 169, 79, 0.16), transparent 32%), radial-gradient(circle at top right, rgba(73, 112, 196, 0.2), transparent 28%), linear-gradient(135deg, rgba(8, 17, 32, 0.98), rgba(14, 35, 66, 0.92))'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s ease forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

