export const generateRoutes = <T extends Record<string, string>>(routes: T) => {
  const template = { ...routes } as {
    [K in keyof T]: T[K];
  };

  const redirect = Object.fromEntries(
    Object.entries(routes).map(([key, value]) => [
      key,
      value.replace(/:([a-zA-Z0-9_]+)/g, "").replace(/\/+$/, ""),
    ]),
  ) as {
    [K in keyof T]: string;
  };

  return {
    template,
    redirect,
  };
};
