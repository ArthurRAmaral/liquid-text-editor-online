import { defineConfig } from "vite";
import packageJson from "./package.json";

export default defineConfig({
  base: `/${packageJson.name}/`,
});

