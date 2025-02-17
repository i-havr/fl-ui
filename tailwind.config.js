/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1280px",
      xxl: "1728px",

      onlyMobile: { max: "767.98px" },
      onlyDesktop: { min: "1280px" },
      mdOnly: { min: "768px", max: "1279.98px" },
      xlOnly: { min: "1280px", max: "1727.98px" },
      notXl: { max: "1279.98px" },
      notXxl: { max: "1727.98px" },
    },
    extend: {
      fontFamily: {
        onest: ["var(--font-onest)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        // BODY BG
        bodyLight: "#F6F6F6",

        // MAIN TEXT
        mainLight: "#252525",

        // OTHER COLORS
        black: {
          DEFAULT: "#000000",
          main: "#252525",
          dark: "#292929",
          medium: "#B2B2B2",
          light: "#7B7B7B",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        gray: {
          DEFAULT: "#9F9F9F",
          100: "#F9F9F9",
          150: "#D3D3D3",
          200: "#F2F2F2",
          250: "#B4B4B4",
          300: "#E4E4E4",
          350: "#8B8B8B",
          400: "#E3E3E3",
          450: "#A5A5A5",
          500: "#D9D9D9",
          550: "#C7C7C7",
          600: "#D7D7D7",
          650: "#CACACA",
          700: "#CBCBCB",
          750: "#EDEDED",
          800: "#9E9E9E",
          850: "#AEAEAE",
          900: "#6A6A6A",
          910: "#FBFBFB",
          950: "#797979",
          960: "#DADADA",
          970: "#A3A3A3",
          980: "#FAFAFA",
          990: "#E7E7E7",
        },
        pink: {
          100: "#D21788",
          200: "#BC157A",
          300: "#A5126B",
          400: "#FFE0F3",
          500: "#D21888",
          600: "#F4CAE3",
          700: "#D61382",
          800: "#FFE8F6",
        },
        orange: {
          primary: "#F08F00",
          secondary: "#FFEBCE",
        },
        blue: {
          primary: "#00229B",
          secondary: "#2B57F2",
          link: "#5879EE",
        },
        notify: {
          error: "#EB001B",
        },
        label: {
          premiere: "#960A5E",
          onsale: "#00BB29",
          end: "#EE9616",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "2rem",
          xl: "3rem",
          xxl: "4rem",
        },
      },
      backgroundImage: {
        bg404: "url('/images/bg404.webp')",
      },
    },
  },
  plugins: [],
};
