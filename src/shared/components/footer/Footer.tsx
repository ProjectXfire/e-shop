import styles from "./styles.module.css";

const text = ["E-Shop", "©", "2025", "Privacy", "&", "Legal", "Locations"];

function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      {text.map((word, i) => (
        <span className={styles.footer__word} style={{ animationDelay: `${i * 0.2}s` }} key={i}>
          {word}
        </span>
      ))}
    </footer>
  );
}
export default Footer;
