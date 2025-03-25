import NextImage from "next/image";
import NextLink from "next/link";
import styles from "./styles.module.css";

const message = "Ooops!! Page not found";

function Error404(): React.ReactElement {
  return (
    <div className={styles["not-found"]}>
      <div className={styles["not-found__description"]}>
        <p className={styles["error-code"]}>Error 404</p>
        <p className={styles["error-description"]}>
          {Array.from(message).map((letter, i) => (
            <span
              className={styles["error-description__animate"]}
              style={{ animationDelay: `${i * 50}ms` }}
              key={i}
            >
              {letter}
            </span>
          ))}
        </p>
        <NextLink className={styles["error-back"]} href="/">
          Back to home
        </NextLink>
      </div>
      <div className={styles["not-found__image"]}>
        <NextImage className={styles["error-image"]} src="/images/starman.png" alt="error" fill />
      </div>
    </div>
  );
}
export default Error404;
