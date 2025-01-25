import { proposalTryStatements } from "@/infra/adapters/proposal-statements";
import { faker } from "@faker-js/faker";
import { createAxiosError, mockPromiseData } from "./proposal-statements.mock";

const makeSut = () => ({
  createAxiosError,
});

describe("Proposal Try Statements", () => {
  const sut = makeSut();
  const mockPromise = mockPromiseData();

  it("Should return success when the promise resolves", async () => {
    const mockResponse = { data: faker.string.uuid() };
    const promise = mockPromise.mockPromise(mockResponse);

    const result = await proposalTryStatements(promise);

    expect(result).toEqual([true, null, mockResponse]);
  });

  it("Should return error 403 - Not Authorized", async () => {
    const mockError = sut.createAxiosError("Error 403", 403);
    const promise = mockPromise.mockRejectedPromise(mockError);

    const result = await proposalTryStatements(promise);

    expect(result).toEqual([false, "Erro 403 - Não autorizado", null]);
  });

  it("Should return backend error message", async () => {
    const customMessage = faker.lorem.sentence();
    const mockError = sut.createAxiosError("Backend error", 400, {
      message: customMessage,
    });
    const promise = mockPromise.mockRejectedPromise(mockError);

    const result = await proposalTryStatements(promise);

    expect(result).toEqual([false, customMessage, null]);
  });

  it("Should return unknown error when no response data is provided", async () => {
    const unknownMessage = faker.lorem.words(2);
    const mockError = sut.createAxiosError(unknownMessage);
    const promise = mockPromise.mockRejectedPromise(mockError);

    const result = await proposalTryStatements(promise);

    expect(result).toEqual([
      false,
      `Erro desconhecido: ${unknownMessage}`,
      null,
    ]);
  });
});
