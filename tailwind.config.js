/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px',
      '20' : '20px'
    },
    extend: {
      "colors":{
        "techno":{
          "black":" #030C0C",
          "green": "#284B4D",
          "jungle": "#214040",
          "dark-green": "#192928",
          "gold": "#AC9053",
          "dark-gold": "#7B663A",
          "yellow": "#D3B166",
          "white": "#CED1DA",
          "navy": "#2B2E63",
          "sky": "#798DC5",
          "turquoise": "#57ADBF"
        }
      }
    },
  },
  plugins: [],
}

