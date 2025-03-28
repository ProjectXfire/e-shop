"use client";

import type { ValidSize } from "@/core/shop/models/product";
import { useState } from "react";
import styles from "./styles.module.css";

type Values = { value: ValidSize; label: string };

interface Props {
  values: Values[];
  defaultValue: ValidSize;
  onSelecValue: (value: ValidSize) => void;
}

function SelectAnimated({ values, onSelecValue, defaultValue }: Props): React.ReactElement {
  const [selectedValue, setSelectedValue] = useState<ValidSize>(defaultValue);

  const handleSelected = (selected: ValidSize): void => {
    setSelectedValue(selected);
    onSelecValue(selected);
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
              selectedValue === value.value && styles["block-2--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-3"]} ${
              selectedValue === value.value && styles["block-3--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-4"]} ${
              selectedValue === value.value && styles["block-4--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-5"]} ${
              selectedValue === value.value && styles["block-5--active"]
            }`}
          ></span>
          <span
            className={`${styles.block} ${styles["block-6"]} ${
              selectedValue === value.value && styles["block-6--active"]
            }`}
          >
            {value.label}
          </span>
        </button>
      ))}
    </div>
  );
}
export default SelectAnimated;
