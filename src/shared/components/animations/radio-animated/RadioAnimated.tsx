"use client";

import { useState } from "react";
import styles from "./styles.module.css";

type Item<T> = { value: T; label: React.ReactNode };

interface Props<T> {
  items: Item<T>[];
  onSelectValue: (value: T) => void;
  defaultSelected?: T;
}

function RadioAnimated<T>({ items, onSelectValue, defaultSelected }: Props<T>): React.ReactElement {
  const [valueSelected, setValueSeleted] = useState<T | undefined>(defaultSelected);

  const handleValueSelected = (value: T) => {
    setValueSeleted(value);
    onSelectValue(value);
  };

  return (
    <ul className={styles["radio-animated"]}>
      {items.map((item, i) => (
        <li
          className={styles["radio-animated__item"]}
          key={i}
          onClick={() => handleValueSelected(item.value)}
        >
          <div className={styles["item-block"]}>
            <div
              className={`${styles["item-block__subblock"]} ${
                valueSelected === item.value && styles["item-block__subblock--selected"]
              }`}
            />
          </div>
          <div
            className={`${styles["item-block__pulse"]} ${
              valueSelected === item.value && styles["pulse-animate"]
            }`}
          />
          <div className={styles["item-label"]}>{item.label}</div>
        </li>
      ))}
    </ul>
  );
}
export default RadioAnimated;
