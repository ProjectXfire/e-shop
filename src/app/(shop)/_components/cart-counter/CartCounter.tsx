"use client";

import styles from "./styles.module.css";
import { IoCartOutline } from "react-icons/io5";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

function CartCounter(): React.ReactElement {
  return (
    <LinkAnimated className={styles["cart-counter"]} href="/cart">
      <div className={styles["cart-counter__counter"]}>5</div>
      <IoCartOutline />
    </LinkAnimated>
  );
}
export default CartCounter;
