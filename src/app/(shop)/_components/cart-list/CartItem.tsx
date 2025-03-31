"use client";

import type { CartDto } from "@/core/shop/dtos/cart.dto";
import NextLink from "next/link";
import { useCart } from "@/core/shop/store/useCart";
import NextImage from "next/image";
import { currencyFormat } from "@/shared/utils/currency-format";
import styles from "./styles.module.css";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import CounterAnimated from "@/shared/components/animations/counter-animated/CounterAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

interface Props {
  item: CartDto;
  hasUnderline?: boolean;
}

function CartItem({ item, hasUnderline }: Props): React.ReactElement {
  const updateQuantity = useCart((s) => s.updateQuantity);
  const deleteItem = useCart((s) => s.deleteItem);

  const handleUpdateQuantity = (quantity: number): void => {
    updateQuantity(item.id, quantity);
  };

  const handleRemoveItem = (id: string): void => {
    toastMessage.info(`${item.title} ha sido removido el carrito`);
    deleteItem(id);
  };

  return (
    <>
      <article className={styles["cart-item"]}>
        <NextLink href={`/products/${item.slug}`}>
          <NextImage
            className={styles["cart-item__image"]}
            src={item.images[0]}
            alt={item.title}
            width={100}
            height={100}
          />
        </NextLink>
        <div className={styles["cart-item__content"]}>
          <header className={styles.header}>
            <p>{item.title}</p>
            <p className={styles["header__price"]}>{currencyFormat(item.price)}</p>
          </header>
          <div className={styles.content}>
            <p className={styles.content__key}>Size:</p>
            <p>{item.size}</p>
          </div>
          <footer className={styles.footer}>
            <CounterAnimated defaultValue={item.quantity} onChangeCounter={handleUpdateQuantity} />
            <ButtonAnimated
              subBlockColor="var(--color-purple-5)"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remover
            </ButtonAnimated>
          </footer>
        </div>
      </article>
      {hasUnderline && <SeparatorAnimated />}
    </>
  );
}
export default CartItem;
