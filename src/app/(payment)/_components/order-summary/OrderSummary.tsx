"use client";

import NextImage from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { cart } from "../../../../../data/seed";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";

function OrderSummary(): React.ReactElement {
  const router = useRouter();

  const handleOrder = (): void => {
    // Crear orden
    router.push(`/orders/${"2"}`);
  };

  return (
    <section className={styles["order-summary"]}>
      <TitleAnimated title="Orden" />
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
          {cart.map((item, i) => (
            <tr key={i}>
              <td className={styles["table-data"]}>
                <NextImage
                  className={styles["table-data__image"]}
                  src={`/products/${item.images[0]}`}
                  alt={item.title}
                  width={40}
                  height={40}
                />
              </td>
              <td className={styles["table-data"]}>{item.title}</td>
              <td className={styles["table-data"]}>{item.qtty}</td>
              <td className={styles["table-data"]}>${item.price}</td>
              <td className={styles["table-data"]}>${item.qtty * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SeparatorAnimated />

      <div className={styles["order-summary__info"]}>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>No. Productos</p>
          <p className={styles["info__value"]}>0</p>
        </div>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>Subtotal</p>
          <p className={styles["info__value"]}>$0</p>
        </div>
      </div>
      <SeparatorAnimated />
      <div className={styles["order-summary__info"]}>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>Gastos de envío</p>
          <p className={styles["info__value"]}>$0</p>
        </div>
        <div className={styles["info"]}>
          <p className={styles["info__key"]}>Impuestos</p>
          <p className={styles["info__value"]}>$0</p>
        </div>
      </div>
      <SeparatorAnimated />
      <div className={styles["info"]}>
        <p>Total orden</p>
        <p className={`${styles["info__value"]} ${styles["info__value--variant"]}`}>$0</p>
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
