import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      "blue": {
        DEFAULT: "#5B0AE1",
        "300": "#6B63C4"

      },
      "gray": {
        DEFAULT: "#F8F9FE",
        "100": "#F2F2F2",
        "150": "#F8F9FE", 
        "200": "#E5E3FF",
        "500": "#747373",
        "800": "#2F2F2F"
      },
      "green": {
        DEFAULT: "#28B446"
      }
    }, 
    extend: {
      fontSize: {
        "4xl": "2.25rem"
      }
    },
  },
  plugins: [],
}
export default config
