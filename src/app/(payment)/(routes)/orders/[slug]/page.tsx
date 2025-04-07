import { getOrderById } from "@/core/payment/services/get-order.service";
import Order from "@/app/(payment)/_components/order/Order";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import Message from "@/shared/components/message/Message";

type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
}

async function MyOrderPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  const { error, data } = await getOrderById(slug);

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
          <TitleAnimated title={`Orden #${data!.shortId}`} />
          <Order order={data!} />
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default MyOrderPage;
