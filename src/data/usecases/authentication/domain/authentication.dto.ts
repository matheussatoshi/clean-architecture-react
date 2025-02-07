export namespace AuthenticationDomain {
  export type Session = {
    AccessToken: string;
    ExpiresIn: number;
    TokenType: "Bearer";
    RefreshToken: string;
    meta: Meta;
    firstLogin: boolean;
  };

  export type Meta = {
    id: string;
    email: string;
    name: string;
  };

  export type Credentials = {
    email: string;
    password: string;
  };

  export type SessionToken = Omit<Session, "meta" | "firstLogin">;

  export type RefreshToken = {
    token: string;
  };
}
