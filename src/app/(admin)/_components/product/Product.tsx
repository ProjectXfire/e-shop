import type { Product } from "@/core/shop/models/product.model";
import { currencyFormat } from "@/shared/utils/currency-format";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

interface Props {
  product: Product;
}

function Product({ product }: Props): React.ReactElement {
  return (
    <section className={styles["product"]}>
      <TitleAnimated title={product.title} subtitle={`${currencyFormat(product.price)}`} />
      <div className={styles["product__stock"]}>
        <p className={styles["product-subtitle"]}>En Stock</p>
        <p>{product.inStock}</p>
      </div>
      <div className={styles["product__sizes"]}>
        <p className={styles["product-subtitle"]}>Tamaños</p>
        <div className={styles.sizes}>
          {product.sizes.map((size, i) => (
            <p className={styles.sizes__item} key={i}>
              <span className={styles.item}>{size}</span>
            </p>
          ))}
        </div>
      </div>
      <div className={styles["product__description"]}>
        <p className={styles["product-subtitle"]}>Descripción</p>
        <p>{product.description}</p>
      </div>
    </section>
  );
}

export default Product;
