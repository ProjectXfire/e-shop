import styles from "./styles.module.css";
import { IoArrowBack } from "react-icons/io5";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

function AddressHeader(): React.ReactElement {
  return (
    <header className={styles["address-header"]}>
      <div>
        <LinkAnimated className={styles["address-header__back"]} href="/cart">
          <IoArrowBack size={25} />
        </LinkAnimated>
      </div>
      <TitleAnimated title="Dirección" subtitle="Dirección de entrega" />
    </header>
  );
}
export default AddressHeader;
