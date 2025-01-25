import type {
  ProposalTryStatementsError,
  ProposalTryStatementsResponse,
} from "@/infra/ports/proposal-statements";
import { AxiosError } from "axios";

export async function proposalTryStatements<T = any>(
  promise: Promise<T>,
): Promise<ProposalTryStatementsResponse<T>> {
  try {
    const value = await promise;
    return [true, null, value];
  } catch (error) {
    const axiosError = error as AxiosError<ProposalTryStatementsError>;

    if (axiosError.response && axiosError.response.status === 403) {
      return [false, "Erro 403 - Não autorizado", null];
    }

    if (axiosError.response && axiosError.response.data?.message) {
      return [false, axiosError.response.data.message, null];
    }

    return [false, `Erro desconhecido: ${axiosError.message}`, null];
  }
}
