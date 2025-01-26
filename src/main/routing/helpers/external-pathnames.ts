import { generateRoutes } from "../utils/generate-routes";

export const urls = generateRoutes({
  HOME: "/",
  POST: "/post/:id/:author",
} as const);
