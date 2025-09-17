import FilterBox from "./FilterBox";
import FilterPrice from "./FilterPrice";
import FilterSizes from "./FilterSizes";
import styles from "./styles.module.css";

function Filters(): React.ReactElement {
  return (
    <div className={styles.filters}>
      <FilterBox title="Tallas">
        <FilterSizes />
      </FilterBox>
      <FilterBox title="Precio">
        <FilterPrice />
      </FilterBox>
    </div>
  );
}
export default Filters;
