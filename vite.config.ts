import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./", import.meta.url)),
      },
      {
        find: '@tabler/icons-react',
        replacement: '@tabler/icons-react/dist/esm/icons/index.mjs',
      },
    ],
  },
});
