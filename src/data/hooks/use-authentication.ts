import {
  AuthenticationContext,
  type AuthenticationContextProps,
} from "@/data/providers/authentication";
import { NoScopeError } from "@/validation/errors/hooks";
import * as React from "react";

export function useAuthentication(): AuthenticationContextProps {
  const context = React.useContext(AuthenticationContext);

  if (!context) {
    throw new NoScopeError("useAuthentication", "AuthenticationProvider");
  }

  return context;
}
