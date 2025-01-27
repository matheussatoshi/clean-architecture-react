import { AxiosHttpClientAdapter } from "@/infra/http/adapter";
import { TupleTreatment } from "@/infra/middleware/tuple-it";
import { PostControllerContract } from "./contracts";
import { PostBodyResponse } from "./domain";
import { FindPosts } from "./usecases";

export class PostsController implements PostControllerContract {
  private findPostsService: FindPosts;

  constructor(httpClient: AxiosHttpClientAdapter) {
    this.findPostsService = new FindPosts(httpClient);
  }

  public async findAll(): Promise<TupleTreatment<PostBodyResponse[]>> {
    return this.findPostsService.findAll();
  }

  public async findById(id: string): Promise<TupleTreatment<PostBodyResponse>> {
    return this.findPostsService.findById(id);
  }
}
