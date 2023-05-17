/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs:"250px",
      sm: "640px",
      md: "768px"
    },
    extend: {
      fontFamily: {
        fre: ["Fredoka One Regular"],
      },
    },
  },
  plugins: [],
};