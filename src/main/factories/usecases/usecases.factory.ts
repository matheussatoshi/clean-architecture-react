import { AuthenticationMiddleware } from "@/data/usecases";
import { LocalStorageClientAdapter } from "@/infra/cache";
import { AxiosHttpClientAdapter } from "@/infra/http";
import * as iti from "iti";

export const builder = iti
  .createContainer()
  /* Cache */
  .add({
    storage: new LocalStorageClientAdapter(),
  })
  /* Http */
  .add({
    http: new AxiosHttpClientAdapter(),
  })
  /* Services */
  .add(({ http }) => ({
    authentication: new AuthenticationMiddleware(http),
  }));
