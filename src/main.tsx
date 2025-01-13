import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import App from "@/app.tsx";

const root = createRoot(document.getElementById("root")!);
const host = window.location.hostname.includes("localhost");

function renderRoot(instance: Root): void {
  let app = <App />;

  if (host) app = <StrictMode children={<App />} />;

  return instance.render(app);
}

renderRoot(root);
