"use client";

import { usePathname } from "next/navigation";
import { categoriesRoutes } from "@/core/shop/constants/categories-routes";
import styles from "./styles.module.css";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

function TopMenuLinks(): React.ReactElement {
  const pathname = usePathname();

  return (
    <div className={styles["categories-links"]}>
      {categoriesRoutes.map((category) => (
        <LinkAnimated
          key={category.name}
          href={category.path}
          isActive={category.path === pathname}
        >
          {category.name}
        </LinkAnimated>
      ))}
    </div>
  );
}
export default TopMenuLinks;
