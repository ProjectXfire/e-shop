import type { OrderItem } from "@/core/payment/models/order.model";
import NextImage from "next/image";
import styles from "./styles.module.css";

interface Props {
  products: OrderItem[];
}

function OrderProducts({ products }: Props): React.ReactElement {
  return (
    <div className={styles.products}>
      {products.map((item, i) => (
        <article className={styles["order-product"]} key={i}>
          <NextImage
            className={styles["order-product__image"]}
            src={item.product.images[0]}
            alt={item.product.title}
            width={60}
            height={60}
          />
          <div className={styles["order-product__content"]}>
            <p>{item.product.title}</p>
            <div className={styles.content__price}>
              <p>${item.price}</p>
              <p>x</p>
              <p>{item.quantity}</p>
            </div>
            <p className={styles.content__total}>
              <span>Subtotal:</span> <span>${item.price * item.quantity}</span>
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
export default OrderProducts;
