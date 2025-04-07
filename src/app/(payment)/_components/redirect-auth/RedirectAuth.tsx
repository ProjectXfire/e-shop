"use client";

import { redirect, usePathname } from "next/navigation";

function RedirectAuth(): React.ReactElement {
  const pathname = usePathname();

  redirect(`/auth/login?redirect=${pathname}`);
}
export default RedirectAuth;
