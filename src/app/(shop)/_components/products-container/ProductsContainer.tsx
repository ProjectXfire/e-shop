import styles from "./styles.module.css";

interface Props {
  filtersComponent: React.ReactElement;
  productsComponent: React.ReactElement;
}

function ProductsContainer({ filtersComponent, productsComponent }: Props): React.ReactElement {
  return (
    <div className={styles["products-container"]}>
      <div className={styles["products-filters"]}>{filtersComponent}</div>
      <div className={styles["products-list"]}>{productsComponent}</div>
    </div>
  );
}
export default ProductsContainer;
