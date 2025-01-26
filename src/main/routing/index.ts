import { createBrowserRouter } from "react-router-dom";
import { urls } from "./helpers/external-pathnames";
import { appRoutes } from "./routes/app-routes";

const routing = createBrowserRouter([...appRoutes]);

export { routing, urls };
