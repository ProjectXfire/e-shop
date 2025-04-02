import { redirect } from "next/navigation";

function AuthPage(): React.ReactElement {
  return redirect("/auth/login");
}
export default AuthPage;
