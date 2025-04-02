"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { createUser } from "@/core/auth/services/auth.service";
import { registerSchema } from "@/core/auth/schemas/RegisterSchema";
import styles from "./styles.module.css";
import { MdEmail } from "react-icons/md";
import { IoLockClosed, IoPerson } from "react-icons/io5";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

function RegisterForm(): React.ReactElement {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> => {
    setIsLoading(true);
    const { error, success } = await createUser(values);
    if (error) {
      toastMessage.error(error);
      setIsLoading(false);
    }
    if (success) {
      toastMessage.success(success);
      router.replace("/");
    }
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
            disabled={isLoading}
            errorMessage={errors.firstName && touched.firstName ? errors.firstName : ""}
            onChange={handleChange}
          />
          <InputAnimated
            name="lastName"
            icon={<IoPerson size={20} />}
            placeholder="Apellidos"
            disabled={isLoading}
            errorMessage={errors.lastName && touched.lastName ? errors.lastName : ""}
            onChange={handleChange}
          />
          <InputAnimated
            name="email"
            icon={<MdEmail size={20} />}
            placeholder="Correo electrónico"
            disabled={isLoading}
            errorMessage={errors.email && touched.email ? errors.email : ""}
            onChange={handleChange}
          />
          <InputAnimated
            name="password"
            icon={<IoLockClosed size={20} />}
            type="password"
            placeholder="Contraseña"
            disabled={isLoading}
            errorMessage={errors.password && touched.password ? errors.password : ""}
            onChange={handleChange}
          />
          <ButtonAnimated type="submit" disabled={isLoading}>
            Ingresar
          </ButtonAnimated>
          {!isLoading && (
            <>
              <div className={styles["register-form__separator"]}>
                <SeparatorAnimated />
              </div>
              <LinkAnimated href="/auth/login">Si ya tiene cuenta</LinkAnimated>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
export default RegisterForm;
