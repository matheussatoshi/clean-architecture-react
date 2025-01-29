import { faker } from "@faker-js/faker";

const generatePerson = () => ({
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  id: faker.string.uuid(),
});

export const mockData = () => ({
  array: [generatePerson(), generatePerson()],
  one: generatePerson(),
});
