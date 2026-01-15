/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F5',      // Base clara
        wine: '#4A1520',       // Vinho Nobre
        wineLight: '#5D1924',  // Vinho mais claro para gradiente
        gold: '#C8A678',       // Dourado Luxo
        bodyText: '#333333',   // Texto leitura (Cinza Escuro)
        whiteSoft: '#FAFAFA',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(200, 166, 120, 0.4)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'soft': '0 2px 10px rgba(0,0,0,0.03)',
      }
    },
  },
  plugins: [],
}
