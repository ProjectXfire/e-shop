import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  slug: Yup.string().required(),
  price: Yup.number().required(),
  gender: Yup.string().required(),
  categoryId: Yup.string().required(),
  inStock: Yup.number().required(),
  sizes: Yup.array(Yup.string().required()).required().min(1),
});
