/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      fondo: '#023047',
      primario: '#ffb703',
      secundario: '#fb8500'
    },
    extend: {}
  },
  plugins: [require('daisyui')]
}
