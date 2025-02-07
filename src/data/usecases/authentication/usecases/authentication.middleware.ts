import { AuthenticationMiddlewareContract } from "@/domain/contracts/authentication";
import { AxiosHttpClientAdapter } from "@/infra/http";
import { TupleForwarded } from "@/infra/lib/tuple-it";
import { AuthenticationDomain } from "../domain/authentication.dto";

export class AuthenticationMiddleware
  implements AuthenticationMiddlewareContract
{
  private httpClient: AxiosHttpClientAdapter;

  constructor(httpClient: AxiosHttpClientAdapter) {
    this.httpClient = httpClient;
  }

  public async signIn(
    params: AuthenticationDomain.Credentials,
  ): TupleForwarded<AuthenticationDomain.Session> {
    const response = await this.httpClient.post<AuthenticationDomain.Session>({
      url: "/login",
      data: {
        ...params,
      },
    });

    return response;
  }

  public async signUp(
    params: AuthenticationDomain.Credentials,
  ): TupleForwarded<AuthenticationDomain.Meta> {
    const response = await this.httpClient.post<AuthenticationDomain.Meta>({
      url: "/register",
      data: {
        ...params,
      },
    });

    return response;
  }

  public async refreshToken(
    params: AuthenticationDomain.RefreshToken,
  ): TupleForwarded<AuthenticationDomain.SessionToken> {
    const response =
      await this.httpClient.post<AuthenticationDomain.SessionToken>({
        url: "/refresh-token",
        data: {
          ...params,
        },
      });

    return response;
  }
}
