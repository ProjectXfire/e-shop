import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function FlexContainer({ children }: Props): React.ReactElement {
  return <main className={styles["flex-container"]}>{children}</main>;
}
export default FlexContainer;
