module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  mode: "jit",
  theme: {
    fontFamily: {
      title: "Marcellus, serif",
      regular: "Montserrat, sans-serif",
    },
    extend: {
      backgroundImage: {
        hero: "url('/background.png')",
        about:
          "linear-gradient(rgba(34,32,30,.9), rgba(34,32,30,.9)), url('/background2.jpg') ",
        cart:
          "linear-gradient(rgba(34,32,30,.3), rgba(34,32,30,.3)), url('/cartbackground.jpg') ",
        checkout:
          "linear-gradient(rgba(34,32,30,.3), rgba(34,32,30,.3)), url('/checkout_background.jpg') ",
      },
      colors: {
        dark: "#22201E",
        green: {
          500: "#096843",
        },
        beige: "#FFF9F1",
        gray: {
          200: "#DBDBDB",
        },
        brown: {
          500: "#5A351E",
        },
        blue: {
          700: "#325D63",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
