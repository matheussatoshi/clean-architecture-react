import {
  AuthenticationEntity,
  AuthenticationMiddleware,
} from "@/data/usecases";
import { AxiosHttpClientAdapter } from "@/infra/http";
import { faker } from "@faker-js/faker";
import {
  mockCredentialsData,
  mockSessionData,
} from "./authentication-middleware.mock";

type SutTypes = {
  sut: AuthenticationMiddleware;
  httpClient: AxiosHttpClientAdapter;
};

const makeSut = (): SutTypes => {
  const httpClient = new AxiosHttpClientAdapter();
  const sut = new AuthenticationMiddleware(httpClient);
  return {
    sut,
    httpClient,
  };
};

describe("AuthenticationMiddleware", () => {
  describe("signIn", () => {
    it("should call the HTTP client with the correct parameters and return a session", async () => {
      const { sut, httpClient } = makeSut();

      const credentials: AuthenticationEntity.Credentials =
        mockCredentialsData();

      const mockResponse = mockSessionData();

      const result = await sut.signIn(credentials);

      // Verifica se o método post foi chamado corretamente
      expect(httpClient.post).toHaveBeenCalledWith({
        url: "/login",
        data: { ...credentials },
      });

      expect(result).toEqual(mockResponse);
    });

    it("should handle error when the HTTP client fails", async () => {
      const { sut, httpClient } = makeSut();

      const credentials: AuthenticationEntity.Credentials =
        mockCredentialsData();

      // Simulando um erro de rede
      httpClient.post = jest
        .fn()
        .mockRejectedValue(new Error("Request failed"));

      await expect(sut.signIn(credentials)).rejects.toThrow("Request failed");
    });
  });

  describe("signUp", () => {
    it("should call the HTTP client with the correct parameters and return meta", async () => {
      const { sut, httpClient } = makeSut();

      const credentials: AuthenticationEntity.Credentials =
        mockCredentialsData();

      const mockResponse = {
        id: faker.string.uuid(),
        email: credentials.email,
        name: faker.person.fullName(),
      };

      // Mockando a resposta para a função 'post'
      httpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await sut.signUp(credentials);

      expect(httpClient.post).toHaveBeenCalledWith({
        url: "/register",
        data: { ...credentials },
      });

      expect(result).toEqual(mockResponse);
    });
  });

  describe("refreshToken", () => {
    it("should call the HTTP client with the correct parameters and return a session token", async () => {
      const { sut, httpClient } = makeSut();

      const refreshToken: AuthenticationEntity.RefreshToken = {
        token: "refresh_token_example",
      };

      const mockResponse: AuthenticationEntity.SessionToken = {
        AccessToken: faker.internet.jwt(),
        ExpiresIn: 3600,
        TokenType: "Bearer",
        RefreshToken: faker.internet.jwt(),
      };

      // Mockando a resposta para a função 'post'
      httpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await sut.refreshToken(refreshToken);

      expect(httpClient.post).toHaveBeenCalledWith({
        url: "/refresh-token",
        data: { ...refreshToken },
      });

      expect(result).toEqual(mockResponse);
    });
  });
});
