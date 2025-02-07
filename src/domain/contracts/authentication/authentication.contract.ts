import { AuthenticationDomain } from "@/data/usecases/authentication/domain/authentication.dto";
import { TupleRequest } from "@/infra/lib/tuple-it";

export interface AuthenticationMiddlewareContract {
  signIn(
    params: AuthenticationDomain.Credentials,
  ): TupleRequest<AuthenticationDomain.Session>;
  signUp(
    params: AuthenticationDomain.Credentials,
  ): TupleRequest<AuthenticationDomain.Meta>;
  refreshToken(
    params: AuthenticationDomain.RefreshToken,
  ): TupleRequest<AuthenticationDomain.SessionToken>;
}
