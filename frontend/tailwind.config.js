/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],   
  theme: {
    extend: {
      colors: {
        'gray-100-custom': 'var(--color-gray-100)',
        primary: 'var(--color-primary)',
        light: {
          100: 'var(--color-light-100)',
          200: 'var(--color-light-200)',
        },
        gray: {
          100: 'var(--color-gray-100)',
        },
        dark: {
          100: 'var(--color-dark-100)',
        },
      },
    },
  },
  plugins: [],
}
