import { Config as JestConfig } from "jest";

const config: JestConfig = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*",
    "!<rootDir>/src/**/index.ts",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/main/config/jest-setup.ts"],
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  moduleNameMapper: {
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
  verbose: true,
};

export default config;
