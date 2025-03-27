"use client";

import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  icon?: React.ReactNode;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputAnimated({
  defaultValue,
  icon,
  placeholder,
  type = "text",
  name,
  errorMessage,
  disabled,
  onChange,
}: Props): React.ReactElement {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isOnFocus, setIsOnFocus] = useState(false);

  const handleValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };
  const handleFocus = (): void => {
    setIsOnFocus(true);
  };
  const handleBlur = (): void => {
    setIsOnFocus(false);
  };

  return (
    <div className={styles["input-container"]}>
      <div className={`${styles.input} ${disabled && styles["input--disabled"]}`}>
        <div className={styles.input__content}>
          {icon && icon}
          <input
            className={styles.textarea}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={handleValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className={`${styles.input__block} ${isOnFocus && styles["input__block--animate"]}`} />
      </div>
      {errorMessage && <p className={styles["input__message"]}>{errorMessage}</p>}
    </div>
  );
}
export default InputAnimated;
