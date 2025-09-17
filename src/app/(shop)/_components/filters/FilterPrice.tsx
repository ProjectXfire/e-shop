"use client";

import RadioAnimated from "@/shared/components/animations/radio-animated/RadioAnimated";
import styles from "./styles.module.css";
import { useQueryPathname } from "@/shared/utils/query-params/use-pathname";

function FilterPrice(): React.ReactElement {
  const { handlePathname, currentFilters } = useQueryPathname();

  const handleSelected = (value: null | string) => {
    if (!value) handlePathname({ price: "" });
    else handlePathname({ price: value });
  };

  const currentPrice = currentFilters().price;

  return (
    <div className={styles["filter-price"]}>
      <RadioAnimated<null | string>
        items={[
          { label: "Cualquier precio", value: null },
          { label: "$0 - $49", value: "0-49" },
          { label: "$50 - $99", value: "49-99" },
          { label: "$100 - $199", value: "100-199" },
          { label: "$200+", value: "200" },
        ]}
        defaultSelected={currentPrice.length === 0 ? null : currentPrice}
        onSelectValue={handleSelected}
      />
    </div>
  );
}
export default FilterPrice;
