import { defineConfig } from "vitest/config";
import reactPlugin from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [reactPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      all: true,
      provider: "istanbul",
      exclude: ["src/graphql/", "node_modules/", "src/lib/"],
      include: ["src/"],
    },
  },
});