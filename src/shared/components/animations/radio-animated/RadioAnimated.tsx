"use client";

import { useState } from "react";
import styles from "./styles.module.css";

type Item = { value: string; label: React.ReactNode };

interface Props {
  items: Item[];
  onSelectValue: (value: string) => void;
  defaultSelected?: string | null;
}

function RadioAnimated({ items, onSelectValue, defaultSelected = "" }: Props): React.ReactElement {
  const [valueSelected, setValueSeleted] = useState<string | null>(defaultSelected);

  const handleValueSelected = (value: string) => {
    setValueSeleted(value);
    onSelectValue(value);
  };

  return (
    <ul className={styles["radio-animated"]}>
      {items.map((item) => (
        <li
          className={styles["radio-animated__item"]}
          key={item.value}
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
