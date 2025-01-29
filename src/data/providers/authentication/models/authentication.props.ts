import { AuthenticationEntity } from "@/data/usecases";

export interface AuthenticationContextProps {
  session?: AuthenticationEntity.Session;
  handleSignIn: (params: AuthenticationEntity.Credentials) => Promise<void>;
  handleSignUp: (params: AuthenticationEntity.Credentials) => Promise<void>;
  handleRefreshToken: (
    params: AuthenticationEntity.RefreshToken,
  ) => Promise<void>;
}
