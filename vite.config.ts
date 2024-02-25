import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'firebase/analytics': 'firebase/analytics',
      'firebase/app': 'firebase/app',
      'firebase/firestore/lite': 'firebase/firestore/lite',
      'firebase/storage': 'firebase/storage',
      'firebase/auth': 'firebase/auth',
    },
  },
});