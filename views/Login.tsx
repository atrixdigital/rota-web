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
  Row,
  Col
} from "reactstrap";
import Layout from "../components/Layout";
import { LoginComponent } from "../generated/apolloComponent";
import { Formik, Form, Field } from "formik";
import { validateLoginSchema } from "../shared/validation-schema";
import InputField from "../components/input-field";
import Router from "next/router";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

class Login extends React.Component {
  render() {
    return (
      <Layout bodyClass="bg-default">
        <Col lg="5" md="7">
          <LoginComponent>
            {mutate => (
              <Formik<FormValues>
                initialValues={{
                  email: "",
                  password: ""
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await mutate({
                    variables: values
                  });
                  if (response && response.data && !response.data.login) {
                    setErrors({
                      email: "invalid login"
                    });
                    return;
                  }
                  Router.push("/dashboard");
                }}
                validationSchema={validateLoginSchema}
                render={({ isSubmitting }) => (
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Sign in with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
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
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                )}
              />
            )}
          </LoginComponent>

          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <Link href="/auth/register">
                <a className="text-light">
                  <small>Create new account</small>
                </a>
              </Link>
            </Col>
          </Row>
        </Col>
      </Layout>
    );
  }
}

export default Login;
