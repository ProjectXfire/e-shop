"use client";

import { Form, Formik } from "formik";
import { IoLockClosed } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { loginSchema } from "@/core/auth/schemas/LoginSchema";
import styles from "./styles.module.css";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

function Login(): React.ReactElement {
  const handleSubmit = (values: any): void => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange }) => (
        <Form className={styles["login-form"]}>
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
          <div className={styles["login-form__separator"]}>
            <SeparatorAnimated />
          </div>
          <LinkAnimated href="/auth/register">Crear nueva cuenta</LinkAnimated>
        </Form>
      )}
    </Formik>
  );
}
export default Login;
