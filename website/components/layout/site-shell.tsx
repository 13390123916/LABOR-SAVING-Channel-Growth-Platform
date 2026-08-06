import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <div className="site-shell-content">{children}</div>
      <SiteFooter />
    </div>
  );
}
