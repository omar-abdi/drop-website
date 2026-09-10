"use client";

import type { ReactNode } from "react";
import { useUserStore } from "../userStore/user"
import Link from "next/link"

const Protectroute = ({ children }: { children: ReactNode }) => {
  const { user } = useUserStore()

  if (!user) {
    return <Link href="/login">Login</Link>
  }

  return (
    <>{children}</>
  )
}

export default Protectroute
