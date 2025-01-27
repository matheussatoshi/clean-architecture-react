import { makeURL } from "@/main/factories/http";

const defaultConfig = {
  api: {
    url: makeURL(),
    timeout: process.env.API_TIMEOUT,
  },
  storage: {
    keys: {},
  },
};

export default defaultConfig;
