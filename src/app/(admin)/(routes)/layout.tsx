import { auth } from "@auth";
import { redirect } from "next/navigation";
import Sidebar from "../_components/sidebar/Sidebar";
import TopMenu from "../_components/top-menu/TopMenu";
import { verifyUserToken } from "@/core/user/services/get-user.service";
import DeleteModal from "@/shared/components/delete-modal/DeleteModal";

interface Props {
  children: React.ReactNode;
}

async function AdminLayout({ children }: Props): Promise<React.ReactElement> {
  const session = await auth();
  const { data: user } = await verifyUserToken(session?.user?.email);

  if (!user || user.role !== "admin") redirect("/");

  return (
    <main>
      <DeleteModal />
      <TopMenu user={user} />
      <Sidebar user={user} />
      {children}
    </main>
  );
}
export default AdminLayout;
