"use client";

import type { User } from "@/core/user/models/user.model";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/core/shop/store/useSidebar";
import { closeSession } from "@/core/auth/services/auth.service";
import { updateTokenUser } from "@/core/user/services/update-user.service";
import styles from "./styles.module.css";
import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogOutOutline,
  IoLogInOutline,
} from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

interface Props {
  user: User | null;
}

function Sidebar({ user }: Props): React.ReactElement {
  const router = useRouter();
  const isOpen = useSidebar((s) => s.isOpen);
  const close = useSidebar((s) => s.close);
  const waitAnimation = useSidebar((s) => s.waitAnimation);

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
            <InputAnimated
              placeholder="Search..."
              icon={<IoSearchOutline size={20} />}
              onChange={(value) => console.log(value)}
            />
            <div className={styles.sidebar__links}>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/profile")}>
                <IoPersonOutline size={20} /> Perfil
              </ButtonAnimated>
              <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/orders")}>
                <IoTicketOutline size={20} />
                Mis Ordenes
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
            {user && user.role === "admin" && (
              <>
                <div className={styles.sidebar__separator} />
                <div className={styles.sidebar__links}>
                  <ButtonAnimated contentStyle={styles.link} onClick={() => navigateTo("/admin")}>
                    <MdOutlineAdminPanelSettings size={20} /> Admin
                  </ButtonAnimated>
                </div>
              </>
            )}
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
