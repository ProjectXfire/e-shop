import styles from "./styles.module.css";

interface Props {
  title: string;
  children: React.ReactElement;
}

function FilterBox({ children, title }: Props): React.ReactElement {
  return (
    <div className={styles["box-filter"]}>
      <h1 className={styles["box-filter__title"]}>{title}</h1>
      <div>{children}</div>
    </div>
  );
}
export default FilterBox;
