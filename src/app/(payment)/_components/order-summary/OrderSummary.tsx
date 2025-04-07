"use client";

import type {
  CreateOrderAddressDto,
  CreateOrderDto,
  CreateOrderItemDto,
} from "@/core/payment/dtos/order.dto";
import NextImage from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createOrder } from "@/core/payment/services/create-order.service";
import { useCart } from "@/core/shop/store/useCart";
import { useAddress } from "@/core/shop/store/useAddress";
import { currencyFormat } from "@/shared/utils/currency-format";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import SkeletonAnimated from "@/shared/components/animations/skeleton-animated/SkeletonAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

const shippingPercentage = 0.1;
const taxesPercentage = 0.12;

function OrderSummary(): React.ReactElement {
  const router = useRouter();
  const cartItems = useCart((s) => s.items);
  const totalItems = useCart((s) => s.totalItems);
  const totalPrice = useCart((s) => s.totalPrice);
  const clearCart = useCart((s) => s.clearCart);
  const selectedAddress = useAddress((s) => s.selectedAddress);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const shipping = totalPrice * shippingPercentage;
  const taxes = totalPrice * taxesPercentage;

  const handleOrder = async (): Promise<void> => {
    if (!selectedAddress || cartItems.length === 0) return;
    setIsSaving(true);
    const { firstName, lastName, address, country, city, phone, postalCode } = selectedAddress;
    const productsOrder: CreateOrderItemDto[] = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      price: item.price,
    }));
    const orderAddress: CreateOrderAddressDto = {
      firstName,
      lastName,
      address,
      countryId: country.id,
      city,
      phone,
      postalCode,
    };
    const order: CreateOrderDto = {
      itemsInOrder: totalItems,
      subtotal: totalPrice,
      delivery: shipping,
      tax: taxes,
      total: totalPrice + shipping + taxes,
      isPaid: false,
    };
    const {
      error,
      success,
      data: orderId,
    } = await createOrder({
      items: productsOrder,
      address: orderAddress,
      order,
    });
    if (error) {
      toastMessage.error(error);
      setIsSaving(false);
    }
    if (success) {
      clearCart();
      router.push(`/orders/${orderId}`);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <OrderSummarySkeleton />;

  if (cartItems.length === 0 && !isSaving) redirect("/cart");

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
          {cartItems.map((item, i) => (
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
      <ButtonAnimated
        subBlockColor="var(--color-purple-4)"
        disabled={isSaving}
        onClick={handleOrder}
      >
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
