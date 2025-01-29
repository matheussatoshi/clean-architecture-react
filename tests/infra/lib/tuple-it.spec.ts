import { HttpStatus } from "@/infra/http";
import { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import { makeSut, mockData } from "./tuple-it.mock";

describe("tuple function tests", () => {
  it("should return success response when promise resolves successfully", async () => {
    const successValue = { data: "success" };

    const sut = makeSut();
    const [ok, error, result] = await sut(Promise.resolve(successValue));

    expect(ok?.message).toBe("Requisição bem-sucedida");
    expect(ok?.status).toBe(HttpStatus.OK);
    expect(ok?.resolve).toBe(true);
    expect(result).toEqual(successValue);
    expect(error).toBeNull();
  });

  it("should handle 403 Forbidden error", async () => {
    const error = mockData(HttpStatus.FORBIDDEN, "Acesso não autorizado");

    const sut = makeSut();
    const [, err, result] = await sut(Promise.reject(error));

    expect(err?.message).toBe("Acesso não autorizado");
    expect(err?.status).toBe(HttpStatus.FORBIDDEN);
    expect(err?.resolve).toBe(false);
    expect(result).toBeNull();
  });

  it("should handle 400 Bad Request error", async () => {
    const error = mockData(HttpStatus.BAD_REQUEST, "Erro na requisição");

    const sut = makeSut();
    const [, err, result] = await sut(Promise.reject(error));

    expect(err?.message).toBe("Erro na requisição");
    expect(err?.status).toBe(HttpStatus.BAD_REQUEST);
    expect(err?.resolve).toBe(false);
    expect(result).toBeNull();
  });

  it("should handle 404 Not Found error", async () => {
    const error = mockData(HttpStatus.NOT_FOUND, "Recurso não encontrado");

    const sut = makeSut();
    const [, err, result] = await sut(Promise.reject(error));

    expect(err?.message).toBe("Recurso não encontrado");
    expect(err?.status).toBe(HttpStatus.NOT_FOUND);
    expect(err?.resolve).toBe(false);
    expect(result).toBeNull();
  });

  it("should handle 500 Internal Server Error", async () => {
    const error = mockData(HttpStatus.INTERNAL_SERVER, "Erro no servidor");

    const sut = makeSut();
    const [, err, result] = await sut(Promise.reject(error));

    expect(err?.message).toBe("Erro no servidor");
    expect(err?.status).toBe(HttpStatus.INTERNAL_SERVER);
    expect(err?.resolve).toBe(false);
    expect(result).toBeNull();
  });

  it("should handle unknown errors", async () => {
    const error = new AxiosError("Unknown Error");
    error.response = undefined;

    const sut = makeSut();
    const [, err, result] = await sut(Promise.reject(error));

    expect(err?.message).toBe("Erro desconhecido");
    expect(err?.status).toBe(HttpStatus.INTERNAL_SERVER);
    expect(err?.resolve).toBe(false);
    expect(result).toBeNull();
  });
});
