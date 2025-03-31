"use client";

import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import TableKeyValue from "@/shared/components/table-key-value/TableKeyValue";
import { useEffect, useState } from "react";
import SkeletonAnimated from "@/shared/components/animations/skeleton-animated/SkeletonAnimated";

function AddressSummary(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);

  const fields = [
    { key: "Nombres", value: "My Super nombre" },
    { key: "Apellidos", value: "My Super Apellido" },
    { key: "Dirección", value: "My Super dirección en la avenida nose que" },
    { key: "Dirección adicional", value: "My Super dirección en la avenida nose que" },
    { key: "Código postal", value: "12493" },
    { key: "Ciudad", value: "Popirate" },
    { key: "País", value: "Perú" },
    { key: "Teléfono", value: "+34-34343-56" },
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <AddressSummarySkeleton />;

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
