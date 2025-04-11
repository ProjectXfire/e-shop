import type { Order } from "@/core/payment/models/order.model";
import { IoCardOutline } from "react-icons/io5";
import { currencyFormat } from "@/shared/utils/currency-format";
import styles from "./styles.module.css";
import OrderProducts from "../order-products/OrderProducts";
import OrderPrice from "../order-price/OrderPrice";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import ChipAnimated from "@/shared/components/animations/chip-animated/ChipAnimated";

interface Props {
  order: Order;
}

function Order({ order }: Props): React.ReactElement {
  return (
    <section className={styles.order}>
      <div className={styles.order__products}>
        <TitleAnimated title="Estado de la orden" />
        {order.isPaid ? (
          <ChipAnimated text="Pagado" variant="success" icon={<IoCardOutline size={20} />} />
        ) : (
          <ChipAnimated
            text="Pendiente de pago"
            variant="error"
            icon={<IoCardOutline size={20} />}
          />
        )}
        <TitleAnimated title="Productos" />
        <OrderProducts products={order.items} />
      </div>
      <div className={styles.order__summary}>
        <OrderPrice
          address={order.deliveryAddress}
          items={order.itemsInOrder}
          taxes={currencyFormat(order.tax)}
          delivery={currencyFormat(order.delivery)}
          subtotal={currencyFormat(order.subtotal)}
          total={currencyFormat(order.total)}
        />
      </div>
    </section>
  );
}
export default Order;
