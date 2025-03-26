"use client";

import { cart } from "../../../../../data/seed";
import styles from "./styles.module.css";
import CartItem from "./CartItem";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";

interface Props {
  items: any[];
}

function CartList({ items }: Props): React.ReactElement {
  return (
    <section className={styles.cart}>
      <SeparatorAnimated />
      <div className={styles.cart__list}>
        {items.map((item, i) => (
          <CartItem key={item.slug} cart={item} hasUnderline={cart.length - 1 !== i} />
        ))}
      </div>
      <SeparatorAnimated />
    </section>
  );
}
export default CartList;
