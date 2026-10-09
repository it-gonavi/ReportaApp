/** NativeWind v4 + TailwindCSS 3 */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#051428', surface: '#0D223A', outline: '#2C425E',
        navy: '#061529', blue: '#078CFF', cyan: '#0FD9F2',
        electric: '#FFC329', water: '#427DFD', road: '#FF655B', climate: '#00D2BD',
      },
    },
  },
  plugins: [],
};
