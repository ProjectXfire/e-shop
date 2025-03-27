import styles from "./styles.module.css";
import ChipAnimated from "../animations/chip-animated/ChipAnimated";

interface Props {
  message: string;
  variant?: "error" | "info" | "success" | undefined;
  icon?: React.ReactNode;
}

function ErrorMessage({ message, variant, icon }: Props): React.ReactElement {
  return (
    <div className={styles["error-message"]}>
      <div className={styles["error-message__message"]}>
        <ChipAnimated variant={variant} icon={icon} text={message} />
      </div>
    </div>
  );
}
export default ErrorMessage;
