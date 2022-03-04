module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
}
