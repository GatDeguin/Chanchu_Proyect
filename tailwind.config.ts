
import { defineConfig } from 'tailwindcss';

export default defineConfig({
  content: ['./src/**/*.{html,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'system-ui']
      },
      colors: {
        primary: 'var(--color-primary)',
      }
    }
  },
  plugins: []
});
