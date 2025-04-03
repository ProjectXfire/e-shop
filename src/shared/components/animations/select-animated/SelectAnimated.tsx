"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { IoArrowForwardCircle } from "react-icons/io5";
import SeparatorAnimated from "../separator-animated/SeparatorAnimated";

type Item = { value: string; label: string };

interface Props {
  placeholder?: string;
  defaultValue?: Item;
  errorMessage?: string;
  disabled?: boolean;
  items: Item[];
  onChange?: (value: string) => void;
}

function SelectAnimated({
  defaultValue,
  placeholder,
  errorMessage,
  disabled,
  items,
  onChange,
}: Props): React.ReactElement {
  const [value, setValue] = useState<Item>(() => {
    if (defaultValue) return defaultValue;
    return { label: placeholder ?? "Select item", value: "" };
  });
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [waitAnimation, setWaitAnimation] = useState(false);
  const selectRef = useRef<null | HTMLDivElement>(null);

  const startAnimation = !disabled && isOpenSelect;

  const handleValue = (item: Item): void => {
    setValue(item);
    setIsOpenSelect(false);
    if (onChange) onChange(item.value);
  };

  const handleSelect = (e: MouseEvent): void => {
    if (disabled) return;
    if (selectRef.current && selectRef.current.contains(e.target as Node)) {
      setWaitAnimation(true);
      setTimeout(() => {
        setIsOpenSelect(true);
      }, 0);
    } else {
      setIsOpenSelect(false);
      setTimeout(() => {
        setWaitAnimation(false);
      }, 500);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleSelect);
    return () => {
      document.removeEventListener("mousedown", handleSelect);
    };
  }, []);

  return (
    <div ref={selectRef} className={styles.select}>
      <div
        className={`${styles["select-header"]} ${disabled && styles["select-header--disabled"]}`}
      >
        <div className={`${styles.header} `}>
          <div className={styles["header__content"]}>
            <p className={`${styles["content-placeholder"]}`}>{value.label}</p>
            <IoArrowForwardCircle
              className={`${styles["content-icon"]} ${
                startAnimation && styles["content-icon__animate"]
              }`}
              size={20}
            />
          </div>
          <div
            className={`${styles.header__block} ${
              startAnimation && styles["header__block--animate"]
            }`}
          />
        </div>
      </div>
      {waitAnimation && (
        <div className={styles.select__content}>
          <ul
            className={`${styles["content-list"]} ${
              isOpenSelect && styles["content-list--animate"]
            }`}
          >
            {items.map((item, i) => {
              return (
                <li
                  className={styles["content-list__item"]}
                  key={i}
                  onClick={() => handleValue(item)}
                >
                  <p className={styles["item-label"]}>{item.label}</p>
                  <SeparatorAnimated />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {errorMessage && <p className={styles["select__message"]}>{errorMessage}</p>}
    </div>
  );
}
export default SelectAnimated;
