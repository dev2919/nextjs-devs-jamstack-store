module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        lora: ['Lora'],
        lato: ['Lato'],
      }
    },
  },
  plugins: [],
}
