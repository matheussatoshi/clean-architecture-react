import { generateRoutes } from "../utils/generate-routes";

export const urls = generateRoutes({
  DASHBOARD: "/dashboard",
  SIGN_IN: "/sign-in",
} as const);
