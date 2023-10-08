/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        tb_lg: { max: "1070px" },
        tb_sm: { max: "834px" },
        ph_lg: { max: "640px" },
      },
      colors: {
        "dominant-1": "var(--kuui-dominant-1)",
        "dominant-1-50": "color-mix(in srgb,var(--kuui-dominant-1) 50%, transparent)",
        "black-500": "var(--kuui-black-500)",
        "black-250": "var(--kuui-black-250)",
      }
    },
  },
  plugins: [],
}

