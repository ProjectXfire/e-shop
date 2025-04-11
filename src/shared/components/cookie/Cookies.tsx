import { updateTokenUser } from "@/core/user/services/update-user.service";
import { cookies } from "next/headers";

async function Cookies(): Promise<React.ReactElement> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authjs.session-token");

  await updateTokenUser(authToken?.value);

  return <></>;
}
export default Cookies;
