import { makeURL } from "@/main/factories/http";

export type APIConfig = typeof apiConfig;
export type LuggageTagStrategy = typeof storageKeys;

type Config = {
  api: APIConfig;
  tags: LuggageTagStrategy;
};

const apiConfig = {
  url: makeURL(),
  timeout: import.meta.env.VITE_API_TIMEOUT,
} as const;

const storageKeys = {
  "@session": "session",
  "@refreshToken": "refreshToken",
} as const;

function defaultConfig(): Config {
  return {
    api: apiConfig,
    tags: storageKeys,
  };
}

export default defaultConfig;
