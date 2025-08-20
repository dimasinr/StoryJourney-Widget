import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.tsx", 
      name: "StoryjourneyWidget",
      fileName: "storyjourney-widget",
      formats: ["iife"], 
    },
  },
});
