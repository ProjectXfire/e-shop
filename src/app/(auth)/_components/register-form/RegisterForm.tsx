"use client";

import { Form, Formik } from "formik";
import { IoLockClosed, IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { registerSchema } from "@/core/auth/schemas/RegisterSchema";
import styles from "./styles.module.css";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

function RegisterForm(): React.ReactElement {
  const handleSubmit = (values: any): void => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange }) => (
        <Form className={styles["register-form"]}>
          <InputAnimated
            name="firstName"
            icon={<IoPerson size={20} />}
            placeholder="Nombres"
            errorMessage={errors.firstName && touched.firstName ? errors.firstName : ""}
            onChange={handleChange}
          />
          <InputAnimated
            name="lastName"
            icon={<IoPerson size={20} />}
            placeholder="Apellidos"
            errorMessage={errors.lastName && touched.lastName ? errors.lastName : ""}
            onChange={handleChange}
          />
          <InputAnimated
            name="email"
            icon={<MdEmail size={20} />}
            placeholder="Correo electrónico"
            errorMessage={errors.email && touched.email ? errors.email : ""}
            onChange={handleChange}
          />
          <InputAnimated
            name="password"
            icon={<IoLockClosed size={20} />}
            type="password"
            placeholder="Contraseña"
            errorMessage={errors.password && touched.password ? errors.password : ""}
            onChange={handleChange}
          />
          <ButtonAnimated type="submit">Ingresar</ButtonAnimated>
          <div className={styles["register-form__separator"]}>
            <SeparatorAnimated />
          </div>
          <LinkAnimated href="/auth/login">Si ya tiene cuenta</LinkAnimated>
        </Form>
      )}
    </Formik>
  );
}
export default RegisterForm;
