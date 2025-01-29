import { tuple } from "@/infra/lib/tuple-it";
import { AxiosError } from "axios";

export const makeSut = () => {
  return tuple;
};

export const mockData = (status: number, message: string) => {
  const error = new AxiosError(message);
  error.response = {
    status,
    data: { message },
  } as any;

  return error;
};
