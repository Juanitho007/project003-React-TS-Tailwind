/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "250px",
      sm: "640px",
      md: "768px",
    },
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(256px, 1fr))",
      },
      fontFamily: {
        fre: ["Fredoka One Regular"],
      },
    },
  },
  plugins: [],
};
