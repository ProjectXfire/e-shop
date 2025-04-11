"use client";

import type { OrderTable } from "@/core/payment/models/order.model";
import { formatDate } from "@/shared/utils/date-format";
import styles from "./styles.module.css";
import { IoCardOutline } from "react-icons/io5";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

interface Props {
  orders: OrderTable[];
}

function OrdersList({ orders }: Props): React.ReactNode {
  return (
    <div className={styles["orders-list-container"]}>
      <table className={styles["orders-list"]}>
        <thead className={styles["table-header"]}>
          <tr>
            <th className={styles["table-head"]}>No.</th>
            <th className={styles["table-head"]}>Nombre completo</th>
            <th className={styles["table-head"]}>Creado en</th>
            <th className={styles["table-head"]}>Estado</th>
            <th className={styles["table-head"]}>Pagado en</th>
            <th className={styles["table-head"]}></th>
          </tr>
        </thead>
        <tbody className={styles["table-body"]}>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className={styles["table-data"]}>{order.shortId}</td>
              <td className={styles["table-data"]}>{order.user}</td>
              <td className={styles["table-data"]}>{formatDate(order.createdAt)}</td>
              <td className={styles["table-data"]}>
                {order.isPaid ? (
                  <div
                    className={`${styles["table-data__status"]} ${styles["table-data__status--success"]}`}
                  >
                    <IoCardOutline size={20} /> Pagado
                  </div>
                ) : (
                  <div
                    className={`${styles["table-data__status"]} ${styles["table-data__status--error"]}`}
                  >
                    <IoCardOutline size={20} /> Pendiente de pago
                  </div>
                )}
              </td>
              <td className={styles["table-data"]}>{order.paidAt && formatDate(order.paidAt)}</td>
              <td className={`${styles["table-data"]}`}>
                <LinkAnimated href={`/admin/orders/${order.id}`}>Ver Orden</LinkAnimated>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default OrdersList;
