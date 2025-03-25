import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function CheckoutContainer({ children }: Props): React.ReactElement {
  return <div className={styles["checkout-container"]}>{children}</div>;
}
export default CheckoutContainer;
