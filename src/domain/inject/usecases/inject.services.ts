import { PostsController } from "@/domain/modules/posts";
import { LocalStorageClientAdapter } from "@/infra/cache/adapter";
import { AxiosHttpClientAdapter } from "@/infra/http/adapter";
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
