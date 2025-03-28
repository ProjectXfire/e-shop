import AddressForm from "@/app/(payment)/_components/address-form/AddressForm";
import AddressHeader from "@/app/(payment)/_components/address-header/AddressHeader";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

function AddressPage(): React.ReactElement {
  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <AddressHeader />
        <FadeinContainer>
          <AddressForm />
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default AddressPage;
