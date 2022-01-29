module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ['Oswald', 'sans-serif']
      },
      colors: {
        'accent-bg': "#2a2a2a",
        'accent-text': "#fff",
        'headings': "#1e1e1e",
        "text": "#888888"
      }
    },
  },
  plugins: [],
}