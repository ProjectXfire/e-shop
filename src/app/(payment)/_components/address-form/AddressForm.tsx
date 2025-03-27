"use client";

import { Formik, Form } from "formik";
import { addressSchema } from "@/core/shop/schemas/address.schema";
import styles from "./styles.module.css";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";

function AddressForm(): React.ReactElement {
  const onSubmit = (values: {
    firstName: string;
    lastName: string;
    address: string;
    secondAddress: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  }): void => {
    console.log(values);
  };

  return (
    <section className={styles["address-form"]}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          secondAddress: "",
          postalCode: "",
          city: "",
          country: "",
          phone: "",
        }}
        validationSchema={addressSchema}
        onSubmit={onSubmit}
      >
        {({ touched, errors, handleChange, handleSubmit }) => (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <InputAnimated
              placeholder="Nombres"
              name="firstName"
              errorMessage={errors.firstName && touched.firstName ? errors.firstName : ""}
              onChange={handleChange}
            />
            <InputAnimated
              placeholder="Apellidos"
              name="lastName"
              errorMessage={errors.lastName && touched.lastName ? errors.lastName : ""}
              onChange={handleChange}
            />
            <InputAnimated
              placeholder="Dirección"
              name="address"
              errorMessage={errors.address && touched.address ? errors.address : ""}
              onChange={handleChange}
            />
            <InputAnimated
              placeholder="Dirección adicional"
              name="secondAddress"
              onChange={handleChange}
            />
            <div className={styles.form__block}>
              <InputAnimated
                placeholder="Código Postal"
                name="postalCode"
                errorMessage={errors.postalCode && touched.postalCode ? errors.postalCode : ""}
                onChange={handleChange}
              />
              <InputAnimated
                placeholder="Ciudad"
                name="city"
                errorMessage={errors.city && touched.city ? errors.city : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles.form__block}>
              <InputAnimated placeholder="País" name="country" onChange={handleChange} />
              <InputAnimated
                placeholder="Teléfono"
                name="phone"
                errorMessage={errors.phone && touched.phone ? errors.phone : ""}
                onChange={handleChange}
              />
            </div>
            <div className={styles["form__actions"]}>
              <ButtonAnimated
                className={styles.action}
                type="submit"
                subBlockColor="var(--color-purple-4)"
              >
                Siguiente
              </ButtonAnimated>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
export default AddressForm;
