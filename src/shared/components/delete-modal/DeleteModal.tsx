"use client";

import styles from "./styles.module.css";
import ButtonAnimated from "../animations/button-animated/ButtonAnimated";
import TitleAnimated from "../animations/title-animated/TitleAnimated";
import { useDeleteModal } from "@/shared/stores/useDeleteModal";

function DeleteModal(): React.ReactElement {
  const waitAnimation = useDeleteModal((s) => s.waitAnimation);
  const isOpen = useDeleteModal((s) => s.isOpen);
  const close = useDeleteModal((s) => s.close);
  const action = useDeleteModal((s) => s.action);

  const handleAction = (): void => {
    close();
    if (action) action();
  };

  return (
    <>
      {waitAnimation && (
        <div className={`${styles["delete-modal"]} ${isOpen && styles["delete-modal--animate"]}`}>
          <article className={`${styles.modal} ${isOpen && styles["modal--animate"]}`}>
            <TitleAnimated
              title="Eliminar"
              subtitle="¿Estás seguro de eliminar esto?, no se podrá deshacer la acción."
            />
            <div className={styles.modal__actions}>
              <ButtonAnimated type="button" subBlockColor="var(--color-purple-5)" onClick={close}>
                Cerrar
              </ButtonAnimated>
              <ButtonAnimated
                type="button"
                subBlockColor="var(--color-purple-5)"
                onClick={handleAction}
              >
                Eliminar
              </ButtonAnimated>
            </div>
          </article>
        </div>
      )}
    </>
  );
}
export default DeleteModal;
