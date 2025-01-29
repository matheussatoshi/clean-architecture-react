import { AuthenticationMiddlewareContract } from "@/domain/contracts/authentication";
import { AxiosHttpClientAdapter } from "@/infra/http";
import { TupleForwarded } from "@/infra/lib/tuple-it";
import { AuthenticationEntity } from "../domain/authentication.dto";

export class AuthenticationMiddleware
  implements AuthenticationMiddlewareContract
{
  private httpClient: AxiosHttpClientAdapter;

  constructor(httpClient: AxiosHttpClientAdapter) {
    this.httpClient = httpClient;
  }

  public async signIn(
    params: AuthenticationEntity.Credentials,
  ): TupleForwarded<AuthenticationEntity.Session> {
    const response = await this.httpClient.post<AuthenticationEntity.Session>({
      url: "/login",
      data: {
        ...params,
      },
    });

    return response;
  }

  public async signUp(
    params: AuthenticationEntity.Credentials,
  ): TupleForwarded<AuthenticationEntity.Meta> {
    const response = await this.httpClient.post<AuthenticationEntity.Meta>({
      url: "/register",
      data: {
        ...params,
      },
    });

    return response;
  }

  public async refreshToken(
    params: AuthenticationEntity.RefreshToken,
  ): TupleForwarded<AuthenticationEntity.SessionToken> {
    const response =
      await this.httpClient.post<AuthenticationEntity.SessionToken>({
        url: "/refresh-token",
        data: {
          ...params,
        },
      });

    return response;
  }
}
