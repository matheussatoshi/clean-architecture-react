import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  /* Plugins */
  plugins: [react()],

  /* Alias */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  /* Build Cache */
  cacheDir: "node_modules/.vite-cache",

  /* Build Config */
  build: {
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },

  /* Pre-bundle */
  optimizeDeps: {
    include: ["react", "react-dom"],
  },

  /* Auto-import */
  esbuild: {
    jsxInject: `import React from 'react'`,
  },

  /* Server Config */
  server: {
    port: 3000,
  },
});
