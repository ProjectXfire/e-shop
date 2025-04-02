import { auth } from "@auth";
import AuthContainer from "../_components/auth-container/AuthContainer";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

async function AuthLayout({ children }: Props): Promise<React.ReactElement> {
  const session = await auth();

  if (session) redirect("/");

  return <AuthContainer>{children}</AuthContainer>;
}
export default AuthLayout;
