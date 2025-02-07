import { AuthenticationDomain } from "@/data/usecases/authentication/domain/authentication.dto";
import { TupleForwarded } from "@/infra/lib/tuple-it";

export interface AuthenticationMiddlewareContract {
  signIn(
    params: AuthenticationDomain.Credentials,
  ): TupleForwarded<AuthenticationDomain.Session>;
  signUp(
    params: AuthenticationDomain.Credentials,
  ): TupleForwarded<AuthenticationDomain.Meta>;
  refreshToken(
    params: AuthenticationDomain.RefreshToken,
  ): TupleForwarded<AuthenticationDomain.SessionToken>;
}
