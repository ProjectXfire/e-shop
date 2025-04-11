"use client";

import type { ValidSize } from "@/core/shop/models/product.model";
import { useState } from "react";
import styles from "./styles.module.css";

type Values = { value: ValidSize; label: string };

interface Props {
  values: Values[];
  defaultValue?: ValidSize[];
  onSelectedValues: (values: ValidSize[]) => void;
}

function SelectMultipleSizesAnimated({
  values,
  onSelectedValues,
  defaultValue = [],
}: Props): React.ReactElement {
  const [selectedValues, setSelectedValues] = useState<ValidSize[]>(defaultValue);

  const handleSelected = (selected: ValidSize): void => {
    if (selectedValues.includes(selected)) {
      const updatedValues = [...selectedValues].filter((item) => selected !== item);
      setSelectedValues(updatedValues);
      onSelectedValues(updatedValues);
    } else {
      const updatedValues = [...selectedValues];
      updatedValues.push(selected);
      setSelectedValues(updatedValues);
      onSelectedValues(updatedValues);
    }
  };

  return (
    <div className={styles["select-animated"]}>
      {values.map((value) => (
        <button
          className={styles["select-animated__action"]}
          key={value.value}
          type="button"
          name={value.label}
          onClick={() => handleSelected(value.value)}
        >
          <div className={styles.hidden}>{value.label}</div>
          <span
            className={`${styles.block} ${styles["block-2"]} ${
              selectedValues.includes(value.value) && styles["block-2--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-3"]} ${
              selectedValues.includes(value.value) && styles["block-3--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-4"]} ${
              selectedValues.includes(value.value) && styles["block-4--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-5"]} ${
              selectedValues.includes(value.value) && styles["block-5--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-6"]} ${
              selectedValues.includes(value.value) && styles["block-6--active"]
            }`}
          >
            {value.label}
          </span>
        </button>
      ))}
    </div>
  );
}
export default SelectMultipleSizesAnimated;
