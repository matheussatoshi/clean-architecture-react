import { AuthenticationMiddlewareContract } from "@/domain/contracts/authentication";
import { inject } from "@/infra/lib/inject";
import defaultConfig from "@/main/config/default";
import { Page } from "@/presentation/pages";

export const makeSignIn = (): JSX.Element => {
  const { tags } = defaultConfig();
  const authentication = inject<AuthenticationMiddlewareContract>("authentication");

  return <Page.SignIn builder={authentication} tags={tags} />;
};
