import NextImage from "next/image";
import styles from "./styles.module.css";

interface Props {
  products: any[];
}

function OrderProducts({ products }: Props): React.ReactElement {
  return (
    <div className={styles.products}>
      {products.map((item, i) => (
        <article className={styles["order-product"]} key={i}>
          <NextImage
            className={styles["order-product__image"]}
            src={`/products/${item.images[0]}`}
            alt={item.title}
            width={60}
            height={60}
          />
          <div className={styles["order-product__content"]}>
            <p>{item.title}</p>
            <div className={styles.content__price}>
              <p>${item.price}</p>
              <p>x</p>
              <p>{item.qtty}</p>
            </div>
            <p className={styles.content__total}>
              <span>Subtotal:</span> <span>${item.price * item.qtty}</span>
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
export default OrderProducts;
