import { faker } from "@faker-js/faker";
import axios from "axios";

const mockedAxios = axios as jest.Mocked<typeof axios>;

export const mockAxios = (): jest.Mocked<typeof axios> => {
  mockedAxios.post.mockResolvedValue({
    data: mockAxiosData,
    status: faker.number.int(),
  });

  return mockedAxios;
};

export const mockAxiosData = {
  email: faker.internet.email(),
  fullName: faker.person.fullName(),
  gender: faker.person.sexType,
};
