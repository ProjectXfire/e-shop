"use client";

import type { User } from "@/core/user/models/user.model";
import { useRouter } from "next/navigation";
import { useAdminSidebar } from "@/core/admin/store/useAdminSidebar";
import { closeSession } from "@/core/auth/services/auth.service";
import { updateTokenUser } from "@/core/user/services/update-user.service";
import styles from "./styles.module.css";
import {
  IoCloseOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoShirtOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

interface Props {
  user: User;
}

function Sidebar({ user }: Props): React.ReactElement {
  const router = useRouter();

  const isOpen = useAdminSidebar((s) => s.isOpen);
  const close = useAdminSidebar((s) => s.close);
  const waitAnimation = useAdminSidebar((s) => s.waitAnimation);

  const navigateTo = (path: string): void => {
    router.push(path);
    close();
  };

  const handleLogin = (): void => {
    router.push("/auth/login");
    close();
  };

  const handleCloseSession = async (): Promise<void> => {
    const isClossed = await closeSession();
    await updateTokenUser();
    if (isClossed) router.refresh();
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
            {user && (
              <div className={styles.sidebar__name}>
                <TitleAnimated title={`${user.firstName} ${user.lastName}`} />
              </div>
            )}
            <div className={styles.sidebar__links}>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/profile")}>
                <IoPersonOutline size={20} /> Perfil
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/")}>
                <IoStorefrontOutline size={20} /> Tienda
              </ButtonAnimated>
              {user ? (
                <ButtonAnimated contentStyle={styles.link} onClick={handleCloseSession}>
                  <IoLogOutOutline size={20} /> Salir
                </ButtonAnimated>
              ) : (
                <ButtonAnimated contentStyle={styles.link} onClick={handleLogin}>
                  <IoLogInOutline size={20} /> Entrar
                </ButtonAnimated>
              )}
            </div>
            <div className={styles.sidebar__separator} />
            <div className={styles.sidebar__links}>
              <ButtonAnimated
                contentStyle={styles.link}
                onClick={() => navigateTo("/admin/products")}
              >
                <IoShirtOutline size={20} /> Productos
              </ButtonAnimated>
              <ButtonAnimated
                contentStyle={styles.link}
                onClick={() => navigateTo("/admin/orders")}
              >
                <IoTicketOutline size={20} /> Ordenes
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/admin/users")}>
                <IoPeopleOutline size={20} /> Usuarios
              </ButtonAnimated>
            </div>
          </aside>
          <div
            className={`${styles["sidebar-blur"]} ${isOpen && styles["sidebar-blur--active"]}`}
            onClick={close}
          />
        </>
      )}
    </>
  );
}
export default Sidebar;
