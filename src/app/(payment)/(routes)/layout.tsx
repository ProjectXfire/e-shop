import Sidebar from "@/app/(shop)/_components/sidebar/Sidebar";
import TopMenu from "@/app/(shop)/_components/top-menu/TopMenu";

interface Props {
  children: React.ReactNode;
}

function CheckoutLayout({ children }: Props): React.ReactElement {
  return (
    <main>
      <TopMenu />
      <Sidebar />
      {children}
    </main>
  );
}
export default CheckoutLayout;
