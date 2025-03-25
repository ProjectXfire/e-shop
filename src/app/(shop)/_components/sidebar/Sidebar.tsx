"use client";

import { useRouter } from "next/navigation";
import { useSidebar } from "@/core/shop/store/useSidebar";
import styles from "./styles.module.css";
import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
} from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";

function Sidebar(): React.ReactElement {
  const router = useRouter();

  const isOpen = useSidebar((s) => s.isOpen);
  const close = useSidebar((s) => s.close);
  const waitAnimation = useSidebar((s) => s.waitAnimation);

  const navigateTo = (path: string): void => {
    router.push(path);
    close();
  };

  return (
    <>
      {waitAnimation && (
        <>
          <aside className={`${styles.sidebar} ${isOpen && styles["sidebar--active"]}`}>
            <header className={styles.sidebar__header}>
              <ButtonAnimated className={styles["sidebar-close"]} type="button" onClick={close}>
                <IoCloseOutline size={25} />
              </ButtonAnimated>
            </header>
            <InputAnimated
              placeholder="Search..."
              icon={<IoSearchOutline size={20} />}
              onChange={(value) => console.log(value)}
            />
            <div className={styles.sidebar__links}>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoPersonOutline size={20} /> Perfil
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoTicketOutline size={20} />
                Mis Ordenes
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoLogInOutline size={20} /> Ingresar
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoLogOutOutline size={20} /> Salir
              </ButtonAnimated>
            </div>
            <div className={styles.sidebar__separator} />
            <div className={styles.sidebar__links}>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/admin")}>
                <MdOutlineAdminPanelSettings size={20} /> Admin
              </ButtonAnimated>
            </div>
          </aside>
          <div
            className={`${styles["sidebar-blur"]} ${isOpen && styles["sidebar-blur--active"]}`}
          />
        </>
      )}
    </>
  );
}
export default Sidebar;
