// import * as yup from "yup";

export interface SelectOption {
  o_id: string;
  o_title: string;
}

export interface FieldsOptions {
  f_name: string;
  f_type: string;
  f_label: string;
  f_options?: SelectOption[];
}

export interface Crud_Fields {
  title: string;
  type: string;
  name: string;
  isDate?: boolean;
}

export interface Crud_Mutation {
  mutation: any;
  field: string;
}

// export interface Crud_CallBack<T, I> {
//   data: T[];
//   fields: Crud_Fields[];
//   deleteBy: Crud_Mutation;
//   updateBy: Crud_Mutation;
//   create: Crud_Mutation;
//   initialValue: I;
//   validateDepartmentSchema: yup.ObjectSchema<yup.Shape<{}, I>>;
//   formFields: FieldsOptions[];
//   onOpen: () => void;
// }
