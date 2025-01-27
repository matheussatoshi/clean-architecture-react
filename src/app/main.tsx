import { host } from "@/main/factories/http";
import { routing } from "@/main/routing";
import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

const root = createRoot(document.getElementById("root")!);

function renderRoot(instance: Root): void {
  let app = <RouterProvider router={routing} />;

  if (host) app = <StrictMode children={<RouterProvider router={routing} />} />;

  return instance.render(app);
}

renderRoot(root);
