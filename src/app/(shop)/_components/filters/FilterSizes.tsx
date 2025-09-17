"use client";

import { Size, sizes } from "@/shared/utils/query-params/queries";
import styles from "./styles.module.css";
import { useQueryPathname } from "@/shared/utils/query-params/use-pathname";

function FilterSizes(): React.ReactElement {
  const { handlePathname, currentFilters } = useQueryPathname();

  const handleSize = (size: Size): void => {
    handlePathname({ size });
  };

  const sizesSelected = currentFilters().sizes;

  return (
    <div className={styles["filter-size"]}>
      {sizes.map((size, i) => (
        <button
          className={`${styles.size} ${sizesSelected.includes(size) && styles["size--active"]}`}
          key={i}
          type="button"
          onClick={() => handleSize(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

export default FilterSizes;
