import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: "src/index.tsx",
      name: "StoryJourneyWidget",
      fileName: "storyjourney-widget",
      formats: ["iife"],
    },
  },
});
