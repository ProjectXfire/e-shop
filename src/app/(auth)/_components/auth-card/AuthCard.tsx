import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

function AuthCard({ children }: Props): React.ReactElement {
  return <div className={styles["auth-card"]}>{children}</div>;
}
export default AuthCard;
