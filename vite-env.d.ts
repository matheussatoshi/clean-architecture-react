/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_DEV_BASE_URL: string;
  VITE_PROD_BASE_URL: string;
  VITE_MODE: "production" | "development";
  VITE_API_TIMEOUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
