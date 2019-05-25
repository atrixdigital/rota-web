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
export const validateRegisterSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  roleID: yup.string().required()
});
export const validateLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});
export const validateRoleSchema = yup.object().shape({
  title: yup.string().required()
});
export const validateRoleIDSchema = yup.object().shape({
  roleIDField: yup
    .array()
    .of(
      yup.object().shape({
        roleID: yup.string().required()
      })
    )
    .required()
    .min(1)
});
// export const validateAreaIDSchema = yup.object().shape({
//   areaID: yup.string().required()
// });
export const validateAreaIDSchema = yup.object().shape({
  areaIDField: yup
    .array()
    .of(
      yup.object().shape({
        areaID: yup.string().required()
      })
    )
    .required()
    .min(1)
});
export const validateScheduleSchema = yup.object().shape({
  startTime: yup.date().required(),
  endTime: yup.date().required(),
  totalHours: yup.number().required(),
  userID: yup.string().required()
});
