import React from "react";
import { FieldProps } from "formik";
import { Input, InputProps } from "reactstrap";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./input-field.css";

const InputArea: React.SFC<InputProps> = props => {
  return <Input {...props} className="form-control-alternative" />;
};
const CheckBoxArea: React.SFC<InputProps> = props => {
  return <input className="custom-control-input" {...props} />;
};
const SelectArea: React.SFC<InputProps> = props => {
  return (
    <Input {...props} className="form-control-alternative">
      {props.children}
    </Input>
  );
};
const DateTimePickerArea: React.SFC<ReactDatePickerProps> = props => {
  return (
    <DatePicker
      selected={new Date(props.value)}
      onChange={dateFromValue => {
        (props as any).setFieldValue(props.name, new Date(dateFromValue));
      }}
      id={props.name}
      name={props.name}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      timeCaption="time"
      className="form-control-alternative form-control"
    />
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
  componentType?: string;
}

const InputField: React.SFC<FieldProps<any> & InputFieldI> = ({
  field: { onChange, ...field },
  form: { touched, setFieldValue, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  componentType = "text",
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];
  let Comp: React.FunctionComponent<any>;
  let custompProps: any = {};
  switch (componentType) {
    case "textarea":
      Comp = TextArea;
      break;
    case "text":
    case "password":
    case "email":
    case "number":
      Comp = InputArea;
      break;
    case "select":
      Comp = SelectArea;
      break;
    case "checkbox":
      Comp = CheckBoxArea;
    case "datetimepicker":
      custompProps.setFieldValue = setFieldValue;
      Comp = DateTimePickerArea;
    default:
  }
  // const Comp = componentType === "textarea" ? TextArea : InputArea;
  return (
    <React.Fragment>
      {/* <FormGroup>
        <label className="form-control-label" htmlFor={field.name}>
          {label}
        </label> */}
      <Comp
        {...field}
        id={field.name}
        className={`form-control-alternative ${
          errorMsg !== undefined ? "error" : ""
        }`}
        {...props}
        onChange={onChange}
        {...custompProps}
      />
      {/* </FormGroup> */}
      {errorMsg !== undefined && (
        <label
          id="cname-error"
          className="text-danger small"
          style={{ marginTop: "30px" }}
          htmlFor={field.name}
        >
          {errorMsg}
        </label>
      )}
    </React.Fragment>
  );
};

export default InputField;
