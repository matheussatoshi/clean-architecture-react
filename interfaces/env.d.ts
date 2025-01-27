declare namespace NodeJS {
  interface ProcessEnv {
    VITE_DEV_BASE_URL: string;
    VITE_PROD_BASE_URL: string;
    VITE_MODE: "production" | "devolopment";
    VITE_API_TIMEOUT: number;
  }
}
