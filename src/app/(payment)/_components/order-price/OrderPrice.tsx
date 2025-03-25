import styles from "./styles.module.css";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import TableKeyValue from "@/shared/components/table-key-value/TableKeyValue";

interface Props {
  items: number;
  subtotal: number;
  taxes: number;
}

function OrderPrice({ items, subtotal, taxes }: Props): React.ReactElement {
  const taxesTotal = subtotal * (taxes / 100);
  const total = taxesTotal + subtotal;

  const fields = [
    { key: "No. Productos", value: `${items}` },
    { key: "Subtotal", value: `${subtotal}` },
    { key: `Impuestos (${taxes}%)`, value: `${taxesTotal}` },
  ];

  return (
    <div className={styles["order-price"]}>
      <TitleAnimated title="Dirección de entrega" />
      <div className={styles["order-price__address"]}>
        <p>My Super nombre y apellido</p>
        <p>My Super dirección en la avenida nose que</p>
        <p>12493</p>
        <p>Popirate</p>
        <p>Perú</p>
        <p>+34-34343-56</p>
      </div>
      <SeparatorAnimated />
      <TitleAnimated title="Resumen de la orden" />
      <div className={styles["order-price__summary"]}>
        <TableKeyValue fields={fields} />
      </div>
      <SeparatorAnimated />
      <div className={styles["order-price__total"]}>
        <p>Total:</p>
        <p>${total}</p>
      </div>
    </div>
  );
}
export default OrderPrice;
