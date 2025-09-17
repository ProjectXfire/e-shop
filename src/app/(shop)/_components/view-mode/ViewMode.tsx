"use client";

import { useQueryPathname } from "@/shared/utils/query-params/use-pathname";
import { IoMdGrid, IoIosList } from "react-icons/io";
import styles from "./styles.module.css";

interface Props {
  view: string;
}

function ViewMode({ view }: Props): React.ReactElement {
  const { handlePathname } = useQueryPathname();

  return (
    <div className={styles["view-mode"]}>
      <button
        className={`${styles["view-mode__action"]} ${styles.left} ${
          view === "grid" && styles.active
        }`}
        type="button"
        onClick={() => handlePathname({ view: "grid" })}
      >
        <IoMdGrid />
      </button>
      <button
        className={`${styles["view-mode__action"]} ${styles.right} ${
          view === "list" && styles.active
        }`}
        type="button"
        onClick={() => handlePathname({ view: "list" })}
      >
        <IoIosList />
      </button>
    </div>
  );
}
export default ViewMode;
