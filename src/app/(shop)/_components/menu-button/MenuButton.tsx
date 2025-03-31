"use client";

import styles from "./styles.module.css";
import { IoMenu } from "react-icons/io5";
import { useSidebar } from "@/core/shop/store/useSidebar";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";

function MenuButton(): React.ReactElement {
  const open = useSidebar((s) => s.open);

  return (
    <ButtonAnimated className={styles["menu-button"]} type="button" onClick={open}>
      <IoMenu />
    </ButtonAnimated>
  );
}
export default MenuButton;
