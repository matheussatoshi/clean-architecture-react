import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      watch: true,
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
