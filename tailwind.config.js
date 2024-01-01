/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'title': '#c55959',
      },
    }
  },
  plugins: [require("daisyui")],
}

