import type { Config } from 'tailwindcss'

export default {
  content: ["./src/tsx/**/*.{js,jsx,ts,tsx}", './index.html', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#264653',
        'light-cyan': '#2A9D8F',
        'yellow-orange': '#F4A261',
        'salmon': '#E76F51',
        'medium-blue': '#277da1',
        'teal': '#43aa8b',
        'darkish-yellow': '#E9C46A',
        'orange-orange': '#f8961e',
        'really-red': '#f94144'
      },
    },
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
} satisfies Config

