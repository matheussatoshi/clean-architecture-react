import { PostsController } from "@/data/usecases/posts";
import { AxiosHttpClientAdapter } from "@/infra/http/adapter";
import { mockPosts } from "./posts-controller.mock";

const makeHttpClientMock = () => {
  return {
    get: jest.fn(),
  } as unknown as jest.Mocked<AxiosHttpClientAdapter>;
};

const makeSut = () => {
  const httpClientMock = makeHttpClientMock();
  const sut = new PostsController(httpClientMock);

  return { sut, httpClientMock };
};

describe("PostsController", () => {
  describe("findAll", () => {
    it("should return a list of posts", async () => {
      const { sut, httpClientMock } = makeSut();

      const mockResponse = { data: mockPosts() };

      (httpClientMock.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await sut.findAll();
      expect(result).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith({ url: "/posts" });
    });
  });

  describe("findById", () => {
    it("should return a specific post by ID", async () => {
      const { sut, httpClientMock } = makeSut();

      const mockPost = mockPosts()[0];
      const mockResponse = { data: mockPost };

      (httpClientMock.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await sut.findById(String(mockPost.id));
      expect(result).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith({
        url: `/posts/${mockPost.id}`,
      });
    });
  });
});
