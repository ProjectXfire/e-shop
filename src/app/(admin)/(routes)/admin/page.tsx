import { redirect } from "next/navigation";

function AdminPage(): React.ReactElement {
  redirect("/admin/products");
}
export default AdminPage;
