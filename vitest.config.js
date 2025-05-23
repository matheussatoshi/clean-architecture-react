import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      watch: false,
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "istanbul",
        reporter: ["text", "lcov"],
        include: ["tests/**/*.{ts,tsx}"],
        exclude: ["tests/**/*.d.ts"],
      },
    },
  }),
);
