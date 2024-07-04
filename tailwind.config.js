/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}"],
  theme: {
    screens:{
      sm:'576px',
      md:'768px',
      lg:'992px',
      xl:'1200px',
    },
    container:{
      center:true,
      padding:'1rem',
    },
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        roboto: "'Roboto', sans-serif",
      },
      colors:{
        primary: "#FD3D57",
        grey : "#D3D3D3"
      },
      backgroundImage: {
        'test-img': "url('../public/images/jordan_homescreen.webp')",
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

