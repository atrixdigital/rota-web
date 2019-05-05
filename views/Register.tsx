import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from "reactstrap";
import Layout from "../components/Layout";
import {
  RegisterComponent,
  GetAllRoleNoAuthComponent
} from "../generated/apolloComponent";
import { Formik, Form, Field } from "formik";
import { validateRegisterSchema } from "../shared/validation-schema";
import InputField from "../components/input-field";
import Router from "next/router";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleID: string;
}

class Register extends React.Component {
  render() {
    return (
      <Layout bodyClass="bg-default">
        <Col lg="6" md="8">
          <RegisterComponent>
            {mutate => (
              <Formik<FormValues>
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  roleID: ""
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  const response = await mutate({
                    variables: {
                      data: values
                    }
                  });
                  if (response && response.data && response.data.register) {
                    resetForm();
                    setSubmitting(false);
                    Router.push("/check-email");
                  }
                }}
                validationSchema={validateRegisterSchema}
                render={({ isSubmitting, handleSubmit, errors }) => {
                  console.log(errors);
                  return (
                    <Card className="bg-secondary shadow border-0">
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Sign up with credentials</small>
                        </div>
                        {/* <div>{errors}</div> */}
                        <Form onSubmitCapture={handleSubmit}>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-hat-3" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Field
                                name="firstName"
                                placeholder="First Name"
                                type="text"
                                component={InputField}
                              />
                              {/* <Input placeholder="Name" type="text" /> */}
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-hat-3" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Field
                                name="lastName"
                                placeholder="Last Name"
                                type="text"
                                component={InputField}
                              />
                              {/* <Input placeholder="Email" type="email" /> */}
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Field
                                name="email"
                                placeholder="Email"
                                type="email"
                                component={InputField}
                              />
                              {/* <Input placeholder="Email" type="email" /> */}
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Field
                                name="password"
                                placeholder="Password"
                                type="password"
                                component={InputField}
                              />
                              {/* <Input placeholder="Password" type="password" /> */}
                            </InputGroup>
                          </FormGroup>
                          <GetAllRoleNoAuthComponent>
                            {({ data, loading }) => {
                              if (loading) {
                                return <div />;
                              }
                              if (
                                data &&
                                data.getAllRoleNoAuth &&
                                data.getAllRoleNoAuth.length > 0
                              ) {
                                return (
                                  <Field
                                    name="roleID"
                                    placeholder="Role ID"
                                    type="select"
                                    component={InputField}
                                  >
                                    {data.getAllRoleNoAuth.map(
                                      ({ id, title }) => (
                                        <option key={id} value={id}>
                                          {title}
                                        </option>
                                      )
                                    )}
                                  </Field>
                                );
                              }
                            }}
                          </GetAllRoleNoAuthComponent>
                          <div className="text-center">
                            <Button
                              className="mt-4"
                              color="primary"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              Create account
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  );
                }}
              />
            )}
          </RegisterComponent>
        </Col>
      </Layout>
    );
  }
}

export default Register;
