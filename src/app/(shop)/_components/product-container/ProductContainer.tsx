import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function ProductContainer({ children }: Props): React.ReactElement {
  return <div className={styles["product-container"]}>{children}</div>;
}
export default ProductContainer;
