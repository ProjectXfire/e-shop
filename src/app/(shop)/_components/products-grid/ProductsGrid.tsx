import type { Product } from "@/core/shop/models/product";
import styles from "./styles.module.css";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
}

function ProductsGrid({ products }: Props): React.ReactElement {
  return (
    <ul className={styles["products-grid"]}>
      {products.map((prod, i) => (
        <ProductItem key={i} product={prod} />
      ))}
    </ul>
  );
}
export default ProductsGrid;
