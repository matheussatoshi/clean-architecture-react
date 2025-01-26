import { AxiosHttpClientAdapter } from "@/infra/adapters/http";
import { ProposalResponse } from "@/infra/ports/proposal-statements";
import { PostControllerContract } from "./contracts";
import { PostBodyResponse } from "./domain";
import { FindPosts } from "./usecases";

export class PostsController implements PostControllerContract {
  private findPostsService: FindPosts;

  constructor(httpClient: AxiosHttpClientAdapter) {
    this.findPostsService = new FindPosts(httpClient);
  }

  public async findAll(): Promise<ProposalResponse<PostBodyResponse[]>> {
    return this.findPostsService.findAll();
  }

  public async findById(
    id: string,
  ): Promise<ProposalResponse<PostBodyResponse>> {
    return this.findPostsService.findById(id);
  }
}
