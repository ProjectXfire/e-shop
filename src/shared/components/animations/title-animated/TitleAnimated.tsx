import styles from "./styles.module.css";

interface Props {
  title: string;
  subtitle?: string;
}

function TitleAnimated({ title, subtitle }: Props): React.ReactElement {
  const subtitleArray = Array.from(subtitle ?? "");

  return (
    <header className={styles["title-animated"]}>
      <h1 className={styles["title-animated__title"]}>{title}</h1>
      {subtitle && (
        <h2 className={styles["title-animated__description"]}>
          {subtitleArray.map((letter, i) => (
            <span
              className={styles["title-animated__description--animate"]}
              style={{ animationDelay: `${i * 50}ms` }}
              key={i}
            >
              {letter}
            </span>
          ))}
        </h2>
      )}
    </header>
  );
}
export default TitleAnimated;
