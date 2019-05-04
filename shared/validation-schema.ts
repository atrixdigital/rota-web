import * as yup from "yup";

// export const nameNotLongEnough = "email must be at least 3 characters";
// export const passwordNotLongEnough = "password must be at least 3 characters";
// export const invalidEmail = "email must be a valid email";

export const validateDepartmentSchema = yup.object().shape({
  title: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  phone: yup.string().required(),
  userID: yup.string().required()
});
