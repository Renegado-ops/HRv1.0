import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración compatible con el entorno virtual de StackBlitz
export default defineConfig({
  plugins: [react()],
});
