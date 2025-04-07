import { auth } from "@auth";
import { getCountries } from "@/core/payment/services/get-countries.service";
import { getAddressLissByUser } from "@/core/payment/services/get-address-list.service";
import AddressContainer from "@/app/(payment)/_components/address-container/AddressContainer";
import AddressForm from "@/app/(payment)/_components/address-form/AddressForm";
import AddressHeader from "@/app/(payment)/_components/address-header/AddressHeader";
import AddressList from "@/app/(payment)/_components/address-list/AddressList";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

async function AddressPage(): Promise<React.ReactElement> {
  const session = await auth();
  const { data: countries } = await getCountries();
  const { data } = await getAddressLissByUser(session?.user.id);

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <AddressHeader />
        <FadeinContainer>
          <AddressContainer>
            <AddressForm userId={session?.user.id} countries={countries} />
            <AddressList addressList={data} userId={session?.user.id} />
          </AddressContainer>
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default AddressPage;
