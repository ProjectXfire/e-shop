"use client";

import type { Product, ValidSize } from "@/core/shop/models/product.model";
import type { Category } from "@/core/shop/models/category.model";
import type { UpdateProductDto } from "@/core/admin/dtos/product.dto";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { Form, Formik } from "formik";
import {
  deleteImage,
  updateProductFeatures,
  updateProductImages,
} from "@/core/admin/services/update-product.service";
import { productSchema } from "@/core/admin/schemas/product.schema";
import { useDeleteModal } from "@/shared/stores/useDeleteModal";
import styles from "./styles.module.css";
import { FaTrash } from "react-icons/fa";
import SelectMultipleSizesAnimated from "../select-multiple-sizes-animated/SelectMultipleSizesAnimated";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import SelectAnimated from "@/shared/components/animations/select-animated/SelectAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import TextAreaAnimated from "@/shared/components/animations/textarea-animated/TextAreaAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

interface Props {
  product: Product;
  categories: Category[];
}

function ProductEdit({ product, categories }: Props): React.ReactElement {
  const gendetItems = ["kids", "women", "men"].map((item) => ({
    value: item,
    label: item,
  }));

  const categoriesItems = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const sizesItems = ["xs", "s", "m", "l", "xl", "xxl"].map((item) => ({
    value: item.toUpperCase() as ValidSize,
    label: item.toUpperCase(),
  }));

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const imageRef = useRef<null | HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [fileImages, setFileImages] = useState<FileList | null>(null);

  const openDeleteModal = useDeleteModal((s) => s.open);
  const setDeleteAction = useDeleteModal((s) => s.setAction);

  const handleOpenDeleteModal = (imageUrl: string): void => {
    openDeleteModal();
    setDeleteAction(() => deleteSavedImage(imageUrl));
  };

  const deleteSavedImage = async (imageUrl: string): Promise<void> => {
    setIsLoading(true);
    const { error, success } = await deleteImage(product.id, imageUrl);
    if (error) toastMessage.error(error);
    if (success) {
      toastMessage.success(success);
      router.refresh();
    }
    setIsLoading(false);
  };

  const openImagesSelection = (): void => {
    if (isLoading) return;
    imageRef.current?.click();
  };

  const handlePreviewImages = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const imageUrlObject = URL.createObjectURL(files[i]);
      images.push(imageUrlObject);
    }
    setFileImages(files);
    setPreviewImages(images);
  };

  const handleDeletePreviewImage = (image: string): void => {
    const images = [...previewImages];
    if (images.includes(image)) {
      const updatedPreviewImages = images.filter((img) => img !== image);
      setPreviewImages(updatedPreviewImages);
    } else {
      images.push(image);
      setPreviewImages(images);
    }
  };

  const savePreviewImages = async (): Promise<void> => {
    if (!fileImages) return;
    setIsLoading(true);
    const { error, success } = await updateProductImages(fileImages, product.id);
    if (error) toastMessage.error(error);
    if (success) {
      toastMessage.success(success);
      setPreviewImages([]);
      setFileImages(null);
      router.refresh();
    }
    setIsLoading(false);
  };

  const handleSubmit = async (data: UpdateProductDto): Promise<void> => {
    setIsLoading(true);
    const { error, success } = await updateProductFeatures(product.id, data);
    if (error) toastMessage.error(error);
    if (success) toastMessage.success(success);
    setIsLoading(false);
  };

  return (
    <Formik
      initialValues={{
        title: product.title,
        description: product.description,
        slug: product.slug,
        price: product.price,
        gender: product.gender,
        categoryId: product.category.id,
        inStock: product.inStock,
        tags: product.tags,
        sizes: product.sizes,
      }}
      validationSchema={productSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange, setFieldValue, values }) => (
        <Form className={styles["product-edit"]}>
          <section className={styles["product-edit__left"]}>
            <TitleAnimated title="Editar características" />
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Título</label>
              <InputAnimated
                name="title"
                placeholder="Título"
                defaultValue={product.title}
                disabled={isLoading}
                errorMessage={errors.title && touched.title ? errors.title : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Slug</label>
              <InputAnimated
                name="slug"
                placeholder="Slug"
                defaultValue={product.slug}
                disabled={isLoading}
                errorMessage={errors.slug && touched.slug ? errors.slug : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Descripción</label>
              <TextAreaAnimated
                name="description"
                placeholder="Descripción"
                defaultValue={product.description}
                disabled={isLoading}
                errorMessage={errors.description && touched.description ? errors.description : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Precio</label>
              <InputAnimated
                name="price"
                placeholder="Precio"
                type="number"
                defaultValue={product.price.toString()}
                disabled={isLoading}
                errorMessage={errors.price && touched.price ? errors.price : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Género</label>
              <SelectAnimated
                placeholder="Selecciona un género"
                items={gendetItems}
                defaultValue={{ label: product.gender, value: product.gender }}
                disabled={isLoading}
                onChange={(value) => setFieldValue("gender", value)}
                errorMessage={errors.gender && touched.gender ? errors.gender : ""}
              />
            </div>
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Categoría</label>
              <SelectAnimated
                placeholder="Selecciona una categría"
                items={categoriesItems}
                defaultValue={{ label: product.category.name, value: product.category.id }}
                disabled={isLoading}
                onChange={(value) => setFieldValue("categoryId", value)}
                errorMessage={errors.categoryId && touched.categoryId ? errors.categoryId : ""}
              />
            </div>
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Inventario</label>
              <InputAnimated
                name="inStock"
                placeholder="Inventario"
                defaultValue={product.inStock.toString()}
                type="number"
                disabled={isLoading}
                errorMessage={errors.inStock && touched.inStock ? errors.inStock : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["edit-block"]}>
              <label
                className={`${styles["edit-block__label"]} ${styles["edit-block__label--select"]}`}
              >
                Tallas
              </label>
              <SelectMultipleSizesAnimated
                values={sizesItems}
                defaultValue={values.sizes}
                onSelectedValues={(values) => setFieldValue("sizes", values)}
              />
              {errors.sizes && touched.sizes && (
                <p className={styles["edit-block__error"]}>{errors.sizes}</p>
              )}
            </div>
            <ButtonAnimated
              className={styles["edit-save"]}
              type="submit"
              subBlockColor="var(--color-purple-6)"
            >
              Guardar
            </ButtonAnimated>
          </section>
          <section className={styles["product-edit__right"]}>
            <TitleAnimated title="Editar fotos" />
            <div className={styles["edit-block"]}>
              <label className={styles["edit-block__label"]}>Fotos</label>
              {product.images.length === 0 ? (
                <p className={styles["edit-block__empty"]}>No tienes imágenes cargadas</p>
              ) : (
                <div className={styles["edit-block__current-images"]}>
                  {product.images.map((img) => (
                    <div key={img} className={styles["current-image"]}>
                      <NextImage
                        className={styles["current-image__img"]}
                        src={img}
                        alt="product-img"
                        fill
                      />
                      <button
                        className={styles["current-image__delete"]}
                        type="button"
                        name="remove-image"
                        onClick={() => handleOpenDeleteModal(img)}
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                className={styles["edit-block__image"]}
                type="button"
                onClick={openImagesSelection}
              >
                Seleccione las imágenes
              </button>
              <input
                ref={imageRef}
                className={styles["edit-block__image-input"]}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePreviewImages}
              />
              {previewImages.length > 0 && (
                <>
                  <label className={styles["edit-block__label"]}>Imágenes selecccionadas</label>
                  <div className={styles["edit-block__current-images"]}>
                    {previewImages.map((img) => (
                      <div key={img} className={styles["current-image"]}>
                        <NextImage
                          className={styles["current-image__img"]}
                          src={img}
                          alt="product-img"
                          fill
                        />
                        <button
                          className={styles["current-image__delete"]}
                          type="button"
                          name="remove-image"
                          onClick={() => handleDeletePreviewImage(img)}
                        >
                          <FaTrash size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <ButtonAnimated
                    className={styles["edit-save-image"]}
                    subBlockColor="var(--color-purple-6)"
                    onClick={savePreviewImages}
                  >
                    Guardar imágenes seleccionadas
                  </ButtonAnimated>
                </>
              )}
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
}
export default ProductEdit;
