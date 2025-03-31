"use client";

import type { CartDto } from "@/core/shop/dtos/cart.dto";
import styles from "./styles.module.css";
import CartItem from "./CartItem";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import { useCart } from "@/core/shop/store/useCart";

interface Props {
  items: CartDto[];
}

function CartList({ items }: Props): React.ReactElement {
  return (
    <section className={styles.cart}>
      <SeparatorAnimated />
      <div className={styles.cart__list}>
        {items.map((item, i) => (
          <CartItem key={item.id} item={item} hasUnderline={items.length - 1 !== i} />
        ))}
      </div>
      <SeparatorAnimated />
    </section>
  );
}
export default CartList;
