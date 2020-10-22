module.exports = {
  purge: [],
  theme: {
    extend: {},
    height: {
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
};
