"use client";

import type { Product } from "@/core/shop/models/product.model";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { currencyFormat } from "@/shared/utils/currency-format";
import { useDeleteModal } from "@/shared/stores/useDeleteModal";
import { deleteProduct } from "@/core/admin/services/delete-product.service";
import styles from "./styles.module.css";
import { MdEdit, MdInfoOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

interface Props {
  products: Product[];
}

function ProductsList({ products }: Props): React.ReactNode {
  const router = useRouter();

  const openDeleteModal = useDeleteModal((s) => s.open);
  const setDeleteAction = useDeleteModal((s) => s.setAction);

  const handleOpenDeleteModal = (productId: string, imagesUrls: string[]): void => {
    openDeleteModal();
    setDeleteAction(() => removeProduct(productId, imagesUrls));
  };

  const removeProduct = async (productId: string, imagesUrls: string[]): Promise<void> => {
    const { error, success } = await deleteProduct(productId, imagesUrls);
    if (error) toastMessage.error(error);
    if (success) {
      toastMessage.error(success);
      router.refresh();
    }
  };

  return (
    <div className={styles["products"]}>
      <table className={styles["products-list"]}>
        <thead className={styles["table-header"]}>
          <tr>
            <th className={styles["table-head"]}>Image</th>
            <th className={styles["table-head"]}>Producto</th>
            <th className={styles["table-head"]}>Precio</th>
            <th className={styles["table-head"]}>Género</th>
            <th className={styles["table-head"]}>Cantidad</th>
            <th className={styles["table-head"]}>Tallas</th>
            <th className={styles["table-head"]}></th>
          </tr>
        </thead>
        <tbody className={styles["table-body"]}>
          {products.map((product) => (
            <tr key={product.id}>
              <td className={styles["table-data"]}>
                <NextImage
                  className={styles["table-data__image"]}
                  src={product.images[0]}
                  alt={product.title}
                  width={35}
                  height={35}
                />
              </td>
              <td className={styles["table-data"]}>{product.title}</td>
              <td className={styles["table-data"]}>{currencyFormat(product.price)}</td>
              <td className={styles["table-data"]}>{product.gender}</td>
              <td className={styles["table-data"]}>{product.inStock}</td>
              <td className={styles["table-data"]}>{product.sizes.join(", ")}</td>
              <td className={`${styles["table-data"]} ${styles["table-data--actions"]}`}>
                <LinkAnimated className={styles.action} href={`/admin/products/${product.slug}`}>
                  <MdInfoOutline />
                </LinkAnimated>
                <LinkAnimated
                  className={`${styles.action} ${styles.action__edit}`}
                  href={`/admin/products/${product.slug}/edit`}
                >
                  <MdEdit />
                </LinkAnimated>
                <ButtonAnimated
                  className={`${styles.action} ${styles.action__delete}`}
                  onClick={() => handleOpenDeleteModal(product.id, product.images)}
                >
                  <FaTrash />
                </ButtonAnimated>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductsList;
