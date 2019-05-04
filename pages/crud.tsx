import React, { Component } from "react";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Headers/Header";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col
} from "reactstrap";
import RotaTable from "../components/RotaTable/RotaTable";
import {
  // GetAllDepartmentComponent,
  CreateDepartmentComponent,
  DepartmentBasicFragmentFragment,
  DeleteByDepartmentIdComponent,
  UpdateByDepartmentIdComponent
} from "../generated/apolloComponent";
import {
  RotaTableItemsTitle,
  RotaTableItemsSimple,
  RotaTableItemsActions
} from "../components/RotaTable/RotaTableItems";

import { Field, Formik, Form, FormikActions } from "formik";
import InputField from "../components/input-field";
import { dynamicRoutes, DynamicRoutes } from "../shared/dynamicRoutes";
import Department from "../views/Department";
import { FieldsOptions } from "../interfaces";

interface Mutation {
  mutation: any;
  field: string;
}

interface State {
  modal: boolean;
  departments: DepartmentBasicFragmentFragment[];
  data: any[];
  fields: { title: string; type: string }[];
  deleteMutation: Mutation;
  updateMutation: Mutation;
  createMutation: Mutation;
  actionType: string;
  selectedItem: DepartmentBasicFragmentFragment;
  initialValue: any;
  validateDepartmentSchema: any;
  formFields: FieldsOptions[];
}

interface Props {
  route: DynamicRoutes;
}

class Crud extends Component<Props, State> {
  state: Readonly<State> = {
    modal: false,
    departments: [],
    data: [],
    fields: [],
    deleteMutation: null,
    updateMutation: null,
    createMutation: null,
    actionType: "create",
    selectedItem: null,
    initialValue: null,
    validateDepartmentSchema: null,
    formFields: []
  };

  static async getInitialProps({ asPath, res }) {
    const routeIndex = dynamicRoutes.findIndex(dR => dR.path == asPath);
    if (routeIndex == -1) {
      res.statusCode = 404;
      return;
    }
    return { route: dynamicRoutes[routeIndex] };
  }

  _toggleModal = () =>
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

  _routeData = () => {
    const { route } = this.props;
    const { data } = this.state;
    // if(data.length)
    switch (route.path) {
      case "/department":
        if (data.length <= 0) {
          return (
            <Department
              callBack={(
                data,
                fields,
                deleteMutation,
                updateMutation,
                createMutation,
                initialValue,
                validateDepartmentSchema,
                formFields
              ) => {
                this.setState({
                  data,
                  fields,
                  deleteMutation,
                  updateMutation,
                  createMutation,
                  initialValue,
                  validateDepartmentSchema,
                  formFields
                });
              }}
            />
          );
        }
        return <div />;
        break;
      default:
        return <div />;
    }
  };

  _renderItem = (item: any) => {
    const { fields, deleteMutation } = this.state;
    return fields.map(({ title, type }, index) => {
      switch (type) {
        case "title":
          return <RotaTableItemsTitle key={index} title={item[title]} />;
          break;
        case "text":
          return <RotaTableItemsSimple key={index} text={item[title]} />;
          break;
        case "action":
          return (
            <RotaTableItemsActions
              key={index}
              id="id"
              onDelete={async () => {
                const response = await deleteMutation.mutation({
                  variables: {
                    data: item.id
                  }
                });
                if (
                  response &&
                  response.data &&
                  response.data[deleteMutation.field]
                ) {
                  const { data } = this.state;
                  data.splice(data.findIndex(d => d.id === item.id), 1);
                  this.setState({
                    data: [...data]
                  });
                }
              }}
              onUpdate={() => {
                this.setState(
                  {
                    selectedItem: item,
                    actionType: "update"
                  },
                  () => this._toggleModal()
                );
              }}
            />
          );
          break;
      }
    });
  };

  _calcInitialValue = () => {
    const { actionType, initialValue, selectedItem } = this.state;
    if (actionType === "create") {
      return initialValue;
    }
    const newVal: any = {};
    for (let v in initialValue) {
      newVal[v] = selectedItem[v];
    }
    return newVal;
  };

  render() {
    const {
      departments,
      actionType,
      selectedItem,
      data,
      fields,
      updateMutation,
      createMutation,
      validateDepartmentSchema,
      formFields
    } = this.state;
    const { route } = this.props;
    return (
      <AdminLayout pageTitle="Tables">
        <Header />
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col-11">
                      <h3 className="mb-0">Departments</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={() =>
                          this.setState({ actionType: "create" }, () =>
                            this._toggleModal()
                          )
                        }
                        size="sm"
                      >
                        Create
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                {/* <route.components.get.component>
                  {({ data, loading }) => {
                    if (loading) {
                      return <div />;
                    }
                    if (
                      data &&
                      data[route.components.get.property] &&
                      data[route.components.get.property].length > 0
                    ) {
                      if (this.state.departments.length <= 0) {
                        this.setState({
                          data: data[route.components.get.property]
                        });
                      }
                      return <div />;
                    }
                    return <div />;
                  }}
                </route.components.get.component> */}
                {/* <GetAllDepartmentComponent>
                  {({ data, loading }) => {
                    if (loading) {
                      return <div />;
                    }
                    if (
                      data &&
                      data.getAllDepartment &&
                      data.getAllDepartment.length > 0
                    ) {
                      if (this.state.departments.length <= 0) {
                        this.setState({ departments: data.getAllDepartment });
                      }
                      return <div />;
                    }
                    return <div />;
                  }}
                </GetAllDepartmentComponent> */}
                {this._routeData()}
                {data.length > 0 && (
                  <RotaTable headings={fields.map(f => f.title)}>
                    {data.map(item => {
                      return (
                        <tr key={item.id}>
                          {this._renderItem(item)}
                          {/* <RotaTableItemsTitle title={title} />
                          <RotaTableItemsSimple text={email} />
                          <RotaTableItemsSimple text={phone} />
                          <DeleteByDepartmentIdComponent>
                            {mutate => (
                              <RotaTableItemsActions
                                id="id"
                                onDelete={async () => {
                                  const response = await mutate({
                                    variables: {
                                      data: id
                                    }
                                  });
                                  if (
                                    response &&
                                    response.data &&
                                    response.data.deleteByDepartmentID
                                  ) {
                                    const { departments } = this.state;
                                    departments.splice(
                                      departments.findIndex(d => d.id === id),
                                      1
                                    );
                                    this.setState({
                                      departments: [...departments]
                                    });
                                  }
                                }}
                                onUpdate={() => {
                                  this.setState(
                                    {
                                      selectedItem: { id, title, email, phone },
                                      actionType: "update"
                                    },
                                    () => this._toggleModal()
                                  );
                                }}
                              />
                            )}
                          </DeleteByDepartmentIdComponent> */}
                        </tr>
                      );
                    })}
                  </RotaTable>
                )}
              </Card>
            </div>
          </Row>
        </Container>
        <UpdateByDepartmentIdComponent>
          {mu => (
            <CreateDepartmentComponent>
              {m => (
                <CreateUpdateModal<any>
                  crud_toggle={this._toggleModal}
                  crud_isOpen={this.state.modal}
                  crud_onSubmit={async (
                    values,
                    { setSubmitting, resetForm }
                  ) => {
                    setSubmitting(true);
                    if (actionType === "create") {
                      const response = await createMutation.mutation({
                        variables: {
                          data: values
                        }
                      });
                      if (
                        response &&
                        response.data &&
                        response.data[createMutation.field]
                      ) {
                        resetForm();
                        setSubmitting(false);
                        const { data } = this.state;
                        this.setState(
                          {
                            data: [response.data[createMutation.field], ...data]
                          },
                          () => this._toggleModal()
                        );
                      }
                    } else {
                      const response = await updateMutation.mutation({
                        variables: {
                          id: selectedItem.id,
                          data: values
                        }
                      });
                      if (
                        response &&
                        response.data &&
                        response.data[updateMutation.field]
                      ) {
                        resetForm();
                        setSubmitting(false);
                        const { data } = this.state;
                        data[data.findIndex(d => d.id === selectedItem.id)] = {
                          ...response.data[updateMutation.field]
                        };
                        this.setState(
                          {
                            data: [...data]
                          },
                          () => this._toggleModal()
                        );
                      }
                    }
                  }}
                  crud_initialValue={this._calcInitialValue()}
                  crud_validationSchema={validateDepartmentSchema}
                  crud_modelTitle={route.title}
                  crud_type={actionType === "create" ? "Create" : "Update"}
                  crud_fields={formFields}
                />
              )}
            </CreateDepartmentComponent>
          )}
        </UpdateByDepartmentIdComponent>
        {/* <Modal isOpen={this.state.modal} toggle={this._toggleModal} size="lg">
          <CreateDepartmentComponent>
            {mutate => (
              <Formik<FormValues>
                initialValues={{
                  title: "",
                  email: "",
                  phone: "",
                  userID: ""
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  const response = await mutate({
                    variables: {
                      data: values
                    }
                  });
                  if (
                    response &&
                    response.data &&
                    response.data.createDepartment &&
                    response.data.createDepartment.id
                  ) {
                    resetForm();
                    setSubmitting(false);
                    const { departments } = this.state;
                    this.setState(
                      {
                        departments: [
                          response.data.createDepartment,
                          ...departments
                        ]
                      },
                      () => this._toggleModal()
                    );
                    console.log(this.state.departments);
                  }
                }}
                validationSchema={validateDepartmentSchema}
                render={({ isSubmitting }) => {
                  return (
                    <Form>
                      <ModalHeader toggle={this._toggleModal}>
                        Create Department
                      </ModalHeader>
                      <ModalBody>
                        <div className="pl-lg-4">
                          <Row>
                            <Col lg="6">
                              <Field
                                name="title"
                                placeholder="Title"
                                type="text"
                                label="Title"
                                component={InputField}
                              />
                            </Col>
                            <Col lg="6">
                              <Field
                                name="email"
                                placeholder="Email"
                                type="email"
                                label="Email"
                                component={InputField}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="6">
                              <Field
                                name="phone"
                                placeholder="Phone"
                                type="text"
                                label="Phone"
                                component={InputField}
                              />
                            </Col>
                            <Col lg="6">
                              <Field
                                name="userID"
                                placeholder="Select User"
                                type="select"
                                componentType="select"
                                label="User"
                                component={InputField}
                              >
                                <option>Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                              </Field>
                            </Col>
                          </Row>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          type="submit"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>{" "}
                        <Button color="secondary" onClick={this._toggleModal}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Form>
                  );
                }}
              />
            )}
          </CreateDepartmentComponent>
        </Modal> */}
      </AdminLayout>
    );
  }
}

export default Crud;

// interface SelectOption {
//   o_id: string;
//   o_title: string;
// }

// interface FieldsOptions {
//   f_name: string;
//   f_type: string;
//   f_label: string;
//   f_options?: SelectOption[];
// }

interface ModalProps<T> {
  crud_toggle: () => void;
  crud_isOpen: boolean;
  crud_onSubmit: (values: T, formikActions: FormikActions<T>) => Promise<void>;
  crud_initialValue: T;
  crud_validationSchema: any;
  crud_modelTitle: string;
  crud_type: string;
  crud_fields: FieldsOptions[];
}

class CreateUpdateModal<T> extends Component<ModalProps<T>> {
  render() {
    const {
      crud_isOpen,
      crud_toggle,
      crud_initialValue,
      crud_onSubmit,
      crud_validationSchema,
      crud_modelTitle,
      crud_type,
      crud_fields
    } = this.props;
    return (
      <Modal isOpen={crud_isOpen} toggle={crud_toggle} size="lg">
        <Formik<T>
          initialValues={crud_initialValue}
          onSubmit={crud_onSubmit}
          validationSchema={crud_validationSchema}
          render={({ isSubmitting }) => {
            return (
              <Form>
                <ModalHeader toggle={crud_toggle}>
                  {crud_type || "Create"} {crud_modelTitle}
                </ModalHeader>
                <ModalBody>
                  <div className="pl-lg-4">
                    <Row>
                      {crud_fields.length > 0 &&
                        crud_fields.map(
                          ({ f_name, f_label, f_type, f_options }, index) => {
                            if (f_type === "select") {
                              return (
                                <Col lg="6" key={index}>
                                  <Field
                                    name={f_name}
                                    placeholder={f_label}
                                    type={f_type}
                                    label={f_label}
                                    component={InputField}
                                  >
                                    {f_options &&
                                      f_options.length > 0 &&
                                      f_options.map(({ o_id, o_title }, i) => (
                                        <option key={i} value={o_id}>
                                          {o_title}
                                        </option>
                                      ))}
                                  </Field>
                                </Col>
                              );
                            }
                            return (
                              <Col lg="6" key={index}>
                                <Field
                                  name={f_name}
                                  placeholder={f_label}
                                  type={f_type}
                                  label={f_label}
                                  component={InputField}
                                />
                              </Col>
                            );
                          }
                        )}
                      {/* <Col lg="6">
                        <Field
                          name="title"
                          placeholder="Title"
                          type="text"
                          label="Title"
                          component={InputField}
                        />
                      </Col>
                      <Col lg="6">
                        <Field
                          name="email"
                          placeholder="Email"
                          type="email"
                          label="Email"
                          component={InputField}
                        />
                      </Col>
                      <Col lg="6">
                        <Field
                          name="phone"
                          placeholder="Phone"
                          type="text"
                          label="Phone"
                          component={InputField}
                        />
                      </Col>
                      <Col lg="6">
                        <Field
                          name="userID"
                          placeholder="Select User"
                          type="select"
                          componentType="select"
                          label="User"
                          component={InputField}
                        >
                          <option>Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </Field>
                      </Col> */}
                    </Row>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>{" "}
                  <Button color="secondary" onClick={crud_toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            );
          }}
        />
      </Modal>
    );
  }
}
