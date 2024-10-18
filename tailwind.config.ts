import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customScrollbar: "#131942", // Custom scrollbar color
        customScrollbarHover: "#554205", // Custom hover color
        customScrollbarTrack: "#f1f1f1", // Custom track color
      },
    },
  },
  plugins: [
    function ({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
      addBase({
        // Custom scrollbar styles
        '::-webkit-scrollbar': {
          width: '0px',
          height: '0px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f1f1f1', // Set track color directly
        },
        '::-webkit-scrollbar-thumb': {
          background: '#131942', // Set thumb color directly
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#554205', // Set hover color directly
        },
      });
    },
  ],
};

export default config;
