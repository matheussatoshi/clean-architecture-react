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
    return [true, false, value];
  } catch (error) {
    const axiosError = error as AxiosError<ProposalTryStatementsError>;

    if (axiosError.response && axiosError.response.status === 403) {
      return [false, true, null];
    }

    if (axiosError.response && axiosError.response.data?.message) {
      return [false, true, null];
    }

    return [false, true, null];
  }
}
