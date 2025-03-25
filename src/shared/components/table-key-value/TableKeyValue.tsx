import styles from "./styles.module.css";

type Field = { key: string; value: string };

interface Props {
  fields: Field[];
}

function TableKeyValue({ fields }: Props): React.ReactElement {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fields.map((item, i) => (
          <tr key={i}>
            <td className={`${styles["table-data"]} ${styles["table-data--key"]}`}>{item.key}</td>
            <td className={styles["table-data"]}>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TableKeyValue;
