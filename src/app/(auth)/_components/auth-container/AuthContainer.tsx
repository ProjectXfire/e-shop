import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function AuthContainer({ children }: Props): React.ReactElement {
  return <main className={styles["auth-container"]}>{children}</main>;
}
export default AuthContainer;
