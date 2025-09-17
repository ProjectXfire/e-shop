import type { Product } from "@/core/shop/models/product.model";
import styles from "./styles.module.css";
import Message from "@/shared/components/message/Message";
import ProductItem from "./ProductItem";
import SearchProduct from "../search-product/SearchProduct";
import ProductListItem from "./ProductListItem";
import ViewMode from "../view-mode/ViewMode";

interface Props {
  products: Product[];
  viewMode: string;
}

function ProductsGrid({ products, viewMode }: Props): React.ReactElement {
  return (
    <div className={styles.products}>
      <header className={styles["products-header"]}>
        <SearchProduct />
        <ViewMode view={viewMode} />
      </header>
      {products.length === 0 ? (
        <Message message="No se encontraron productos" />
      ) : (
        <>
          {viewMode === "grid" ? (
            <ul className={styles["products-grid"]}>
              {products.map((prod, i) => (
                <ProductItem key={i} product={prod} />
              ))}
            </ul>
          ) : (
            <ul className={styles["products-list"]}>
              {products.map((prod, i) => (
                <ProductListItem key={i} product={prod} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default ProductsGrid;
