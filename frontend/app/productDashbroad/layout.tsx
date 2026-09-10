import type { ReactNode } from "react";

import Leftiside from "../components/Leftiside";
import Protectroute from "../components/Protectroute";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Protectroute>
    <Leftiside />
    {children}
    
  </Protectroute>;
}
