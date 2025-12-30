const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "img1" : "url('https://img.freepik.com/free-vector/realistic-abstract-football-background_52683-67579.jpg?semt=ais_hybrid')",
        "img2" : "url('https://img.freepik.com/free-vector/soccer-stadium_1284-22432.jpg')",
        "img3" : "url('https://static.dezeen.com/uploads/2014/07/World-Cup-2014-adidas-football-brazuca_dezeenss_1.jpg')"
       },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar'),
  ],
}