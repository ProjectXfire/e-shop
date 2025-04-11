import type { User } from "@/core/user/models/user.model";
import NextLink from "next/link";
import styles from "./styles.module.css";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import MenuButton from "@/app/(shop)/_components/menu-button/MenuButton";

interface Props {
  user: User | null;
}

function TopMenu({ user }: Props): React.ReactElement {
  return (
    <div className={styles["navbar-container"]}>
      <MaxWidthContainer>
        <nav className={styles.navbar}>
          <NextLink href="/">E-Shop</NextLink>
          <div className={styles.navbar__actions}>
            {user && (
              <p className={styles["actions-user"]}>{`${user?.firstName} ${user?.lastName}`}</p>
            )}
            <div className={styles["actions-menu"]}>
              <MenuButton />
            </div>
          </div>
        </nav>
      </MaxWidthContainer>
    </div>
  );
}
export default TopMenu;
