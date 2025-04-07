import CheckoutHeader from "../../_components/checkout-header/CheckoutHeader";
import OrderSummary from "../../_components/order-summary/OrderSummary";
import CheckoutContainer from "../../_components/checkout-container/CheckoutContainer";
import AddressSummary from "../../_components/address-summary/AddressSummary";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

async function CheckoutPage(): Promise<React.ReactElement> {
  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <CheckoutHeader />
        <FadeinContainer>
          <CheckoutContainer>
            <AddressSummary />
            <OrderSummary />
          </CheckoutContainer>
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default CheckoutPage;
