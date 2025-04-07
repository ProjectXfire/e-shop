import type { OrderAddress } from "@/core/payment/models/order.model";
import styles from "./styles.module.css";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import TableKeyValue from "@/shared/components/table-key-value/TableKeyValue";
import { currencyFormat } from "@/shared/utils/currency-format";

interface Props {
  items: number;
  subtotal: string;
  delivery: string;
  total: string;
  taxes: string;
  address: OrderAddress;
}

function OrderPrice({
  items,
  subtotal,
  taxes,
  delivery,
  total,
  address,
}: Props): React.ReactElement {
  const fields = [
    { key: "No. Productos", value: `${items}` },
    { key: "Subtotal", value: `${subtotal}` },
    { key: `Gastos de envío (10%)`, value: `${delivery}` },
    { key: `Impuestos (12%)`, value: `${taxes}` },
  ];

  return (
    <div className={styles["order-price"]}>
      <TitleAnimated title="Dirección de entrega" />
      <div className={styles["order-price__address"]}>
        <p>{address.firstName}</p>
        <p>{address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.city}</p>
        <p>{address.country.name}</p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>
      <SeparatorAnimated />
      <TitleAnimated title="Resumen de la orden" />
      <div className={styles["order-price__summary"]}>
        <TableKeyValue fields={fields} />
      </div>
      <SeparatorAnimated />
      <div className={styles["order-price__total"]}>
        <p>Total:</p>
        <p>{total}</p>
      </div>
    </div>
  );
}
export default OrderPrice;
