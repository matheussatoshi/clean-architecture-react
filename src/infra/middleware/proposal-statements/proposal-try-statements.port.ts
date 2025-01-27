import { PromiseStatusResponse } from "@/data/protocols/http-client.protocol";
import { AxiosResponse } from "axios";

export type ProposalTryStatementsResponse<T> = Promise<
  [PromiseStatusResponse, PromiseStatusResponse, T | null | undefined]
>;

export type ProposalResponse<T> = Promise<
  ProposalTryStatementsResponse<AxiosResponse<T, any>>
>;

export type ProposalResponseForwarded<T> = Promise<ProposalResponse<T>>;

export type ProposalTryStatementsError = {
  message?: string;
};
