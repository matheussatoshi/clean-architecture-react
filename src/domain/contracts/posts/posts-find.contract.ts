import { PostBodyResponse } from "@/data/usecases";
import { TupleTreatment } from "@/infra/lib/tuple-it";

export interface PostsFindContract {
  findAll(): TupleTreatment<PostBodyResponse[]>;
  findById(id: string): TupleTreatment<PostBodyResponse>;
}
