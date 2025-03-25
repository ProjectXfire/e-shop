"use client";

import { useAdminSidebar } from "@/core/admin/store/useAdminSidebar";
import styles from "./styles.module.css";
import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoShirtOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import { useRouter } from "next/navigation";

function Sidebar(): React.ReactElement {
  const router = useRouter();

  const isOpen = useAdminSidebar((s) => s.isOpen);
  const close = useAdminSidebar((s) => s.close);
  const waitAnimation = useAdminSidebar((s) => s.waitAnimation);

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
                <IoStorefrontOutline size={20} /> Tienda
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
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoShirtOutline size={20} /> Productos
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoTicketOutline size={20} /> Ordenes
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoPeopleOutline size={20} /> Usuarios
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
