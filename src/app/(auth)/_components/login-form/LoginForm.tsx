"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Formik } from "formik";
import { IoLockClosed } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { loginSchema } from "@/core/auth/schemas/LoginSchema";
import { withCredentials } from "@/core/auth/services/auth.service";
import styles from "./styles.module.css";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import SeparatorAnimated from "@/shared/components/animations/separator-animated/SeparatorAnimated";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

function Login(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }): Promise<void> => {
    const { email, password } = values;
    setIsLoading(true);
    const { error, success } = await withCredentials(email, password);
    if (error) {
      setIsLoading(false);
      toastMessage.error(error);
    }
    if (success) {
      const redirect = searchParams.get("redirect");
      toastMessage.success(success);
      if (redirect) {
        router.replace(redirect);
      } else {
        router.replace("/");
      }
    }
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
          <ButtonAnimated disabled={isLoading} type="submit">
            Ingresar
          </ButtonAnimated>
          {!isLoading && (
            <>
              <div className={styles["login-form__separator"]}>
                <SeparatorAnimated />
              </div>
              <LinkAnimated href="/auth/register">Crear nueva cuenta</LinkAnimated>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
}
export default Login;
