"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  placeholder?: string;
  defaultValue?: string;
  name?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaAnimated({
  defaultValue,
  placeholder,
  name,
  errorMessage,
  disabled,
  onChange,
}: Props): React.ReactElement {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isOnFocus, setIsOnFocus] = useState(false);

  const handleValue = (e: ChangeEvent<HTMLTextAreaElement>): void => {
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
    <div className={styles["textarea-container"]}>
      <div className={`${styles.textarea} ${disabled && styles["textarea--disabled"]}`}>
        <div className={styles.textarea__content}>
          <textarea
            className={styles.text}
            placeholder={placeholder}
            name={name}
            value={value}
            rows={5}
            disabled={disabled}
            onChange={handleValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></textarea>
        </div>
        <div
          className={`${styles.textarea__block} ${isOnFocus && styles["textarea__block--animate"]}`}
        />
      </div>
      {errorMessage && <p className={styles["textarea__message"]}>{errorMessage}</p>}
    </div>
  );
}
export default TextAreaAnimated;
