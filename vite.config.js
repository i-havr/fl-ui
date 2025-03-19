import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: "/fl-ui/",
  plugins: [tailwindcss()]
});
