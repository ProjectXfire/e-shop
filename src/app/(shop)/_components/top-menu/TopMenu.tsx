import NextLink from "next/link";
import styles from "./styles.module.css";
import { IoSearchOutline } from "react-icons/io5";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";
import CartCounter from "@/app/(shop)/_components/cart-counter/CartCounter";
import MenuButton from "@/app/(shop)/_components/menu-button/MenuButton";
import TopMenuLinks from "./TopMenuLinks";

function TopMenu(): React.ReactElement {
  return (
    <div className={styles["navbar-container"]}>
      <MaxWidthContainer>
        <nav className={styles.navbar}>
          <NextLink href="/">E-Shop</NextLink>
          <TopMenuLinks />
          <div className={styles.navbar__actions}>
            <LinkAnimated className={styles["navbar-icon"]} href="/search">
              <IoSearchOutline />
            </LinkAnimated>
            <CartCounter />
            <MenuButton />
          </div>
        </nav>
      </MaxWidthContainer>
    </div>
  );
}
export default TopMenu;
