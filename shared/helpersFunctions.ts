import { FieldsOptions } from "../interfaces";

export const generateRelationFieldsData = (
  fields: FieldsOptions,
  relationData: any[],
  titleField: string = "title"
) => {
  if (relationData) {
    relationData.map(data => {
      fields.f_options.push({
        o_id: data.id,
        o_title: data[titleField]
      });
    });
  }
  return fields;
};
