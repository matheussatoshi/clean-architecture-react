import { tuple } from "@/infra/lib/tuple-it";
import { faker } from "@faker-js/faker";
import { createAxiosError, mockPromiseData } from "./tuple-it.mock";

const makeSut = () => ({
  createAxiosError,
});

describe("Tuple It tests", () => {
  const sut = makeSut();
  const mockPromise = mockPromiseData();

  it("Should return success when the promise resolves", async () => {
    const mockResponse = { data: faker.string.uuid() };
    const promise = mockPromise.mockPromise(mockResponse);

    const result = await tuple(promise);

    expect(result).toEqual([true, null, mockResponse]);
  });

  it("Should return error 403 - Not Authorized", async () => {
    const mockError = sut.createAxiosError("Error 403", 403);
    const promise = mockPromise.mockRejectedPromise(mockError);

    const result = await tuple(promise);

    expect(result).toEqual([false, "Erro 403 - Não autorizado", null]);
  });

  it("Should return backend error message", async () => {
    const customMessage = faker.lorem.sentence();
    const mockError = sut.createAxiosError("Backend error", 400, {
      message: customMessage,
    });
    const promise = mockPromise.mockRejectedPromise(mockError);

    const result = await tuple(promise);

    expect(result).toEqual([false, customMessage, null]);
  });

  it("Should return unknown error when no response data is provided", async () => {
    const unknownMessage = faker.lorem.words(2);
    const mockError = sut.createAxiosError(unknownMessage);
    const promise = mockPromise.mockRejectedPromise(mockError);

    const result = await tuple(promise);

    expect(result).toEqual([
      false,
      `Erro desconhecido: ${unknownMessage}`,
      null,
    ]);
  });
});
