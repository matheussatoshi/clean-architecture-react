import { AuthenticationDomain } from "@/data/usecases";

export interface AuthenticationContextProps {
  session?: AuthenticationDomain.Session;
  handleSignIn: (params: AuthenticationDomain.Credentials) => Promise<void>;
  handleSignUp: (params: AuthenticationDomain.Credentials) => Promise<void>;
  handleRefreshToken: (
    params: AuthenticationDomain.RefreshToken,
  ) => Promise<void>;
}
