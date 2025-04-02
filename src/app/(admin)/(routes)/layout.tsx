import { auth } from "@auth";
import Sidebar from "../_components/sidebar/Sidebar";
import TopMenu from "../_components/top-menu/TopMenu";
import { verifyUserToken } from "@/core/user/services/get-user.service";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

async function AdminLayout({ children }: Props): Promise<React.ReactElement> {
  const session = await auth();
  const { data: user } = await verifyUserToken(session?.user?.email);

  if (!user || user.role !== "admin") redirect("/");

  return (
    <main>
      <TopMenu />
      <Sidebar user={user} />
      {children}
    </main>
  );
}
export default AdminLayout;
