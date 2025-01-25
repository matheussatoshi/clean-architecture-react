import { faker } from "@faker-js/faker";

export const mockStorageData = (): [string, string] => {
  const key = "CREDENTIALS";
  const data = JSON.stringify({
    AccessToken: faker.string.uuid(),
    RefreshToken: faker.string.uuid(),
    TokenType: "Bearer",
    ExpiresIn: faker.number.int({ min: 3600, max: 86400 }),
  });

  return [key, data];
};
