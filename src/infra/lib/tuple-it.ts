import { AxiosError, AxiosResponse } from "axios";
import { HttpStatus } from "../http/ports";

type Response = {
  message: string;
  status: HttpStatus;
  resolve: boolean;
};

export type TupleItResponse<T> = Promise<
  [Response, Response, T | null | undefined]
>;

export type TupleTreatment<T> = Promise<TupleItResponse<AxiosResponse<T, any>>>;

export type TupleForwarded<T> = Promise<TupleTreatment<T>>;

export type TupleError = { message?: string };

export async function tuple<T = any>(
  promise: Promise<T>,
): Promise<TupleItResponse<T>> {
  try {
    const value = await promise;

    const ok = createSuccess("Requisição bem-sucedida", HttpStatus.OK);

    return [ok, null, value];
  } catch (catchError) {
    const axiosError = catchError as AxiosError<TupleError>;

    if (axiosError.response) {
      const statusCode = axiosError.response.status;
      let error;

      if (statusCode === HttpStatus.FORBIDDEN) {
        error = createFailed("Acesso não autorizado", HttpStatus.FORBIDDEN);
        return [null, error, null];
      }

      if (statusCode === HttpStatus.BAD_REQUEST) {
        error = createFailed("Erro na requisição", HttpStatus.BAD_REQUEST);
        return [null, error, null];
      }

      if (statusCode === HttpStatus.NOT_FOUND) {
        error = createFailed("Recurso não encontrado", HttpStatus.NOT_FOUND);
        return [null, error, null];
      }

      if (statusCode === HttpStatus.TOO_MANY_REQUESTS) {
        error = createFailed(
          "Número excessivo de requisições",
          HttpStatus.TOO_MANY_REQUESTS,
        );
        return [null, error, null];
      }

      if (statusCode === HttpStatus.INTERNAL_SERVER) {
        error = createFailed("Erro no servidor", HttpStatus.INTERNAL_SERVER);
        return [null, error, null];
      }

      if (axiosError.response.data?.message) {
        error = createFailed(
          axiosError.response.data.message,
          statusCode as HttpStatus,
        );
        return [null, error, null];
      }
    }

    const error = createFailed("Erro desconhecido", HttpStatus.INTERNAL_SERVER);

    return [null, error, null];
  }
}

function createSuccess(message: string, status: HttpStatus) {
  return { message, status, resolve: true };
}

function createFailed(message: string, status: HttpStatus) {
  return { message, status, resolve: false };
}
