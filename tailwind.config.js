const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  theme: {
    fontFamily: {
      sans: ['CircularStd', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
        80: '20rem',
      },
      maxWidth: {
        '7xl': '80rem',
      },
      boxShadow: {
        'custom-main': '0px 4px 3px rgba(0, 0, 0, 0.05)',
        'custom-main-2': '0px 2px 3px rgba(0, 0, 0, 0.1)',
      },
      margin: {
        9: '2.125rem',
        '0-2': '0.2px',
      },
      inset: {
        0: 0,
        12: '3rem',
        64: '16rem',
        '1/5': '20%',
      },
      colors: {
        'custom-primary': '#68387d',
        'custom-white': '#f9f9fa',
        'custom-white-2': '#f8f3f8',
        'custom-pink': '#FAC6C8',
        'custom-pink-2': '#fde3e4',
        'custom-red': '#c91f30',
        'custom-orange': '#FF6E29',
        'custom-green': '#00AF1E',
        'custom-blue': '#007AFF',
        'custom-blue-2': '#8fd0ef',
        'custom-blue-3': '#d3e8f6',
        'custom-dark': '#473A3A',
        'custom-dark-2': 'rgba(0, 0, 0, 0.8)',
        'custom-dark-3': '#5C5C5C',
        'custom-dark-4': '#3A3B3F',
        'custom-dark-5': 'rgb(0,0,0, 0.7)',
        'custom-sec': '#F8F8F9',
        'custom-sec-1': '#F3F4F5',
        'custom-border': '#E0E3EA',
        'custom-text': '#9CA0A7',
        'custom-text-2': '#7C858D',
        'custom-text-3': '#343737',
        'custom-text-4': '#5D6464',
        'custom-text-5': '#2D4047',
      },
      fontFamily: {},
      fontSize: {
        xss: '.55rem',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js',
  ],
}
