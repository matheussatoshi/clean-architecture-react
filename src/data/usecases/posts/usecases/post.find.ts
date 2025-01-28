import { PostsFindContract } from "@/domain/contracts/posts";
import { AxiosHttpClientAdapter } from "@/infra/http/adapter";
import { TupleTreatment } from "@/infra/lib/tuple-it";
import { PostBodyResponse } from "../domain";

export class FindPosts implements PostsFindContract {
  private httpClient: AxiosHttpClientAdapter;

  constructor(httpClient: AxiosHttpClientAdapter) {
    this.httpClient = httpClient;
  }

  public async findAll(): TupleTreatment<PostBodyResponse[]> {
    const response = await this.httpClient.get<PostBodyResponse[]>({
      url: "/posts",
    });

    return response;
  }

  public async findById(id: string): TupleTreatment<PostBodyResponse> {
    const response = await this.httpClient.get<PostBodyResponse>({
      url: `/posts/${id}`,
    });

    return response;
  }
}
