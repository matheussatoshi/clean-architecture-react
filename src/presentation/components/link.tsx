import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

export interface LinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RouterLink>, "to"> {
  href?: string;
  hash?: string;
  search?: string;
}

export const Link = React.forwardRef<
  React.ComponentRef<typeof RouterLink>,
  LinkProps
>(({ href, hash, search, ...props }, ref) => {
  return (
    <RouterLink
      {...props}
      ref={ref}
      to={{
        pathname: href,
        hash,
        search,
      }}
    />
  );
});

Link.displayName = "Link";
