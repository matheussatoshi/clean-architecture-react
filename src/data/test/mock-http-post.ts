import type { HttpPostParams } from "@/data/protocols/http/http-post-client";
import { mockAxiosData } from "@/infra/test";
import { faker } from "@faker-js/faker";

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: mockAxiosData,
});
