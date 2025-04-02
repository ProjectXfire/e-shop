"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface Props {
  height?: number;
}

function SkeletonAnimated({ height }: Props): React.ReactElement {
  const refTop = useRef<HTMLDivElement | null>(null);
  const refRight = useRef<HTMLDivElement | null>(null);
  const refBottom = useRef<HTMLDivElement | null>(null);
  const refLeft = useRef<HTMLDivElement | null>(null);

  const startAnimation = (): void => {
    refTop.current?.classList.add(styles["skeleton__x-top-animate"]);
    refRight.current?.classList.add(styles["skeleton__y-right-animate"]);
    refBottom.current?.classList.add(styles["skeleton__x-bottom-animate"]);
    refLeft.current?.classList.add(styles["skeleton__x-left-animate"]);
  };

  const restartAnimation = (): void => {
    refTop.current?.classList.remove(styles["skeleton__x-top-animate"]);
    refRight.current?.classList.remove(styles["skeleton__y-right-animate"]);
    refBottom.current?.classList.remove(styles["skeleton__x-bottom-animate"]);
    refLeft.current?.classList.remove(styles["skeleton__x-left-animate"]);
    void refTop.current?.offsetWidth;
    startAnimation();
  };

  useEffect(() => {
    if (!refTop.current || !refRight.current || !refBottom.current || !refLeft.current) return;
    startAnimation();
    const animationInterval = setInterval(() => {
      restartAnimation();
    }, 5300);
    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className={styles.container} style={{ height }}>
      <div className={styles.skeleton} style={{ height }} />
      <div ref={refTop} className={`${styles.skeleton__x} ${styles["skeleton__x--top"]}`}></div>
      <div ref={refRight} className={`${styles.skeleton__y} ${styles["skeleton__y--right"]}`}></div>
      <div
        ref={refBottom}
        className={`${styles.skeleton__x} ${styles["skeleton__x--bottom"]}`}
      ></div>
      <div ref={refLeft} className={`${styles.skeleton__y} ${styles["skeleton__y--left"]}`}></div>
    </div>
  );
}
export default SkeletonAnimated;
