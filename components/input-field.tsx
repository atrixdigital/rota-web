import React from "react";
import { FieldProps } from "formik";
import { FormGroup, Input, InputProps } from "reactstrap";

const InputArea: React.SFC<InputProps> = props => {
  return <Input {...props} className="form-control-alternative" />;
};
const SelectArea: React.SFC<InputProps> = props => {
  return (
    <Input {...props} className="form-control-alternative">
      {props.children}
    </Input>
  );
};

const TextArea: React.SFC<any> = (
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) => {
  return <textarea {...props} />;
};

interface InputFieldI {
  label?: string;
  componentType?: string;
}

const InputField: React.SFC<FieldProps<any> & InputFieldI> = ({
  field: { onChange, ...field },
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  componentType = "text",
  ...props
}) => {
  // console.log(componentType);
  // console.log(field);
  // console.log(props);
  const errorMsg = touched[field.name] && errors[field.name];
  let Comp: React.FunctionComponent<any>;
  switch (componentType) {
    case "textarea":
      Comp = TextArea;
      break;
    case "text":
      Comp = InputArea;
      break;
    case "select":
      Comp = SelectArea;
      break;
    default:
  }
  // const Comp = componentType === "textarea" ? TextArea : InputArea;

  return (
    <React.Fragment>
      <FormGroup>
        <label className="form-control-label" htmlFor={field.name}>
          {label}
        </label>
        <Comp
          {...field}
          id={field.name}
          className={`form-control-alternative ${
            errorMsg !== undefined ? "error" : ""
          }`}
          {...props}
          onChange={onChange}
        />
      </FormGroup>
      {errorMsg !== undefined && (
        <label id="cname-error" className="error" htmlFor={field.name}>
          {errorMsg}
        </label>
      )}
    </React.Fragment>
  );
};

export default InputField;
