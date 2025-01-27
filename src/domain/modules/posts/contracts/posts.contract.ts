import { TupleForwarded, TupleTreatment } from "@/infra/middleware/tuple-it";
import { PostBodyResponse } from "../domain/posts.dto";

export interface FindPostsContract {
  findAll(): TupleTreatment<PostBodyResponse[]>;
  findById(id: string): TupleTreatment<PostBodyResponse>;
}

export interface PostControllerContract {
  findAll(): TupleForwarded<PostBodyResponse[]>;
  findById(id: string): TupleForwarded<PostBodyResponse>;
}
