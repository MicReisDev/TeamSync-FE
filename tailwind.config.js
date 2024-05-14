export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: "#0069ff",
        azulQuasePreto: "#0d1321",
        azulMaisClaro: "#1d2d44",
        laranjaPrimario: "#FCA311",
        verdePrimario: "#AFFC41",
        magentaPrimario: "#FF006E",
        richBlack: "#0D1321",
        prussianBlue: "#1D2D44",
        paynesGray: "#3E5C76",
        graucous: "#7488A7",
        frenchGray: "#BAC4D3",
        aliceBlue: "#DDE2E9",
        yaleBlue: "#003580"
      },
    },
    fontFamily: {
      sans: ['SF Pro', 'sans-serif'],
      serif: ['SF Pro', 'sans-serif'],
    },
  },
  plugins: [],
}
