import { IoCartOutline } from "react-icons/io5";
import styles from "./styles.module.css";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

function EmptyCart(): React.ReactElement {
  return (
    <div className={styles["empty-cart"]}>
      <IoCartOutline size={100} />
      No hay artículos en el carrito
      <LinkAnimated href="/">Regresar</LinkAnimated>
    </div>
  );
}
export default EmptyCart;
