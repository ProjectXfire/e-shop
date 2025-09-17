import NextImage from "next/image";
import NextLink from "next/link";
import { Product } from "@/core/shop/models/product.model";
import styles from "./styles.module.css";

interface Props {
  product: Product;
}

function ProductListItem({ product }: Props): React.ReactElement {
  return (
    <NextLink className={styles["product-list-item"]} href={`/products/${product.slug}`}>
      <NextImage
        className={styles["product-list-item__image"]}
        src={product.images[0]}
        alt={product.title}
        width={150}
        height={150}
      />
      <div className={styles["product-list-item__content"]}>
        <p className={styles["content-title"]}>{product.title}</p>
        <div className={styles["content-tags"]}>
          {product.tags.map((size, i) => (
            <p key={i}>{size}</p>
          ))}
        </div>
        <div className={styles["content-sizes"]}>
          {product.sizes.map((size, i) => (
            <p className={styles.size} key={i}>
              {size}
            </p>
          ))}
        </div>
        <div className={styles["product-list-item__spacer"]}></div>
        <p className={styles["content-price"]}>${product.price}</p>
      </div>
    </NextLink>
  );
}
export default ProductListItem;
