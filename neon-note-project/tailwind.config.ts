import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        flute: 'flute 1.5s ease-in-out infinite',
      },
      keyframes: {
        flute: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }, // Altere o valor conforme necessário para ajustar o movimento
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'], // Define a fonte Poppins como opção
      },
      screens: {
        xs: "320px",
        sm: "560px",
        md: "768px",
        lg: "960px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          "100": "#454545",
          "200": "#262626",
          "300": "#000000",
        },
        neon: {
          "50": "#ebf5ff",
          "100": "#d2e8ff",
          "200": "#afd7ff",
          "300": "#78c0ff",
          "400": "#389cff",
          "500": "#0b70ff",
          "600": "#004aff",
          "700": "#0031ff",
          "800": "#0027d4",
          "900": "#0229a6",
          "950": "#07195f",
        },

        slate: {
          900: "#0f172a",
        },

        black: {
          "50": "#f2f2f2",
          "100": "#e6e6e6",
          "200": "#cccccc",
          "300": "#b3b3b3",
          "400": "#999999",
          "500": "#808080",
          "600": "#666666",
          "700": "#4d4d4d",
          "800": "#333333",
          "900": "#1a1a1a",
          "950": "#212121",
        },
      },
    },
  },
  plugins: [],
};
export default config;
