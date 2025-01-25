import { AxiosError, AxiosResponse } from "axios";

export function createAxiosError(
  message: string,
  status?: number,
  responseData?: any,
): AxiosError {
  const axiosError = new AxiosError(message) as AxiosError;

  axiosError.response = {
    status: status ?? 500,
    data: responseData ?? null,
  } as AxiosResponse;

  return axiosError;
}

export const mockPromiseData = () => ({
  mockPromise: <T>(data: T) => Promise.resolve(data),
  mockRejectedPromise: <T>(error: T) => Promise.reject(error),
});
