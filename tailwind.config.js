/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: { 
      colors: {
        // Using modern `rgb`
        primary:          "rgb(var(--color-primary) / <alpha-value>)",
        "primary-soft":   "rgb(var(--color-primary-soft) / <alpha-value>)",
        secondery:        "rgb(var(--color-secondery) / <alpha-value>)",
        bgbody:           "rgb(var(--color-bgbody) / <alpha-value>)",
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        image:{
          '0%':{transform:'translateY(0)'}

        }

      },
      animation: {
        'waving-hand': 'wave 2s linear infinite',
        'image-animation':'image 2s linear infinite'
      },
    },
  },


  plugins: [require("@tailwindcss/forms")],
};