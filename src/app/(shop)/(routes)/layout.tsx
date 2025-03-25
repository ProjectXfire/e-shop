import TopMenu from "../_components/top-menu/TopMenu";
import Sidebar from "../_components/sidebar/Sidebar";
import Footer from "@/shared/components/footer/Footer";
import FlexContainer from "@/shared/components/containers/flex-container/FlexContainer";
import FlexSpacer from "@/shared/components/containers/flex-container/FlexSpacer";

interface Props {
  children: React.ReactNode;
}

function ShopLayout({ children }: Props): React.ReactElement {
  return (
    <FlexContainer>
      <TopMenu />
      <Sidebar />
      <div>{children}</div>
      <FlexSpacer />
      <Footer />
    </FlexContainer>
  );
}
export default ShopLayout;
