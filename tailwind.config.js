/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      // sm: "768px",
      md: "1024px",
      xl: "1440px",
      xxl: "2160px"

      // onlyMobile: { max: "767.98px" },
      // onlyDesktop: { min: "1280px" },
      // mdOnly: { min: "768px", max: "1279.98px" },
      // xlOnly: { min: "1280px", max: "1727.98px" },
      // notXl: { max: "1279.98px" },
      // notXxl: { max: "1727.98px" },
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

        // MAIN TEXT
        textPrimary: "var(--text-primary-color)",
        textSecondary: "var(--text-secondary-color)",

        // OTHER COLORS
        accentPrimary: "var(--accent-primary-color)", // blue #0057FF
        accentSecondary: "var(--accent-secondary-color)", // dark #191919

        black: {
          DEFAULT: "#000000",
          main: "#252525",
          dark: "#292929",
          medium: "#B2B2B2",
          light: "#7B7B7B"
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
          400: "#3C3D45"
        },
        green: {
          100: "#00B69B",
          200: "#3ECF09"
        },
        pink: {
          100: "#D21788"
        },
        orange: {
          primary: "#F08F00"
        },
        blue: {
          primary: "#00229B",
          100: "#1492FF"
        },
        red: { primary: "var(--accent-primary-red)" },
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
          xl: "3rem",
          xxl: "4rem"
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
