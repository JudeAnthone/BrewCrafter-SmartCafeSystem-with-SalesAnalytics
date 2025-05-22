/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary': '#3e2723', // Dark Brown
        'light-100': '#f8e8d0', // Cream
        'light-200': '#e4c9a7', // Latte
        'gray-100': '#b5a397', // Warm Gray
        'dark-100': '#1e1b18', // Deep Espresso
      },
    },
  },
  plugins: [],
}