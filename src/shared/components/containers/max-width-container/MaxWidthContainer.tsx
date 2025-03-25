import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function MaxWidthContainer({ children }: Props): React.ReactElement {
  return <div className={styles["max-width-container"]}>{children}</div>;
}
export default MaxWidthContainer;
