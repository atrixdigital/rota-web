import * as yup from "yup";

// export const nameNotLongEnough = "email must be at least 3 characters";
// export const passwordNotLongEnough = "password must be at least 3 characters";
// export const invalidEmail = "email must be a valid email";

export const validateContactSchema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .required(),
  email: yup
    .string()
    .email()
    .required(),
  message: yup.string().required()
});
