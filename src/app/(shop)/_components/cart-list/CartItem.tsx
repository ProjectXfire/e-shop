"use client";

import NextImage from "next/image";
import styles from "./styles.module.css";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import CounterAnimated from "@/shared/components/animations/counter-animated/CounterAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";

interface Props {
  cart: any;
  hasUnderline?: boolean;
}

function CartItem({ cart, hasUnderline }: Props): React.ReactElement {
  return (
    <>
      <article className={styles["cart-item"]}>
        <NextImage
          className={styles["cart-item__image"]}
          src={`/products/${cart.images[0]}`}
          alt={cart.title}
          width={120}
          height={120}
        />
        <div className={styles["cart-item__content"]}>
          <header className={styles.header}>
            <p>{cart.title}</p>
            <p className={styles["header__price"]}>${cart.price}</p>
          </header>
          <div className={styles.content}>
            <p className={styles.content__key}>Color:</p>
            <p>red</p>
          </div>
          <div className={styles.content}>
            <p className={styles.content__key}>Size:</p>
            <p>{cart.size}</p>
          </div>
          <footer className={styles.footer}>
            <CounterAnimated defaultValue={cart.qtty} />
            <ButtonAnimated subBlockColor="var(--color-purple-4)">Remover</ButtonAnimated>
          </footer>
        </div>
      </article>
      {hasUnderline && <SeparatorAnimated />}
    </>
  );
}
export default CartItem;
