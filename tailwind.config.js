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
    },
  },
  plugins: [],
}

