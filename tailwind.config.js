module.exports = {
  theme: {
    screen: {
      "2xl": "1330px"
    },
    extend: {
      spacing: {
        "18": "4.5rem",
        "28": "7rem",
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
        "100": "28rem"
      }
    }
  },
  variants: {},
  plugins: [require("tailwindcss"), require("autoprefixer")]
};
