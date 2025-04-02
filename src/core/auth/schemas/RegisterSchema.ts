import * as Yup from "yup";

const passwordRules = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "password must have 1 uppercase, 1 number and 1 special character",
    })
    .required(),
});
