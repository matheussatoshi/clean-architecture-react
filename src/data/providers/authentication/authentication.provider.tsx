import { AuthenticationDomain } from "@/data/usecases";
import { AuthenticationMiddlewareContract } from "@/domain/contracts/authentication";
import { LocalStorageClientAdapter } from "@/infra/cache";
import { AxiosHttpClientAdapter } from "@/infra/http";
import { inject } from "@/infra/lib/inject";
import { urls } from "@/main/routing";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "./authentication.context";

export function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const http = inject<AxiosHttpClientAdapter>("http");
  const storage = inject<LocalStorageClientAdapter>("storage");
  const authentication =
    inject<AuthenticationMiddlewareContract>("authentication");
  const [session, setSession] = React.useState<
    AuthenticationDomain.Session | undefined
  >(() => {
    const storedSession =
      storage.getItem<AuthenticationDomain.Session>("session");
    return storedSession ? storedSession : undefined;
  });

  const handleSignIn = React.useCallback(
    async (params: AuthenticationDomain.Credentials) => {
      const [ok, error, response] = await authentication.signIn(params);

      if (error) {
        console.log(error.message);
        return;
      }

      if (ok) {
        setSession(response.data);
        storage.setItem("session", JSON.stringify(response.data));

        if (response.data.RefreshToken) {
          storage.setItem("refreshToken", response.data.RefreshToken);
        } else {
          console.error("RefreshToken is undefined or missing.");
        }

        http.setAuthorization(`Bearer ${response.data.AccessToken}`);
        navigate(urls.redirect.DASHBOARD);
      }
    },
    [authentication],
  );

  const handleSignUp = React.useCallback(
    async (params: AuthenticationDomain.Credentials) => {
      const [ok, error] = await authentication.signUp(params);

      if (ok) console.log(ok.message);
      if (error) console.log(error.message);
    },
    [authentication],
  );

  const handleRefreshToken = React.useCallback(
    async (params: AuthenticationDomain.RefreshToken) => {
      const [ok, error, response] = await authentication.refreshToken(params);

      if (ok) {
        storage.setItem(
          "session",
          JSON.stringify({ ...session, ...response.data }),
        );
        storage.setItem("refreshToken", response.data.RefreshToken);
        http.setAuthorization(`Bearer ${response.data.AccessToken}`);
        setSession((prevSession) => ({
          ...prevSession,
          ...response.data,
        }));
      }

      if (error) {
        console.log(error.message);
      }
    },
    [authentication, session],
  );

  const handleBootstrapAuthentication = React.useCallback(async () => {
    const storedSession =
      storage.getItem<AuthenticationDomain.Session>("session");
    const storedRefreshToken =
      storage.getItem<AuthenticationDomain.RefreshToken>("refreshToken");

    if (storedSession) {
      setSession(storedSession);
      http.setAuthorization(`Bearer ${storedSession.AccessToken}`);
    }

    if (storedRefreshToken) {
      const [ok, error, response] = await authentication.refreshToken({
        token: storedRefreshToken.token,
      });

      if (ok) {
        storage.setItem("session", { ...session, ...response.data });
        storage.setItem("refreshToken", response.data.RefreshToken);
        http.setAuthorization(`Bearer ${response.data.AccessToken}`);
        setSession((prevSession) => ({
          ...prevSession,
          ...response.data,
        }));
      } else {
        console.error("Erro ao fazer refresh do token:", error?.message);
        storage.removeItem("session");
        storage.removeItem("refreshToken");
      }
    }
  }, [authentication, session]);

  React.useEffect(() => {
    handleBootstrapAuthentication();
  }, [authentication]);

  return (
    <AuthenticationContext.Provider
      value={{ session, handleSignUp, handleSignIn, handleRefreshToken }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
