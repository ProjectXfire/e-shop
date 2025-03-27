import { IoCardOutline } from "react-icons/io5";
import styles from "./styles.module.css";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

interface Props {
  orders: { id: string; name: string; status: string }[];
}

function OrdersList({ orders }: Props): React.ReactNode {
  return (
    <table className={styles["orders-list"]}>
      <thead className={styles["table-header"]}>
        <tr>
          <th className={styles["table-head"]}>No.</th>
          <th className={styles["table-head"]}>Nombre completo</th>
          <th className={styles["table-head"]}>Estado</th>
          <th className={styles["table-head"]}></th>
        </tr>
      </thead>
      <tbody className={styles["table-body"]}>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className={styles["table-data"]}>{order.id}</td>
            <td className={styles["table-data"]}>{order.name}</td>
            <td className={styles["table-data"]}>
              {order.status === "Pagado" ? (
                <div
                  className={`${styles["table-data__status"]} ${styles["table-data__status--success"]}`}
                >
                  <IoCardOutline size={20} /> {order.status}
                </div>
              ) : (
                <div
                  className={`${styles["table-data__status"]} ${styles["table-data__status--error"]}`}
                >
                  <IoCardOutline size={20} /> {order.status}
                </div>
              )}
            </td>
            <td className={`${styles["table-data"]}`}>
              <LinkAnimated href={`/orders/${order.id}`}>Ver Orden</LinkAnimated>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default OrdersList;
