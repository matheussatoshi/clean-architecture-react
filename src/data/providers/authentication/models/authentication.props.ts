import { AuthenticationDomain } from "@/data/usecases";
import { LocalStorageClientAdapter } from "@/infra/cache";
import { AxiosHttpClientAdapter } from "@/infra/http";

export interface AuthenticationContextProps {
  http: AxiosHttpClientAdapter;
  storage: LocalStorageClientAdapter;
  session: AuthenticationDomain.Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<AuthenticationDomain.Session | undefined>>;
}
