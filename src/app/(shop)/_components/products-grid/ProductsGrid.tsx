import type { Product } from "@/core/shop/models/product";
import styles from "./styles.module.css";
import ProductItem from "./ProductItem";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

interface Props {
  products: Product[];
}

function ProductsGrid({ products }: Props): React.ReactElement {
  return (
    <FadeinContainer duration={200}>
      <ul className={styles["products-grid"]}>
        {products.map((prod, i) => (
          <ProductItem key={i} product={prod} />
        ))}
      </ul>
    </FadeinContainer>
  );
}
export default ProductsGrid;
