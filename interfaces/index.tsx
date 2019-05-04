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
