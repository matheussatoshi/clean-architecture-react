import { AuthenticationProvider } from "@/data/providers/authentication";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <AuthenticationProvider>
      <Outlet />
    </AuthenticationProvider>
  );
}
