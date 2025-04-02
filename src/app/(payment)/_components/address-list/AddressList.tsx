"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAddress } from "@/core/shop/store/useAddress";
import styles from "./styles.module.css";
import { IoTrashOutline } from "react-icons/io5";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import ChipAnimated from "@/shared/components/animations/chip-animated/ChipAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import RadioAnimated from "@/shared/components/animations/radio-animated/RadioAnimated";
import SkeletonAnimated from "@/shared/components/animations/skeleton-animated/SkeletonAnimated";

function AddressList(): React.ReactElement {
  const router = useRouter();
  const items = useAddress((s) => s.items);
  const [isLoading, setIsLoading] = useState(true);
  const selectedAddress = useAddress((s) => s.selectedAddress);
  const setSelectedAddress = useAddress((s) => s.setSelectedAddress);

  const handleAddressSelected = (id: string): void => {
    const selected = items.find((item) => item.id === id);
    if (!selected) return;
    setSelectedAddress(selected);
  };

  const navigateToCheckout = (): void => {
    if (!selectedAddress) return;
    router.push("/checkout");
  };

  const itemsValues = items.map((address) => ({
    value: address.id,
    label: (
      <div className={styles["selection-item"]}>
        <div>
          <p>{address.firstName}</p>
          <p>{address.lastName}</p>
          <p>{address.address}</p>
          <p>{address.postalCode}</p>
          <p>{address.city}</p>
          <p>{address.country}</p>
          <p>{address.phone}</p>
        </div>
        <ButtonAnimated
          className={styles["selection-item__remove"]}
          subBlockColor="var(--color-purple-6)"
        >
          <IoTrashOutline size={20} color="var(--color-red-3)" />
        </ButtonAnimated>
      </div>
    ),
  }));

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <AddressListSkeleton />;

  return (
    <section className={styles["address-list"]}>
      <TitleAnimated title="Eliga la dirección de entrega" />
      <SeparatorAnimated />
      {items.length === 0 ? (
        <div className={styles["address-list__message"]}>
          <ChipAnimated text="No existe ninguna dirección registrada" />
        </div>
      ) : (
        <div className={styles["address-list__selection"]}>
          <RadioAnimated
            items={itemsValues}
            defaultSelected={selectedAddress?.id}
            onSelectValue={handleAddressSelected}
          />
          <ButtonAnimated
            subBlockColor="var(--color-purple-6)"
            disabled={!selectedAddress}
            onClick={navigateToCheckout}
          >
            Continuar
          </ButtonAnimated>
        </div>
      )}
    </section>
  );
}
export default AddressList;

function AddressListSkeleton(): React.ReactElement {
  return (
    <div className={styles["address-list-skeleton"]}>
      <SkeletonAnimated />
      <SeparatorAnimated />
      <SkeletonAnimated height={80} />
      <SkeletonAnimated height={80} />
      <SkeletonAnimated height={80} />
      <SkeletonAnimated />
    </div>
  );
}
