import styles from "./styles.module.css";

interface Props {
  text: string;
  icon?: React.ReactNode;
  variant?: "info" | "error" | "success";
}

function ChipAnimated({ text, icon, variant = "info" }: Props): React.ReactElement {
  return (
    <div className={`${styles["chip-animated"]} ${styles[variant]}`}>
      <div style={{ visibility: "hidden", display: "flex" }}>
        {icon && icon}
        <s>{text}</s>
      </div>
      <div className={styles["animate-blocks"]}>
        <div className={`${styles["animate-block"]} ${styles[variant + "-block"]}`}>
          {icon && icon}
          <p>{text}</p>
        </div>
        <div className={`${styles["animate-block"]} ${styles[variant + "-block"]}`}>
          {icon && icon}
          <p>{text}</p>
        </div>
      </div>
      <div className={`${styles["animate-block-secondary"]}`}>
        <div className={`${styles["animate-block"]} ${styles[variant + "-block"]}`}>
          {icon && icon}
          <p>{text}</p>
        </div>
        <div className={`${styles["animate-block"]} ${styles[variant + "-block"]}`}>
          {icon && icon}
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
export default ChipAnimated;
