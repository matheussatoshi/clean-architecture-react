import { AxiosHttpClientAdapter } from "@/infra/http/adapter";

import {
  MakeNoBodyHttpRequestParams,
  MakeWithBodyHttpRequestParams,
} from "@/domain/protocols/http/http-client.protocol";
import { tuple } from "@/infra/lib/tuple-it";
import { mockResolvedValue, mockResponse } from "./http-client.mock";

jest.mock("@/infra/adapters/proposal-statements", () => ({
  proposalTryStatements: jest.fn(),
}));

const makeSut = (): AxiosHttpClientAdapter => {
  const axiosHttpClient = new AxiosHttpClientAdapter();
  return axiosHttpClient;
};

describe("AxiosHttpClientAdapter", () => {
  const sut = makeSut();

  describe("GET Request", () => {
    it("Should call get method and return success response", async () => {
      const response = mockResponse("test");
      const resolvedValue = mockResolvedValue(true, null, response);
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeNoBodyHttpRequestParams = {
        url: "/test-url",
      };

      const [success, error, data] = await sut.get(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(true);
      expect(resultError).toBeNull();
      expect(resultData).toEqual(response);
    });

    it("Should call get method and handle error response", async () => {
      const resolvedValue = mockResolvedValue(
        false,
        "Erro 403 - Não autorizado",
        null,
      );
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeNoBodyHttpRequestParams = {
        url: "/test-url",
      };

      const [success, error, data] = await sut.get(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(false);
      expect(resultError).toBe("Erro 403 - Não autorizado");
      expect(resultData).toBeNull();
    });

    it("Should handle unknown error in get method", async () => {
      const resolvedValue = mockResolvedValue(
        false,
        "Erro desconhecido: Network Error",
        null,
      );
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeNoBodyHttpRequestParams = {
        url: "/test-url",
      };

      const [success, error, data] = await sut.get(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(false);
      expect(resultError).toBe("Erro desconhecido: Network Error");
      expect(resultData).toBeNull();
    });
  });

  describe("POST Request", () => {
    it("Should call post method and return success response", async () => {
      const response = mockResponse("test");
      const resolvedValue = mockResolvedValue(true, null, response);
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeWithBodyHttpRequestParams = {
        url: "/test-url",
        body: { name: "test" },
      };

      const [success, error, data] = await sut.post(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(true);
      expect(resultError).toBeNull();
      expect(resultData).toEqual(response);
    });

    it("Should handle error in post method", async () => {
      const resolvedValue = mockResolvedValue(
        false,
        "Erro 500 - Internal Server Error",
        null,
      );
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeWithBodyHttpRequestParams = {
        url: "/test-url",
        body: { name: "test" },
      };

      const [success, error, data] = await sut.post(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(false);
      expect(resultError).toBe("Erro 500 - Internal Server Error");
      expect(resultData).toBeNull();
    });
  });

  describe("PATCH Request", () => {
    it("Should call patch method and return success response", async () => {
      const response = mockResponse("updated");
      const resolvedValue = mockResolvedValue(true, null, response);
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeWithBodyHttpRequestParams = {
        url: "/test-url",
        body: { name: "updated" },
      };

      const [success, error, data] = await sut.patch(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(true);
      expect(resultError).toBeNull();
      expect(resultData).toEqual(response);
    });

    it("Should handle error in patch method", async () => {
      const resolvedValue = mockResolvedValue(
        false,
        "Erro 400 - Bad Request",
        null,
      );
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeWithBodyHttpRequestParams = {
        url: "/test-url",
        body: { name: "updated" },
      };

      const [success, error, data] = await sut.patch(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(false);
      expect(resultError).toBe("Erro 400 - Bad Request");
      expect(resultData).toBeNull();
    });
  });

  describe("PUT Request", () => {
    it("Should call put method and return success response", async () => {
      const response = mockResponse("put success");
      const resolvedValue = mockResolvedValue(true, null, response);
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeWithBodyHttpRequestParams = {
        url: "/test-url",
        body: { name: "put" },
      };

      const [success, error, data] = await sut.put(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(true);
      expect(resultError).toBeNull();
      expect(resultData).toEqual(response);
    });

    it("Should handle error in put method", async () => {
      const resolvedValue = mockResolvedValue(
        false,
        "Erro 404 - Not Found",
        null,
      );
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeWithBodyHttpRequestParams = {
        url: "/test-url",
        body: { name: "put" },
      };

      const [success, error, data] = await sut.put(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(false);
      expect(resultError).toBe("Erro 404 - Not Found");
      expect(resultData).toBeNull();
    });
  });

  describe("DELETE Request", () => {
    it("Should call delete method and return success response", async () => {
      const response = mockResponse("deleted");
      const resolvedValue = mockResolvedValue(true, null, response);
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeNoBodyHttpRequestParams = {
        url: "/test-url",
      };

      const [success, error, data] = await sut.delete(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(true);
      expect(resultError).toBeNull();
      expect(resultData).toEqual(response);
    });

    it("Should handle error in delete method", async () => {
      const resolvedValue = mockResolvedValue(
        false,
        "Erro 500 - Internal Server Error",
        null,
      );
      (tuple as jest.Mock).mockResolvedValue(resolvedValue);

      const params: MakeNoBodyHttpRequestParams = {
        url: "/test-url",
      };

      const [success, error, data] = await sut.delete(params);

      const resultSuccess = success;
      const resultError = error;
      const resultData = data;

      expect(resultSuccess).toBe(false);
      expect(resultError).toBe("Erro 500 - Internal Server Error");
      expect(resultData).toBeNull();
    });
  });
});
