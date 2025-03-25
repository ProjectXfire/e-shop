import { IoCardOutline } from "react-icons/io5";
import styles from "./styles.module.css";
import OrderProducts from "../order-products/OrderProducts";
import OrderPrice from "../order-price/OrderPrice";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import ChipAnimated from "@/shared/components/animations/chip-animated/ChipAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";

interface Props {
  order: any[];
}

function Order({ order }: Props): React.ReactElement {
  const subtotal = order.reduce((acc, cv) => acc + cv.price * cv.qtty, 0);
  const totalItems = order.reduce((acc, cv) => acc + cv.qtty, 0);

  return (
    <section className={styles.order}>
      <div className={styles.order__products}>
        <TitleAnimated title="Estado de la orden" />
        <ChipAnimated text="Pagado" variant="success" icon={<IoCardOutline size={25} />} />
        <TitleAnimated title="Productos" />
        <OrderProducts products={order} />
      </div>
      <div className={styles.order__summary}>
        <OrderPrice items={totalItems} taxes={15} subtotal={subtotal} />
        <ButtonAnimated subBlockColor="var(--color-purple-4)">Pagar</ButtonAnimated>
      </div>
    </section>
  );
}
export default Order;
