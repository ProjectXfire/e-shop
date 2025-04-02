import { auth } from "@auth";
import TopMenu from "../_components/top-menu/TopMenu";
import Sidebar from "../_components/sidebar/Sidebar";
import Footer from "@/shared/components/footer/Footer";
import FlexContainer from "@/shared/components/containers/flex-container/FlexContainer";
import FlexSpacer from "@/shared/components/containers/flex-container/FlexSpacer";

interface Props {
  children: React.ReactNode;
}

async function ShopLayout({ children }: Props): Promise<React.ReactElement> {
  const session = await auth();

  return (
    <FlexContainer>
      <TopMenu user={session?.user ?? null} />
      <Sidebar user={session?.user ?? null} />
      <div>{children}</div>
      <FlexSpacer />
      <Footer />
    </FlexContainer>
  );
}
export default ShopLayout;
