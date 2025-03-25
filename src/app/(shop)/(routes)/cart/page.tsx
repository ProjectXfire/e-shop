import Cart from "../../_components/cart/Cart";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

function CartPage(): React.ReactElement {
  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <FadeinContainer>
          <Cart />
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}

export default CartPage;
