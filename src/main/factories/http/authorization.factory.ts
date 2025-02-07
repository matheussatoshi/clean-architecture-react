import { AuthenticationDomain } from "@/data/usecases";

type TokenType = "Bearer";
type MakeToken = { tokenType?: TokenType; accessToken: string };
type MakeAuthorization = { refreshToken?: string; accessToken: string; expiresIn: number };

function makeToken({ tokenType = "Bearer", accessToken }: MakeToken): string {
  return `${tokenType} ${accessToken}`;
}

function makeAuthorization(session: Omit<AuthenticationDomain.Session, "meta" | "firstLogin">): MakeAuthorization {
  const refreshToken = session.RefreshToken;
  const accessToken = session.AccessToken;
  const expiresIn = session.ExpiresIn;

  return {
    refreshToken,
    accessToken,
    expiresIn,
  };
}

export { makeAuthorization, makeToken };
