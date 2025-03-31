"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import { useCart } from "@/core/shop/store/useCart";
import { currencyFormat } from "@/shared/utils/currency-format";

interface Props {
  totalPrice: number;
  totalItems: number;
}

function CartSummary({ totalPrice, totalItems }: Props): React.ReactElement {
  const router = useRouter();

  const navigateToCheckout = (): void => {
    router.push("/checkout/address");
  };

  return (
    <section className={styles["cart-summary"]}>
      <TitleAnimated title="Resumen" />
      <div className={styles["cart-summary__block"]}>
        <p className={styles["block-key"]}>Total de Artículos</p>
        <p>{totalItems}</p>
      </div>
      <div className={styles["cart-summary__block"]}>
        <p className={styles["block-key"]}>Total</p>
        <p>{currencyFormat(totalPrice)}</p>
      </div>
      <ButtonAnimated subBlockColor="var(--color-purple-5)" onClick={navigateToCheckout}>
        Verificar
      </ButtonAnimated>
    </section>
  );
}
export default CartSummary;
