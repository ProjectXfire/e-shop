"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";

interface Props {
  itemsTotalPrice: number;
}

function CartSummary({ itemsTotalPrice }: Props): React.ReactElement {
  const router = useRouter();

  const navigateToCheckout = (): void => {
    router.push("/checkout/address");
  };

  return (
    <section className={styles["cart-summary"]}>
      <TitleAnimated title="Resumen de Orden" />
      <div className={styles["cart-summary__block"]}>
        <p className={styles["block-key"]}>Envío</p>
        <p>Free</p>
      </div>
      <div className={styles["cart-summary__block"]}>
        <p className={styles["block-key"]}>Impuesto</p>
        <p>Para ser calculado</p>
      </div>
      <div className={styles["cart-summary__block"]}>
        <p className={styles["block-key"]}>Subtotal</p>
        <p>${itemsTotalPrice}</p>
      </div>
      <ButtonAnimated subBlockColor="var(--color-purple-4)" onClick={navigateToCheckout}>
        Verificar
      </ButtonAnimated>
    </section>
  );
}
export default CartSummary;
