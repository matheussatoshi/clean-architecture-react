import { Config } from "jest";

const jestConfig: Config = {
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: ["<rootDir>/tests/**/*.{test|spec}.{ts,tsx}"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  verbose: true,
};

export default jestConfig;
