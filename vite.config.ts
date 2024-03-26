import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "package"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    port: 3500,
  },
});
