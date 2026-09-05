import type { ReactNode } from "react";

import Leftiside from "../components/Leftiside";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>
  <Leftiside />
  {children}

  </>;
}
