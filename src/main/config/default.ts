import { makeURL } from "@/main/factories/http";

const defaultConfig = {
  api: {
    url: makeURL(),
    timeout: import.meta.env.VITE_API_TIMEOUT,
  },
  storage: {
    keys: {},
  },
};

export default defaultConfig;
