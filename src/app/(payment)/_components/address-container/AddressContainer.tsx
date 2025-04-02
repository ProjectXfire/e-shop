import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function AddressContainer({ children }: Props): React.ReactElement {
  return <div className={styles["address-container"]}>{children}</div>;
}
export default AddressContainer;
