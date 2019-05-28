import { Field } from "formik";
import React from "react";
import { Col, FormGroup, Label } from "reactstrap";
import InputField from "./input-field";

interface TextFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  componentType: string;
}

const BaseField: React.SFC<TextFieldProps & { type: string }> = ({
  label,
  ...props
}) => {
  return (
    <Col lg="6">
      <FormGroup>
        <label className="form-control-label" htmlFor={props.name}>
          {label}
        </label>
        <Field {...props} component={InputField} />
      </FormGroup>
    </Col>
  );
};

export const TextField: React.SFC<TextFieldProps> = props => {
  return <BaseField {...props} type="text" />;
};

export const CheckBoxField: React.SFC<TextFieldProps> = props => {
  return (
    <Col lg="6">
      <FormGroup check>
        <Label check>
          <Field {...props} type="checkbox" component={InputField} />{" "}
          {props.label}
        </Label>
      </FormGroup>
    </Col>
  );
};

export const NumberField: React.SFC<TextFieldProps> = props => {
  return <BaseField {...props} type="number" />;
};

export const PasswordField: React.SFC<TextFieldProps> = ({
  label,
  ...props
}) => {
  return (
    <Col lg="6">
      <FormGroup>
        <label className="form-control-label" htmlFor={props.name}>
          {label}
        </label>
        <Field {...props} type="password" component={InputField} />
      </FormGroup>
    </Col>
  );
};

interface Options {
  id: string;
  title: string;
}

interface SelectFieldProps extends TextFieldProps {
  options: Options[];
}

export const SelectField: React.SFC<SelectFieldProps> = ({
  label,
  name,
  options
}) => {
  return (
    <Col lg="6">
      <FormGroup>
        <label className="form-control-label" htmlFor={name}>
          {label}
        </label>
        <Field
          name={name}
          placeholder={label}
          type="select"
          componentType="select"
          component={InputField}
        >
          <option value="">Select {label}</option>
          {options &&
            options.length > 0 &&
            options.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
        </Field>
      </FormGroup>
    </Col>
  );
};

export const DateField: React.SFC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <Col lg="6">
      <FormGroup>
        <label className="form-control-label" htmlFor={props.name}>
          {label}
        </label>
        <Field {...props} componentType="date" component={InputField} />
      </FormGroup>
    </Col>
  );
};
