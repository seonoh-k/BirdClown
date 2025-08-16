/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "100rem"
      },
      colors: {
        bcgreen: "#ABD9BC",
        bcsoftgreen: "#F1F9F4",
        bcyellow: "#FEDB71",
        bcsoftyellow: "#FEEFC2",
        bcblue: "#3E6FA3",
        bclightblue: "#68A1DF",
        bcdeepblue: "#143C66",
        bcsoftblue: "#EEF5FB",
        bcred: "#FC7373",
        bcsoftred: "#FDC4C4"
      },
      fontFamily: {
        'sacheon': ['SacheonHangGong-Regular', 'sans-serif'],
        'cafe': ['Cafe24PROUP', 'sans-serif'],
        'rock': ['SangSangRock', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

