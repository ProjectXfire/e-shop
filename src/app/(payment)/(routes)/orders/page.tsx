import { getOrdersByUser } from "@/core/payment/services/get-orders.service";
import OrdersList from "../../_components/orders-list/OrdersList";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import Message from "@/shared/components/message/Message";

async function MyOrdersPage(): Promise<React.ReactElement> {
  const { error, data } = await getOrdersByUser();

  if (error)
    return (
      <MaxWidthContainer>
        <FadeinContainer>
          <PaddingContainer>
            <Message variant="error" message={error} />
          </PaddingContainer>
        </FadeinContainer>
      </MaxWidthContainer>
    );

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <TitleAnimated title="Ordernes" subtitle="Todas mis órdenes" />
          <OrdersList orders={data!} />
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default MyOrdersPage;
