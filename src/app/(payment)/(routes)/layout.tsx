import { redirect } from "next/navigation";
import { auth } from "@auth";
import Sidebar from "@/app/(shop)/_components/sidebar/Sidebar";
import TopMenu from "@/app/(shop)/_components/top-menu/TopMenu";

interface Props {
  children: React.ReactNode;
}

async function CheckoutLayout({ children }: Props): Promise<React.ReactElement> {
  const session = await auth();

  if (!session) redirect("/auth/login?redirect=/checkout/address");

  return (
    <main>
      <TopMenu user={session.user} />
      <Sidebar user={session.user} />
      {children}
    </main>
  );
}
export default CheckoutLayout;
