import * as React from "react";
import { AuthenticationContextProps } from "./models/authentication.props";

export const AuthenticationContext = React.createContext(
  {} as AuthenticationContextProps,
);
