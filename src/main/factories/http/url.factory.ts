const MODE = import.meta.env.VITE_MODE.includes("development");
const DOMAIN = window.location.hostname.includes("localhost");

const host = MODE || DOMAIN;

const makeURL = (): string => {
  if (host) return import.meta.env.VITE_DEV_BASE_URL;
  return import.meta.env.VITE_PROD_BASE_URL;
};

export { host, makeURL };
