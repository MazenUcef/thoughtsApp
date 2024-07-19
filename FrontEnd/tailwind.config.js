/** @type {import('tailwindcss').Config} */
import daisyUIThemes from 'daisyui/src/theming/themes'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#35465d',
        secondary: '#ffffff',
        third: '#ff9900',
        fourth:"#333333",
        fifth:"#bbbbbb",
        sixth:"#666666",
        seventh:"#f9f9f9",
        eighth:"#d3d3d3",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes:[
      "light",
      {
        black:{
          ...daisyUIThemes["black"],
          primary:"#35465d",
          secondary: "#ffffff",
          third:"#bd081c"
        }
      }
    ]
  }
}