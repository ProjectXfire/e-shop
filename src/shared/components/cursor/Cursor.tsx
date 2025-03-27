"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useCursor } from "@/shared/stores/useCursor";

function Cursor(): React.ReactElement {
  const cursorRef = useRef<null | HTMLDivElement>(null);
  const animationFrameId = useRef<null | number>(null);
  const isOver = useCursor((s) => s.isOver);
  const text = useCursor((s) => s.text);

  const handleCursor = (e: MouseEvent): void => {
    if (!cursorRef.current) return;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(() => {
      cursorRef.current!.style.transform = `translate(${e.clientX}px, ${e.clientY}px) ${
        isOver ? "scale(1)" : "scale(0.2)"
      }`;
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleCursor);
    return () => {
      document.removeEventListener("mousemove", handleCursor);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isOver]);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      {text}
    </div>
  );
}
export default Cursor;
