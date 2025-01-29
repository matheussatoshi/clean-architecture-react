import { ProtectedRoute } from "@/main/proxies/protected-route";
import { PublicRoute } from "@/main/proxies/public-route";
import { Layout } from "@/presentation/layout";
import { Page } from "@/presentation/pages";
import SignInPage from "@/presentation/pages/sign-in/sign-in.page";
import { RouteObject } from "react-router-dom";
import { urls } from "../helpers/external-pathnames";

export const appRoutes: RouteObject[] = [
  {
    element: <Layout.Main />,
    children: [
      {
        path: urls.template["SIGN_IN"],
        element: <PublicRoute render={<SignInPage />} />,
      },
      {
        path: urls.template["DASHBOARD"],
        element: <ProtectedRoute render={<Page.Dashboard />} />,
      },
    ],
  },
];
