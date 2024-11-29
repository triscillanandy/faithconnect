/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        planSmallScreen: "793px",
        planSmallerScreen: "557px",
        loginScreen: "1025px",
        loginScreen1: "1024px",
        forgotPasswordScreen: "852px",
      },
    },
  },
  plugins: [],
};
