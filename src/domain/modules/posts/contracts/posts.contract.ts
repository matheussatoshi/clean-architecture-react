import {
  ProposalResponse,
  ProposalResponseForwarded,
} from "@/infra/middleware/proposal-statements";
import { PostBodyResponse } from "../domain/posts.dto";

export interface FindPostsContract {
  findAll(): ProposalResponse<PostBodyResponse[]>;
  findById(id: string): ProposalResponse<PostBodyResponse>;
}

export interface PostControllerContract {
  findAll(): ProposalResponseForwarded<PostBodyResponse[]>;
  findById(id: string): ProposalResponseForwarded<PostBodyResponse>;
}
