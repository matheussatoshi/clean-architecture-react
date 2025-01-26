import { PostsController } from "@/domain/modules/posts";
import { LocalStorageClientAdapter } from "@/infra/adapters/cache";
import { AxiosHttpClientAdapter } from "@/infra/adapters/http";
import { createContainer } from "iti";

export const container = createContainer()
  .add({
    localStorage: new LocalStorageClientAdapter(),
  })
  .add({
    httpService: new AxiosHttpClientAdapter(),
  })
  .add(({ httpService }) => ({
    postsService: new PostsController(httpService),
  }));
