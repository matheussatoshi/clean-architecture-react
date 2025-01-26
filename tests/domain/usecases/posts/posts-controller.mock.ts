import { PostBodyResponse } from "@/domain/modules/posts";
import { faker } from "@faker-js/faker";

const generateRandomPost = (id: number): PostBodyResponse => ({
  id,
  userId: faker.number.int({
    min: 1,
    max: 10,
  }),
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
});

export const mockPosts = (): PostBodyResponse[] => {
  return Array.from({ length: 10 }, (_, index) =>
    generateRandomPost(index + 1),
  );
};
