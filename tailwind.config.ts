import type { Config } from 'tailwindcss'
import { white, gray, red, green, orange } from 'tailwindcss/colors'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'darkcyan': {
        '50': '#f5f8f7',
        '100': '#ddeae8',
        '200': '#bbd4d2',
        '300': '#90b8b5',
        '400': '#699897',
        '500': '#588b8b',
        '600': '#3e6263',
        '700': '#345051',
        '800': '#2d4142',
        '900': '#283839',
        '950': '#132020',
      },
      'tangerine': {
        '50': '#fef7ee',
        '100': '#fdedd7',
        '200': '#fad8ae',
        '300': '#f7bb7a',
        '400': '#f28f3b',
        '500': '#ef7720',
        '600': '#e05d16',
        '700': '#ba4514',
        '800': '#943818',
        '900': '#773017',
        '950': '#40150a',
      },
      'apricot': {
        '50': '#fef6f2',
        '100': '#ffeae1',
        '200': '#ffd5c2',
        '300': '#febfa3',
        '400': '#fb9a6e',
        '500': '#f27841',
        '600': '#e05d22',
        '700': '#bc4c19',
        '800': '#9b4119',
        '900': '#813b1b',
        '950': '#461c09',
    },
      white,
      gray,
      red,
      green,
      orange,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxHeight: {
        '600': '600px',
      },
      maxWidth: {
        '400': '400px',
      },

    },
  },
  plugins: [],
}
export default config
