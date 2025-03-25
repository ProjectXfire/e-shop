import styles from "./styles.module.css";

function SeparatorAnimated(): React.ReactElement {
  return (
    <div className={styles.separator}>
      <div className={styles.separator__line} />
      <div className={styles.separator__neon} />
    </div>
  );
}
export default SeparatorAnimated;
