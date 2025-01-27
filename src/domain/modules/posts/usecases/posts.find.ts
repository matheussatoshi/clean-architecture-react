import { AxiosHttpClientAdapter } from "@/infra/http/adapter";
import { TupleTreatment } from "@/infra/middleware/tuple-it";
import { FindPostsContract } from "../contracts/posts.contract";
import { PostBodyResponse } from "../domain/posts.dto";

export class FindPosts implements FindPostsContract {
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
