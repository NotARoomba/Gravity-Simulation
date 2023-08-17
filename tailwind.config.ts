import type { Config } from 'tailwindcss'

export default {
  content: ["./src/tsx/*.{js,jsx,ts,tsx}", './index.html', './src/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
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

