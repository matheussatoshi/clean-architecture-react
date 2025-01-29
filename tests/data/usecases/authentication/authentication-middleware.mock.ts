import { AuthenticationEntity } from "@/data/usecases";
import { AxiosHttpClientAdapter } from "@/infra/http";
import { faker } from "@faker-js/faker";

export const mockSessionData = (): AuthenticationEntity.Session => ({
  AccessToken: faker.internet.jwt(),
  ExpiresIn: 3600,
  TokenType: "Bearer",
  RefreshToken: faker.internet.jwt(),
  meta: {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
  },
  firstLogin: true,
});

export const mockCredentialsData = (): AuthenticationEntity.Credentials => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockHttpClient = (): AxiosHttpClientAdapter => {
  const httpClient = new AxiosHttpClientAdapter();

  httpClient.post = jest.fn().mockImplementation(async ({ url, data }) => {
    if (url === "/login") {
      return mockSessionData();
    } else if (url === "/register") {
      return {
        id: faker.string.uuid(),
        email: data.email,
        name: faker.person.fullName(),
      };
    } else if (url === "/refresh-token") {
      return {
        AccessToken: faker.internet.jwt(),
        ExpiresIn: 3600,
        TokenType: "Bearer",
        RefreshToken: faker.internet.jwt(),
      };
    }
    throw new Error("Unknown URL");
  });

  return httpClient;
};
