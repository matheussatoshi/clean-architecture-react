import { AuthenticationEntity } from "@/data/usecases/authentication/domain/authentication.dto";
import { TupleForwarded } from "@/infra/lib/tuple-it";

export interface AuthenticationMiddlewareContract {
  signIn(
    params: AuthenticationEntity.Credentials,
  ): TupleForwarded<AuthenticationEntity.Session>;
  signUp(
    params: AuthenticationEntity.Credentials,
  ): TupleForwarded<AuthenticationEntity.Meta>;
  refreshToken(
    params: AuthenticationEntity.RefreshToken,
  ): TupleForwarded<AuthenticationEntity.SessionToken>;
}
