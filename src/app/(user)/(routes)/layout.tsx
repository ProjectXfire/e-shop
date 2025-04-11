import { auth } from "@auth";
import TopMenu from "../_components/top-menu/TopMenu";
import { redirect } from "next/navigation";
import FlexContainer from "@/shared/components/containers/flex-container/FlexContainer";
import FlexSpacer from "@/shared/components/containers/flex-container/FlexSpacer";
import Footer from "@/shared/components/footer/Footer";
import Sidebar from "@/app/(shop)/_components/sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

async function UserLayout({ children }: Props): Promise<React.ReactElement> {
  const session = await auth();

  if (!session || !session.user) redirect("/");

  return (
    <FlexContainer>
      <TopMenu user={session.user} />
      <Sidebar user={session?.user ?? null} />
      <div>{children}</div>
      <FlexSpacer />
      <Footer />
    </FlexContainer>
  );
}
export default UserLayout;
