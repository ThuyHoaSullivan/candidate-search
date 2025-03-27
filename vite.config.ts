import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': process.env, // Ensure process.env is accessible
  },
});


