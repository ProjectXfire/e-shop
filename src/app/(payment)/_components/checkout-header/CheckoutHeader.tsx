import styles from "./styles.module.css";
import { IoArrowBack } from "react-icons/io5";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

function CheckoutHeader(): React.ReactElement {
  return (
    <header className={styles["checkout-header"]}>
      <div>
        <LinkAnimated className={styles["checkout-header__back"]} href="/checkout/address">
          <IoArrowBack size={25} />
        </LinkAnimated>
      </div>
      <TitleAnimated title="Verifcar Orden" subtitle="Resumen de la Orden" />
    </header>
  );
}
export default CheckoutHeader;
