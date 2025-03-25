import Sidebar from "../_components/sidebar/Sidebar";
import TopMenu from "../_components/top-menu/TopMenu";

interface Props {
  children: React.ReactNode;
}

function AdminLayout({ children }: Props): React.ReactElement {
  return (
    <main>
      <TopMenu />
      <Sidebar />
      {children}
    </main>
  );
}
export default AdminLayout;
