import { cart } from "@/shared/assets/seed";
import Order from "@/app/(payment)/_components/order/Order";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
}

async function MyOrderPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <TitleAnimated title={`Orden #${slug}`} />
          <Order order={cart} />
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default MyOrderPage;
