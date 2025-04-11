"use client";

import type { Category } from "@/core/shop/models/category.model";
import type { ValidSize } from "@/core/shop/models/product.model";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import NextImage from "next/image";
import { Form, Formik } from "formik";
import { productSchema } from "@/core/admin/schemas/product.schema";
import { createProduct } from "@/core/admin/services/create-product.service";
import styles from "./styles.module.css";
import { FaTrash } from "react-icons/fa";
import SelectMultipleSizesAnimated from "../select-multiple-sizes-animated/SelectMultipleSizesAnimated";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import SelectAnimated from "@/shared/components/animations/select-animated/SelectAnimated";
import TextAreaAnimated from "@/shared/components/animations/textarea-animated/TextAreaAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import { CreateProductDto } from "@/core/admin/dtos/product.dto";
import { toastMessage } from "@/shared/components/message/ToastMessage";

interface Props {
  categories: Category[];
}

function CreateProduct({ categories }: Props): React.ReactElement {
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

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<null | HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [fileImages, setFileImages] = useState<FileList | null>(null);

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

  const handleSubmit = async (data: CreateProductDto): Promise<void> => {
    if (!fileImages) {
      toastMessage.info("Agrega al menos una imágen");
      return;
    }
    setIsLoading(true);
    const { error, success } = await createProduct(data, fileImages);
    if (error) {
      setIsLoading(false);
      toastMessage.error(error);
    }
    if (success) {
      router.push("/admin/products");
      toastMessage.success(success);
    }
  };

  return (
    <section className={styles["create-product-container"]}>
      <Formik
        initialValues={{
          title: "",
          description: "",
          slug: "",
          price: 0,
          gender: "kids",
          categoryId: "",
          inStock: 0,
          tags: [],
          sizes: [],
        }}
        validationSchema={productSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, setFieldValue }) => (
          <Form className={styles["create-product"]}>
            <div className={styles["create-product__field"]}>
              <label className={styles["field-label"]}>Título</label>
              <InputAnimated
                name="title"
                placeholder="Título"
                disabled={isLoading}
                errorMessage={errors.title && touched.title ? errors.title : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["create-product__field"]}>
              <label className={styles["field-label"]}>Slug</label>
              <InputAnimated
                name="slug"
                placeholder="Slug"
                disabled={isLoading}
                errorMessage={errors.slug && touched.slug ? errors.slug : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["create-product__field"]}>
              <label className={styles["field-label"]}>Descripción</label>
              <TextAreaAnimated
                name="description"
                placeholder="Descripción"
                disabled={isLoading}
                errorMessage={errors.description && touched.description ? errors.description : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["create-product__field"]}>
              <label className={styles["field-label"]}>Precio</label>
              <InputAnimated
                name="price"
                placeholder="Precio"
                type="number"
                defaultValue="0"
                disabled={isLoading}
                errorMessage={errors.price && touched.price ? errors.price : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["create-product__field"]}>
              <label className={styles["field-label"]}>Género</label>
              <SelectAnimated
                placeholder="Selecciona un género"
                items={gendetItems}
                disabled={isLoading}
                onChange={(value) => setFieldValue("gender", value)}
                errorMessage={errors.gender && touched.gender ? errors.gender : ""}
              />
            </div>
            <div className={styles["create-product__field"]}>
              <label className={styles["field-label"]}>Categoría</label>
              <SelectAnimated
                placeholder="Selecciona una categría"
                items={categoriesItems}
                disabled={isLoading}
                onChange={(value) => setFieldValue("categoryId", value)}
                errorMessage={errors.categoryId && touched.categoryId ? errors.categoryId : ""}
              />
            </div>
            <div className={styles["create-product__field"]}>
              <label className={styles["field-label"]}>Inventario</label>
              <InputAnimated
                name="inStock"
                placeholder="Inventario"
                type="number"
                defaultValue="0"
                disabled={isLoading}
                errorMessage={errors.inStock && touched.inStock ? errors.inStock : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["create-product__field"]}>
              <label className={`${styles["field-label"]} ${styles["field-label--sizes"]}`}>
                Tallas
              </label>
              <SelectMultipleSizesAnimated
                values={sizesItems}
                onSelectedValues={(values) => setFieldValue("sizes", values)}
              />
              {errors.sizes && touched.sizes && (
                <p className={styles["field-error"]}>{errors.sizes}</p>
              )}
            </div>
            <button
              className={styles["field-image-selector"]}
              type="button"
              onClick={openImagesSelection}
            >
              Seleccione las imágenes
            </button>
            <input
              ref={imageRef}
              className={styles["field-image-input"]}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePreviewImages}
            />
            {previewImages.length > 0 && (
              <>
                <label className={styles["field-label"]}>Imágenes selecccionadas</label>
                <div className={styles["field-preview"]}>
                  {previewImages.map((img) => (
                    <div key={img} className={styles["field-preview__image"]}>
                      <NextImage className={styles["image"]} src={img} alt="product-img" fill />
                      <button
                        className={styles["image-delete"]}
                        type="button"
                        name="remove-image"
                        onClick={() => handleDeletePreviewImage(img)}
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            <ButtonAnimated subBlockColor="var(--color-purple-6)" type="submit">
              Crear
            </ButtonAnimated>
          </Form>
        )}
      </Formik>
    </section>
  );
}
export default CreateProduct;
