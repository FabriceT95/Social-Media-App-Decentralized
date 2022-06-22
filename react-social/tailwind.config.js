/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,js,jsx}"],
  
  theme: {

    extend: {
      colors: {
        'mainPurple': "#5458F7",
        'mainBackground': "#191A1D",
        'primaryHeadline': "#FFFFFF",
        'secondaryHeadline': "#9597A1",
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
