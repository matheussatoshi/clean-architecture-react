import {
  HttpStatus,
  PromiseStatusResponse,
} from "@/data/protocols/http-client.protocol";
import type {
  ProposalTryStatementsError,
  ProposalTryStatementsResponse,
} from "@/infra/middleware/proposal-statements";
import { AxiosError } from "axios";

export async function proposalTryStatements<T = any>(
  promise: Promise<T>,
): Promise<ProposalTryStatementsResponse<T>> {
  try {
    const value = await promise;

    const ok: PromiseStatusResponse = createOkResponse(
      "Requisição bem-sucedida",
      HttpStatus.OK,
    );

    return [ok, null, value];
  } catch (catchError) {
    const axiosError = catchError as AxiosError<ProposalTryStatementsError>;

    if (axiosError.response) {
      const statusCode = axiosError.response.status;
      let error: PromiseStatusResponse;

      if (statusCode === HttpStatus.FORBIDDEN) {
        error = createErrorResponse(
          "Acesso não autorizado",
          HttpStatus.FORBIDDEN,
        );
        return [null, error, null];
      }

      if (statusCode === HttpStatus.BAD_REQUEST) {
        error = createErrorResponse(
          "Erro na requisição",
          HttpStatus.BAD_REQUEST,
        );
        return [null, error, null];
      }

      if (statusCode === HttpStatus.NOT_FOUND) {
        error = createErrorResponse(
          "Recurso não encontrado",
          HttpStatus.NOT_FOUND,
        );
        return [null, error, null];
      }

      if (statusCode === HttpStatus.TOO_MANY_REQUESTS) {
        error = createErrorResponse(
          "Número excessivo de requisições",
          HttpStatus.TOO_MANY_REQUESTS,
        );
        return [null, error, null];
      }

      if (statusCode === HttpStatus.INTERNAL_SERVER) {
        error = createErrorResponse(
          "Erro no servidor",
          HttpStatus.INTERNAL_SERVER,
        );
        return [null, error, null];
      }

      if (axiosError.response.data?.message) {
        error = createErrorResponse(
          axiosError.response.data.message,
          statusCode as HttpStatus,
        );
        return [null, error, null];
      }
    }

    const error: PromiseStatusResponse = createErrorResponse(
      "Erro desconhecido",
      HttpStatus.INTERNAL_SERVER,
    );

    return [null, error, null];
  }
}

function createOkResponse(message: string, status: HttpStatus) {
  return {
    message,
    status,
    resolve: true,
  };
}

// Função para criar a resposta de erro (error)
function createErrorResponse(message: string, status: HttpStatus) {
  return {
    message,
    status,
    resolve: false,
  };
}
