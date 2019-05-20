import { Field, Form, Formik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import InputField from "../components/input-field";
import Layout from "../components/Layout";
import { LoginComponent } from "../generated/apolloComponent";
import FlashMessage from "../lib/FlashMessage";
import { validateLoginSchema } from "../shared/validation-schema";

interface FormValues {
  email: string;
  password: string;
}

class Login extends React.Component {
  render() {
    const flassMessage = new FlashMessage();
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
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                  try {
                    const response = await mutate({
                      variables: values
                    });
                    if (response && response.data && !response.data.login) {
                      setErrors({
                        email: "invalid login"
                      });
                      return;
                    }
                    flassMessage.text = "Successfully Loggedin.";
                    flassMessage.type = "success";
                    flassMessage.show();
                    Router.push("/dashboard");
                  } catch (e) {
                    // console.log(e.message);
                  }
                  setSubmitting(false);
                }}
                validationSchema={validateLoginSchema}
                render={({ isSubmitting }) => (
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Sign in with Administration credentials</small>
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
