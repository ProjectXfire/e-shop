"use client";

import { useCart } from "@/core/shop/store/useCart";
import styles from "./styles.module.css";
import { IoCartOutline } from "react-icons/io5";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

function CartCounter(): React.ReactElement {
  const totalItems = useCart((s) => s.totalItems);

  return (
    <LinkAnimated className={styles["cart-counter"]} href="/cart">
      <div className={styles["cart-counter__counter"]}>{totalItems > 99 ? "+99" : totalItems}</div>
      <IoCartOutline />
    </LinkAnimated>
  );
}
export default CartCounter;
