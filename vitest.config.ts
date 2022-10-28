import { defineConfig } from "vitest/config";
import reactPlugin from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@components": path.resolve(__dirname, "src/components/index.ts"),
      "@contexts": path.resolve(__dirname, "src/contexts/index.ts"),
      "@utils": path.resolve(__dirname, "src/utils/index.ts"),
      "@codegen/graphql": path.resolve(
        __dirname,
        "src/graphql/generated/graphql.tsx"
      ),
      "@codegen/page": path.resolve(
        __dirname,
        "src/graphql/generated/page.tsx"
      ),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts", "./src/tests/vitest-setup.js"],
    coverage: {
      all: true,
      provider: "istanbul",
      exclude: [
        "src/graphql/",
        "node_modules/",
        "src/lib/",
        "src/hooks/useCart.ts",
        "src/hooks/useOrder.ts",
        "src/hooks/useFilter.ts",
        "src/hooks/useScroll.ts",
        "src/pages/_app.tsx",
        "src/pages/_document.tsx",
      ],
      include: ["src/"],
    },
  },
});
