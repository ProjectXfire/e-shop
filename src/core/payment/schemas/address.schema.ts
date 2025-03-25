import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  secondAdress: Yup.string().optional(),
  postalCode: Yup.string().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
  phone: Yup.string().required(),
});
