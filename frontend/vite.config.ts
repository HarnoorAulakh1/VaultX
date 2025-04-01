import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url"; // Import helper function
import path from "node:path"; // Import path module
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url); // Get file path
const __dirname = path.dirname(__filename); // Get directory path

export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "index.html"), 
        background: path.resolve(__dirname, "src/background.ts"), 
        contentScript: path.resolve(__dirname, "src/contentScript.ts"), 
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
