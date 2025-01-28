import type { PostsControllerContract } from "@/domain/contracts/posts";
import { AxiosHttpClientAdapter } from "@/infra/http";
import type { TupleTreatment } from "@/infra/lib/tuple-it";
import { PostBodyResponse } from "../domain";
import { FindPosts } from "./post.find";

export class PostsController implements PostsControllerContract {
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
