import { auth } from "@auth";
import Sidebar from "@/app/(shop)/_components/sidebar/Sidebar";
import TopMenu from "@/app/(shop)/_components/top-menu/TopMenu";
import DeleteModal from "@/shared/components/delete-modal/DeleteModal";
import RedirectAuth from "../_components/redirect-auth/RedirectAuth";

interface Props {
  children: React.ReactNode;
}

async function CheckoutLayout({ children }: Props): Promise<React.ReactElement> {
  const session = await auth();

  if (!session) return <RedirectAuth />;

  return (
    <main>
      <DeleteModal />
      <TopMenu user={session.user} />
      <Sidebar user={session.user} />
      {children}
    </main>
  );
}
export default CheckoutLayout;
