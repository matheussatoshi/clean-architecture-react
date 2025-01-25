import { faker } from "@faker-js/faker";

export const mockedData = () => ({
  id: faker.string.uuid(),
  username: faker.internet.username(),
  fullName: faker.person.fullName(),
  gender: faker.person.gender(),
  bio: faker.person.bio(),
});

export const mockResponse = (data: any) => {
  return { data };
};

export const mockResolvedValue = (
  success: boolean,
  error: string | null,
  data: any,
) => {
  return [success, error, data];
};
