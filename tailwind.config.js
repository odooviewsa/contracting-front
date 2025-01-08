/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grayColor: "#7F7F7F",
        primaryColor: "#06385C",
        bgWhite: "#F5FAFE",
        bgInput: "#F1F2F7",
        colorTextValueItem: "#6E6893",
        bgOverlay: "#13121233",
        textLabalForm: "#030229",
      },
      screens: {
        smm: { min: "100px", max: "600px" },
      },
    },
  },
  plugins: [],
};

