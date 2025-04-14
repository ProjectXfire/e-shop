import type { User } from "@/core/user/models/user.model";
import NextLink from "next/link";
import styles from "./styles.module.css";
import { IoSearchOutline } from "react-icons/io5";
import CartCounter from "../cart-counter/CartCounter";
import MenuButton from "../menu-button/MenuButton";
import TopMenuLinks from "./TopMenuLinks";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

interface Props {
  user: User | null;
}

function TopMenu({ user }: Props): React.ReactElement {
  return (
    <div className={styles["navbar-container"]}>
      <MaxWidthContainer>
        <nav className={styles.navbar}>
          <NextLink className={styles.navbar__home} href="/">
            E-Shop
          </NextLink>
          <TopMenuLinks />
          <div className={styles.navbar__actions}>
            {user && (
              <p className={styles["actions-user"]}>{`${user?.firstName} ${user?.lastName}`}</p>
            )}
            <div className={styles["actions-menu"]}>
              <CartCounter />
              <MenuButton />
            </div>
          </div>
        </nav>
      </MaxWidthContainer>
    </div>
  );
}
export default TopMenu;
