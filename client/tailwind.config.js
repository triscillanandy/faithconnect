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
        landingPageScreenFirstBreakPoint: "1336px",
        landingPageScreenSecondBreakPoint: "636px",
        landingPageThirdScreenBreakPoint: "429px",
        landingPageScreenFourthBreakPoint: "403px",
        validationBreakPoint: "785px",
        loggedInScreen: "833px",
      },
      fontFamily: {
        inika: "inika",
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        mainTheme: "#FF6132",
      },
    },
  },
  plugins: [],
};
