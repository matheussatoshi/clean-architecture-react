const host = window.location.hostname.includes("localhost");

const getURL = (): string => {
  let url: string;

  if (host) url = process.env.BASE_URL_DEV;

  return (url = process.env.BASE_URL_PROD);
};

const makeURL = (): string => getURL();

export { getURL, host, makeURL };
