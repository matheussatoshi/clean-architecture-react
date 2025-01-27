import { PromiseStatusResponse } from "@/data/protocols/http-client.protocol";
import { AxiosResponse } from "axios";

export type TupleItResponse<T> = Promise<
  [PromiseStatusResponse, PromiseStatusResponse, T | null | undefined]
>;

export type TupleTreatment<T> = Promise<TupleItResponse<AxiosResponse<T, any>>>;

export type TupleForwarded<T> = Promise<TupleTreatment<T>>;

export type TupleError = {
  message?: string;
};
