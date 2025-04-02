"use client";

import { redirect } from "next/navigation";
import { useAddress } from "@/core/shop/store/useAddress";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import TableKeyValue from "@/shared/components/table-key-value/TableKeyValue";
import { useEffect, useState } from "react";
import SkeletonAnimated from "@/shared/components/animations/skeleton-animated/SkeletonAnimated";

function AddressSummary(): React.ReactElement {
  const selectedAddress = useAddress((s) => s.selectedAddress);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <AddressSummarySkeleton />;
  if (!selectedAddress) redirect("/checkout/address");

  const fields = [
    { key: "Nombres", value: selectedAddress.firstName },
    { key: "Apellidos", value: selectedAddress.lastName },
    { key: "Dirección", value: selectedAddress.address },
    { key: "Código postal", value: selectedAddress.postalCode },
    { key: "Ciudad", value: selectedAddress.city },
    { key: "País", value: selectedAddress.country },
    { key: "Teléfono", value: selectedAddress.phone },
  ];

  return (
    <section className={styles["address-summary"]}>
      <TitleAnimated title="Dirección de entrega" />
      <SeparatorAnimated />
      <TableKeyValue fields={fields} />
    </section>
  );
}
export default AddressSummary;

function AddressSummarySkeleton(): React.ReactElement {
  return (
    <div className={styles["address-summary-skeleton"]}>
      <SkeletonAnimated />
      <SeparatorAnimated />
      <div className={styles["address-summary-skeleton__table"]}>
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
        <SkeletonAnimated />
      </div>
    </div>
  );
}
