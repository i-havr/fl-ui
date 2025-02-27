/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      md: "1024px",
      xl: "1440px"
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        manrope: ["Manrope", "sans-serif"]
      },
      colors: {
        // BODY BG
        bgPrimary: "var(--background-primary-color)",
        bgSecondary: "var(--background-secondary-color)",
        bgElementPrimary: "var(--background-element-primary-color)",
        bgBlock: "var(--background-block-color)",

        // MAIN TEXT
        textPrimary: "var(--text-primary-color)",
        textSecondary: "var(--text-secondary-color)",

        // OTHER COLORS

        black: {
          DEFAULT: "#000000",
          primary: "var(--accent-primary-black)"
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#f7f8f8"
        },
        gray: {
          DEFAULT: "var(--text-gray)",
          primary: "var(--text-primary-gray)",
          secondary: "var(--text-secondary-gray)",
          bgButton: "var(--background-button-gray-color)",
          linePrimary: "var(--line-primary-gray)",
          100: "#bfbfbf",
          200: "#828282",
          300: "#3F4046",
          400: "#3C3D45",
          500: "#595959"
        },
        green: {
          100: "#00B69B",
          200: "#3ECF09",
          300: "#08ab92"
        },
        pink: {
          100: "#D21788"
        },
        orange: {
          primary: "#F08F00"
        },
        blue: {
          primary: "var(--accent-primary-blue)",
          100: "#1492FF",
          200: "#2871FF"
        },
        red: {
          primary: "var(--accent-primary-red)",
          secondary: "var(--accent-secondary-red)",
          100: "#FF5981"
        },
        notify: {
          error: "#EB001B"
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "2rem",
          xl: "2.5rem",
          xxl: "2.5rem"
        }
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(265.56deg, #246CF9 -0.27%, #1E68F6 -0.26%, #0047D0 98.59%)"
        // bg404: "url('/images/bg404.webp')"
      }
    }
  },
  plugins: ["prettier-plugin-tailwindcss"]
};
