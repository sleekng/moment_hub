/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    
    extend: {

      fontFamily: {
        sans: ['Mukta', 'sans-serif']
      },

      colors: {
        primaryColor: '#E567F8',
        secondaryColor: '#111B21',
        primaryBackground: '#FEF9F2',
        primaryMainBright: '#FEF4FF',

  
      },
    },
  },
  plugins: [],
}
