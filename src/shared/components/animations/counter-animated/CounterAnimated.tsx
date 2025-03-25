"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { IoAdd, IoRemove } from "react-icons/io5";

interface Props {
  defaultValue?: number;
  onChangeCounter?: (value: number) => void;
}

function CounterAnimated({ defaultValue, onChangeCounter }: Props): React.ReactElement {
  const [count, setCount] = useState(defaultValue ?? 1);
  const [previousValue, setPreviousValue] = useState(
    defaultValue ? Math.max(1, defaultValue - 1) : 1
  );
  const [nextValue, setNextValue] = useState(defaultValue ? defaultValue + 1 : 2);
  const [animation, setAnimation] = useState<"up" | "down" | "">("");
  const [startAnimation, setStartAnimation] = useState(false);

  const handleDecrease = (): void => {
    if (startAnimation) return;
    setAnimation("down");
    setStartAnimation(true);
    const currentValue = Math.max(1, count - 1);
    if (onChangeCounter) onChangeCounter(currentValue);
    setTimeout(() => {
      setCount(currentValue);
      setPreviousValue(Math.max(1, currentValue - 1));
      setNextValue(currentValue + 1);
      setStartAnimation(false);
      setAnimation("");
    }, 300);
  };
  const handleIncrease = (): void => {
    if (startAnimation) return;
    setStartAnimation(true);
    setAnimation("up");
    const currentValue = count + 1;
    if (onChangeCounter) onChangeCounter(currentValue);
    setTimeout(() => {
      setCount(currentValue);
      setPreviousValue(Math.max(1, currentValue - 1));
      setNextValue(currentValue + 1);
      setStartAnimation(false);
      setAnimation("");
    }, 300);
  };

  return (
    <div className={styles["counter-animated"]}>
      <button
        className={styles["counter-animated__action"]}
        type="button"
        name="increase"
        onClick={handleDecrease}
      >
        <IoRemove />
        <div className={styles["animate-action"]} />
      </button>
      <div className={`${styles["counter-animated__number"]}`}>
        <div className={`${styles["block-number"]}} ${animation && styles["block-number--hide"]}`}>
          {count}
        </div>
        {animation === "up" && (
          <>
            <div
              className={`${styles["block-animated"]} ${styles["block-animated--show"]} ${styles["roll-up-from-current"]}`}
            >
              {count}
            </div>
            <div
              className={`${styles["block-animated"]} ${styles["block-animated--show"]} ${styles["roll-up-from-down"]}`}
            >
              {nextValue}
            </div>
          </>
        )}
        {animation === "down" && (
          <>
            <div
              className={`${styles["block-animated"]} ${styles["block-animated--show"]} ${styles["roll-dowm-from-current"]}`}
            >
              {count}
            </div>
            <div
              className={`${styles["block-animated"]} ${styles["block-animated--show"]} ${styles["roll-dowm-from-up"]}`}
            >
              {previousValue}
            </div>
          </>
        )}
      </div>
      <button
        className={styles["counter-animated__action"]}
        type="button"
        name="decrease"
        onClick={handleIncrease}
      >
        <IoAdd />
        <div className={styles["animate-action"]} />
      </button>
    </div>
  );
}
export default CounterAnimated;
