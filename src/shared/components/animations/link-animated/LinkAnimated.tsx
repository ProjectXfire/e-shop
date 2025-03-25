import NextLink from "next/link";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
  className?: string;
}

function LinkAnimated({
  children,
  href = "/",
  isActive = false,
  className,
}: Props): React.ReactElement {
  return (
    <NextLink className={`${styles["link-animated"]} ${className}`} href={href}>
      <div className={styles["link-animated__content"]}>{children}</div>
      <div
        className={`${styles["link-animated__block"]} ${
          isActive && styles["link-animated__block--active"]
        }`}
      />
      <div
        className={`${styles["link-animated__border"]} ${
          isActive && styles["link-animated__border--active"]
        }`}
      />
    </NextLink>
  );
}
export default LinkAnimated;
