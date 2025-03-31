"use client";

import NextImage from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useCart } from "@/core/shop/store/useCart";
import { currencyFormat } from "@/shared/utils/currency-format";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import SkeletonAnimated from "@/shared/components/animations/skeleton-animated/SkeletonAnimated";

function OrderSummary(): React.ReactElement {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const totalItems = useCart((s) => s.totalItems);
  const totalPrice = useCart((s) => s.totalPrice);

  const [isLoading, setIsLoading] = useState(true);

  const shipping = totalPrice * 0.1;
  const taxes = totalPrice * 0.12;

  const handleOrder = (): void => {
    // Crear orden
    router.push(`/orders/${"2"}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <OrderSummarySkeleton />;

  if (items.length === 0) redirect("/cart");

  return (
    <section className={styles["order-summary"]}>
      <TitleAnimated title="Resumen de la Orden" />
      <SeparatorAnimated />
      <table>
        <thead>
          <tr>
            <th className={styles["table-head"]}></th>
            <th className={styles["table-head"]}>Nombre</th>
            <th className={styles["table-head"]}>Cantidad</th>
            <th className={styles["table-head"]}>Precio</th>
            <th className={styles["table-head"]}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className={styles["table-data"]}>
                <NextImage
                  className={styles["table-data__image"]}
                  src={item.images[0]}
                  alt={item.title}
                  width={40}
                  height={40}
                />
              </td>
              <td className={styles["table-data"]}>{item.title}</td>
              <td className={styles["table-data"]}>{item.quantity}</td>
              <td className={styles["table-data"]}>{currencyFormat(item.price)}</td>
              <td className={styles["table-data"]}>{currencyFormat(item.quantity * item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SeparatorAnimated />
      <div className={styles["order-summary__info"]}>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>No. Productos</p>
          <p className={styles["info__value"]}>{totalItems}</p>
        </div>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>Subtotal</p>
          <p className={styles["info__value"]}>{currencyFormat(totalPrice)}</p>
        </div>
      </div>
      <SeparatorAnimated />
      <div className={styles["order-summary__info"]}>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>Gastos de envío (10%)</p>
          <p className={styles["info__value"]}>{currencyFormat(shipping)}</p>
        </div>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>Impuestos (12%)</p>
          <p className={styles["info__value"]}>{currencyFormat(taxes)}</p>
        </div>
      </div>
      <SeparatorAnimated />
      <div className={styles["info"]}>
        <p>Total orden</p>
        <p className={`${styles["info__value"]} ${styles["info__value--variant"]}`}>
          {currencyFormat(totalPrice + shipping + taxes)}
        </p>
      </div>
      <div className={styles.terms}>
        Al hacer click en &quot;crear orden&quot;, aceptas nuestros{" "}
        <NextLink className={styles.terms__link} href="/">
          términos y condiciones
        </NextLink>{" "}
        y{" "}
        <NextLink className={styles.terms__link} href="/">
          políticas de privacidad
        </NextLink>
      </div>
      <ButtonAnimated subBlockColor="var(--color-purple-4)" onClick={handleOrder}>
        Crear orden
      </ButtonAnimated>
    </section>
  );
}
export default OrderSummary;

function OrderSummarySkeleton(): React.ReactElement {
  return (
    <div className={styles["order-summary__skeleton"]}>
      <SkeletonAnimated />
      <SeparatorAnimated />
      <SkeletonAnimated />
      <SkeletonAnimated />
      <SeparatorAnimated />
      <SkeletonAnimated />
      <SkeletonAnimated />
      <SeparatorAnimated />
      <SkeletonAnimated />
      <SkeletonAnimated />
      <SeparatorAnimated />
      <SkeletonAnimated />
    </div>
  );
}
