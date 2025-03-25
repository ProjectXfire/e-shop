import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function PaddingContainer({ children }: Props): React.ReactElement {
  return <div className={styles["padding-container"]}>{children}</div>;
}
export default PaddingContainer;
