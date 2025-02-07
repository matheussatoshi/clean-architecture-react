import { AuthenticationDomain } from "@/data/usecases";
import { AuthenticationMiddlewareContract } from "@/domain/contracts/authentication";
import { LocalStorageClientAdapter } from "@/infra/cache";
import { AxiosHttpClientAdapter } from "@/infra/http";
import { inject } from "@/infra/lib/inject";
import { tuple } from "@/infra/lib/tuple-it";
import defaultConfig from "@/main/config/default";
import { makeAuthorization, makeToken } from "@/main/factories/http/authorization.factory";
import * as React from "react";
import { AuthenticationContext } from "./authentication.context";

const { tags } = defaultConfig();

function isValidSession(session: AuthenticationDomain.Session | null | undefined): boolean {
  return (
    session !== null && session !== undefined && session.meta?.id?.trim() !== "" && session.meta?.email?.trim() !== ""
  );
}

function getStoredSession(storage: LocalStorageClientAdapter): AuthenticationDomain.Session | undefined {
  const storedSession = storage.getItem<AuthenticationDomain.Session>(tags["@session"]);

  if (!isValidSession(storedSession)) {
    return undefined;
  }

  return storedSession;
}

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const http = inject<AxiosHttpClientAdapter>("http");
  const storage = inject<LocalStorageClientAdapter>("storage");
  const authentication = inject<AuthenticationMiddlewareContract>("authentication");
  const [session, setSession] = React.useState<AuthenticationDomain.Session | undefined>(() => {
    return getStoredSession(storage);
  });

  const handleBootstrapAuthentication = React.useCallback(async () => {
    const storedSession = storage.getItem<AuthenticationDomain.Session>(tags["@session"]);
    const storedRefreshToken = storage.getItem<AuthenticationDomain.RefreshToken>(tags["@refreshToken"]);

    if (storedSession && isValidSession(storedSession)) {
      setSession(storedSession);

      http.setAuthorization(makeToken({ accessToken: storedSession.AccessToken }));
    } else {
      storage.removeItem(tags["@session"]);
      storage.removeItem(tags["@refreshToken"]);
      return;
    }

    if (storedRefreshToken) {
      const [error, result] = await tuple(authentication.refreshToken({ token: storedRefreshToken.token }));
      const { accessToken, refreshToken } = makeAuthorization(result.data);

      if (error) {
        console.error("Erro ao fazer refresh do token:", error?.message);
        storage.removeItem(tags["@session"]);
        storage.removeItem(tags["@refreshToken"]);

        return;
      }

      storage.setItem(tags["@session"], { ...session, ...result.data });
      storage.setItem(tags["@refreshToken"], refreshToken);

      http.setAuthorization(makeToken({ accessToken }));
      setSession((prevSession) => ({ ...prevSession, ...result.data }));
    }
  }, [authentication, session]);

  React.useEffect(() => {
    handleBootstrapAuthentication();
  }, [authentication]);

  return (
    <AuthenticationContext.Provider value={{ session, http, storage, setSession }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
