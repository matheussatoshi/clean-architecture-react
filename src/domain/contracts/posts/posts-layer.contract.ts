import { PostBodyResponse } from "@/data/usecases";
import { TupleForwarded } from "@/infra/lib/tuple-it";

export interface PostsControllerContract {
  findAll(): TupleForwarded<PostBodyResponse[]>;
  findById(id: string): TupleForwarded<PostBodyResponse>;
}
