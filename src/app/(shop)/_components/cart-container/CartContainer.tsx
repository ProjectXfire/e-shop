import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode;
}

function CartContainer({ children, header }: Props): React.ReactElement {
  return (
    <div className={styles["cart-container"]}>
      <header className={styles["card-header"]}>{header}</header>
      <div className={styles["cart-content"]}>{children}</div>
    </div>
  );
}
export default CartContainer;
