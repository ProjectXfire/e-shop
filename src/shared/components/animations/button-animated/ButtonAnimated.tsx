import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  contentStyle?: string;
  subBlockColor?: string;
}

function ButtonAnimated({
  children,
  type = "button",
  onClick,
  className,
  contentStyle,
  disabled,
  subBlockColor,
}: Props): React.ReactElement {
  return (
    <button
      className={`${styles["button-animated"]} ${
        disabled && styles["button-animated--disabled"]
      } ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <div className={`${styles["button-animated__content"]} ${contentStyle}`}>{children}</div>
      <div className={styles["button-animated__block"]} />
      <div className={styles["button-animated__subblock"]} style={{ background: subBlockColor }} />
    </button>
  );
}
export default ButtonAnimated;
