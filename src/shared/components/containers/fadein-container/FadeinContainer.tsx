import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  duration?: number;
}

function FadeinContainer({ children, duration = 500 }: Props): React.ReactElement {
  return (
    <div className={styles["fadein-container"]} style={{ animationDuration: `${duration}ms` }}>
      {children}
    </div>
  );
}
export default FadeinContainer;
