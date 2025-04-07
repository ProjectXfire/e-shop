"use client";

import type { createAddressDto } from "@/core/payment/dtos/address.dto";
import type { Country } from "@/core/payment/models/country.model";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { createAddress } from "@/core/payment/services/create-address.service";
import { addressSchema } from "@/core/payment/schemas/address.schema";
import styles from "./styles.module.css";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import SelectAnimated from "@/shared/components/animations/select-animated/SelectAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

interface Props {
  userId?: string;
  countries: Country[];
}

function AddressForm({ userId, countries }: Props): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const countriesItems = countries.map((country) => ({ value: country.id, label: country.name }));

  const onSubmit = async (values: createAddressDto): Promise<void> => {
    if (!userId) return;
    setIsLoading(true);
    const { error, success, data } = await createAddress(userId, values);
    if (error) toastMessage.error(error);
    if (success) {
      toastMessage.success(success);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <section className={styles["address-form"]}>
      <TitleAnimated title="Agregar dirección de entrega" />
      <SeparatorAnimated />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          postalCode: "",
          city: "",
          countryId: "",
          phone: "",
        }}
        validationSchema={addressSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, handleChange, handleSubmit, setFieldValue }) => (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <InputAnimated
              placeholder="Nombres"
              name="firstName"
              disabled={isLoading}
              errorMessage={errors.firstName && touched.firstName ? errors.firstName : ""}
              onChange={handleChange}
            />
            <InputAnimated
              placeholder="Apellidos"
              name="lastName"
              disabled={isLoading}
              errorMessage={errors.lastName && touched.lastName ? errors.lastName : ""}
              onChange={handleChange}
            />
            <InputAnimated
              placeholder="Dirección"
              name="address"
              disabled={isLoading}
              errorMessage={errors.address && touched.address ? errors.address : ""}
              onChange={handleChange}
            />
            <div className={styles.form__block}>
              <InputAnimated
                placeholder="Código Postal"
                name="postalCode"
                disabled={isLoading}
                errorMessage={errors.postalCode && touched.postalCode ? errors.postalCode : ""}
                onChange={handleChange}
              />
              <InputAnimated
                placeholder="Ciudad"
                name="city"
                disabled={isLoading}
                errorMessage={errors.city && touched.city ? errors.city : ""}
                onChange={handleChange}
              />
              <SelectAnimated
                placeholder="Selecciona un país"
                items={countriesItems}
                disabled={isLoading}
                onChange={(value) => setFieldValue("countryId", value)}
                errorMessage={errors.countryId && touched.countryId ? errors.countryId : ""}
              />
              <InputAnimated
                placeholder="Teléfono"
                name="phone"
                disabled={isLoading}
                errorMessage={errors.phone && touched.phone ? errors.phone : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["form__actions"]}>
              <ButtonAnimated
                className={styles.action}
                type="submit"
                disabled={isLoading}
                subBlockColor="var(--color-purple-4)"
              >
                Agregar
              </ButtonAnimated>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
export default AddressForm;
