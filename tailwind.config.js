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
        hero: "url('/background.jpg')",
        about:
          "linear-gradient(rgba(34,32,30,.9), rgba(34,32,30,.9)), url('/background2.jpg') ",
        cart:
          "linear-gradient(rgba(34,32,30,.3), rgba(34,32,30,.3)), url('/cartbackground.jpg') ",
        checkout:
          "linear-gradient(rgba(34,32,30,.3), rgba(34,32,30,.3)), url('/checkout_background.jpg') ",
      },
      animation: {
        "ltr-linear-infinite": "move-bg 10s infinite",
      },
      keyframes: {
        "move-bg": {
          "0%": { "background-size": "100%" },
          "100%": { "background-size": "110%" },
        },
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
        orange: {
          500: "#C8653B",
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
