import NextLink from "next/link";
import styles from "./styles.module.css";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import MenuButton from "../menu-button/MenuButton";

function TopMenu(): React.ReactElement {
  return (
    <div className={styles["navbar-container"]}>
      <MaxWidthContainer>
        <nav className={styles.navbar}>
          <NextLink href="/admin">E-Shop - Admin</NextLink>
          <div className={styles.navbar__actions}>
            <MenuButton />
          </div>
        </nav>
      </MaxWidthContainer>
    </div>
  );
}
export default TopMenu;
