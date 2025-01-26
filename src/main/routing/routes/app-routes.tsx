import { Page } from "@/presentation/pages";
import { RouteObject } from "react-router-dom";
import { urls } from "../helpers/external-pathnames";

export const appRoutes: RouteObject[] = [
  {
    path: urls.template["HOME"],
    element: <Page.Home />,
  },

  {
    path: urls.template["POST"],
    element: <Page.Post />,
  },
];
