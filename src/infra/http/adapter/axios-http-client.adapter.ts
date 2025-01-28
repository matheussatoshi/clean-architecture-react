import { tuple, type TupleTreatment } from "@/infra/lib/tuple-it";

import defaultConfig from "@/main/config/default";
import Axios, { AxiosRequestConfig, type AxiosInstance } from "axios";
import {
  HttpMethods,
  type HttpClientPort,
  type MakeHttpRequestParams,
  type MakeNoBodyHttpRequestParams,
  type MakeWithBodyHttpRequestParams,
} from "../ports";

export class AxiosHttpClientAdapter implements HttpClientPort {
  private httpInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    const finalConfig: AxiosRequestConfig = {
      timeout: defaultConfig.api.timeout || config.timeout,
      baseURL: defaultConfig.api.url || config.baseURL,
      headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
        ...(config?.headers || {}),
      },
      ...config,
    };

    this.httpInstance = Axios.create(finalConfig);
  }

  setTokenExpirationStrategy(
    tokenExpireStrategy: () => Promise<string | null>,
  ) {
    this.httpInstance.interceptors.request.clear();
    this.httpInstance.interceptors.request.use(async (config) => {
      const newTokenProvided = await tokenExpireStrategy();
      if (newTokenProvided) {
        this.setAuthorization(newTokenProvided);
        config.headers.Authorization = newTokenProvided;
      }
      return config;
    });
  }

  setAuthorization(token: string): void {
    this.httpInstance.defaults.headers.common.Authorization = token;
  }

  getAuthorization(): string {
    return this.httpInstance.defaults.headers.common.Authorization!.toString();
  }

  private async makeRequest<T = any>(
    params: MakeHttpRequestParams,
  ): TupleTreatment<T> {
    return await tuple(this.httpInstance?.request<T>(params));
  }

  public async get<T>(params: MakeNoBodyHttpRequestParams): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.GET,
      ...params,
    });
  }

  public async post<T>(
    params: MakeWithBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.POST,
      ...params,
    });
  }

  public async patch<T>(
    params: MakeWithBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.PATCH,
      ...params,
    });
  }

  public async put<T>(
    params: MakeWithBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.PUT,
      ...params,
    });
  }

  public async delete<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.DELETE,
      ...params,
    });
  }

  public async connect<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.CONNECT,
      ...params,
    });
  }

  public async head<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.HEAD,
      ...params,
    });
  }

  public async options<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.OPTIONS,
      ...params,
    });
  }

  public async trace<T = any>(
    params: MakeNoBodyHttpRequestParams,
  ): TupleTreatment<T> {
    return await this.makeRequest<T>({
      method: HttpMethods.TRACE,
      ...params,
    });
  }
}
