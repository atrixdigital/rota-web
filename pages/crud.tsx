import React, { Component } from "react";
import * as yup from "yup";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Headers/Header";
import {
  CardHeader,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  FormGroup,
  Card
} from "reactstrap";
import RotaTable from "../components/RotaTable/RotaTable";
import {
  RotaTableItemsTitle,
  RotaTableItemsSimple,
  RotaTableItemsActions
} from "../components/RotaTable/RotaTableItems";

import { Field, Formik, Form, FormikActions } from "formik";
import InputField from "../components/input-field";
import { dynamicRoutes } from "../shared/dynamicRoutes";
import Department from "../views/Department";
import { FieldsOptions, Crud_Fields, Crud_Mutation } from "../interfaces";
import User from "../views/User";
import Role from "../views/Role";
import { withAuth } from "../lib/withAuth";
import Router from "next/router";
import Schedule from "../views/Schedule";

interface State {
  modal: boolean;
  data: any[];
  fields: Crud_Fields[];
  deleteMutation: Crud_Mutation;
  updateMutation: Crud_Mutation;
  createMutation: Crud_Mutation;
  actionType: string;
  selectedItem: any;
  initialValue: any;
  validateSchema: yup.ObjectSchema<yup.Shape<{}, any>>;
  formFields: FieldsOptions[];
  recieveData: boolean;
  onOpen?: () => void;
}

interface Props {
  query: any;
}

class Crud extends Component<Props, State> {
  state: Readonly<State> = {
    modal: false,
    data: [],
    fields: [],
    deleteMutation: null,
    updateMutation: null,
    createMutation: null,
    actionType: "create",
    selectedItem: null,
    initialValue: null,
    validateSchema: null,
    formFields: [],
    recieveData: false
  };

  // static async getInitialProps({ query, res }) {
  //   console.log(123);
  //   const routeIndex = dynamicRoutes.findIndex(
  //     dR => dR.path == `/${query.myRoute}`
  //   );
  //   if (routeIndex == -1) {
  //     res.statusCode = 404;
  //     return;
  //   }
  //   console.log({
  //     path: `/${query.myRoute}`,
  //     title: dynamicRoutes[routeIndex].title
  //   });
  //   return {
  //     route: {
  //       path: `/${query.myRoute}`,
  //       title: dynamicRoutes[routeIndex].title
  //     }
  //   };
  // }

  _getRoute = () => {
    const { query } = this.props;
    const routeIndex = dynamicRoutes.findIndex(
      dR => dR.path == `/${query.myRoute}`
    );
    if (routeIndex == -1) {
      Router.replace("/dashboard");
      return;
    }
    return {
      path: `/${query.myRoute}`,
      title: dynamicRoutes[routeIndex].title
    };
  };

  _toggleModal = () =>
    this.setState(prevState => ({
      modal: !prevState.modal
    }));

  _setAllState = (
    data,
    fields,
    deleteMutation,
    updateMutation,
    createMutation,
    initialValue,
    validateSchema,
    formFields,
    onOpen
  ) => {
    this.setState({
      data,
      fields,
      deleteMutation,
      updateMutation,
      createMutation,
      initialValue,
      validateSchema,
      formFields,
      recieveData: true,
      onOpen
    });
  };

  _generateNodataMessage = () => (
    <div style={{ padding: "1.25rem 1.5rem" }}>
      No {this._getRoute().title} found.
    </div>
  );

  _routeData = () => {
    const route = this._getRoute();

    const { recieveData } = this.state;
    if (route && route.path) {
      switch (route.path) {
        case "/department":
          if (!recieveData) {
            return <Department callBack={this._setAllState} />;
          }
          return null;
          break;
        case "/user":
          if (!recieveData) {
            return <User callBack={this._setAllState} />;
          }
          return null;
          break;
        case "/role":
          if (!recieveData) {
            return <Role callBack={this._setAllState} />;
          }
          return null;
          break;
        case "/schedule":
          if (!recieveData) {
            return <Schedule callBack={this._setAllState} />;
          }
          return null;
          break;
        default:
          return <div />;
      }
    }
    return <div />;
  };

  _months: string[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

  _generateFormatedDate = (dateValue: Date) => {
    return (
      dateValue.getFullYear() +
      "-" +
      this._months[dateValue.getMonth()] +
      "-" +
      dateValue.getDate() +
      " " +
      dateValue.getHours() +
      ":" +
      dateValue.getMinutes() +
      ":" +
      dateValue.getSeconds()
    );
  };

  _generateTableValue = (value: any, isDate: any) => {
    const data = isDate
      ? this._generateFormatedDate(new Date(parseInt(value)))
      : value;
    return data;
  };

  _renderItem = (item: any) => {
    const { fields, deleteMutation, onOpen } = this.state;
    return fields.map(({ type, name, isDate }, index) => {
      switch (type) {
        case "title":
          return (
            <RotaTableItemsTitle
              key={index}
              title={this._generateTableValue(item[name], isDate)}
            />
          );
          break;
        case "text":
          return (
            <RotaTableItemsSimple
              key={index}
              text={this._generateTableValue(item[name], isDate)}
            />
          );
          break;
        case "action":
          return (
            <RotaTableItemsActions
              key={index}
              id="id"
              onOpen={onOpen}
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
      if (selectedItem.hasOwnProperty(v)) {
        newVal[v] = selectedItem[v];
      } else {
        const splitedKeys = v.replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ");
        newVal[v] =
          selectedItem[splitedKeys[0]] &&
          selectedItem[splitedKeys[0]].hasOwnProperty("id")
            ? selectedItem[splitedKeys[0]].id
            : null;
      }
    }
    return newVal;
  };

  render() {
    const {
      actionType,
      selectedItem,
      data,
      fields,
      updateMutation,
      createMutation,
      validateSchema,
      formFields
    } = this.state;
    const route = this._getRoute();
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
                      <h3 className="mb-0">
                        {route && route.title && (route.title || "Department")}
                      </h3>
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
                {this._routeData()}
                {data.length > 0 ? (
                  <RotaTable headings={fields.map(f => f.title)}>
                    {data.map(item => {
                      return <tr key={item.id}>{this._renderItem(item)}</tr>;
                    })}
                  </RotaTable>
                ) : (
                  this._generateNodataMessage()
                )}
              </Card>
            </div>
          </Row>
        </Container>
        <CreateUpdateModal<any>
          crud_toggle={this._toggleModal}
          crud_isOpen={this.state.modal}
          crud_onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            Object.keys(values).map(value => {
              if (
                Object.prototype.toString.call(values[value]) ===
                "[object Date]"
              ) {
                values[value] = new Date(values[value]).getTime().toString();
              }
            });
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
          crud_validationSchema={validateSchema}
          crud_modelTitle={route.title}
          crud_type={actionType === "create" ? "Create" : "Update"}
          crud_fields={formFields}
        />
      </AdminLayout>
    );
  }
}

export default withAuth(Crud);

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
                                  <FormGroup>
                                    <label
                                      className="form-control-label"
                                      htmlFor={f_name}
                                    >
                                      {f_label}
                                    </label>
                                    <Field
                                      name={f_name}
                                      placeholder={f_label}
                                      type={f_type}
                                      component={InputField}
                                    >
                                      {f_options &&
                                        f_options.length > 0 &&
                                        f_options.map(
                                          ({ o_id, o_title }, i) => (
                                            <option key={i} value={o_id}>
                                              {o_title}
                                            </option>
                                          )
                                        )}
                                    </Field>
                                  </FormGroup>
                                </Col>
                              );
                            }
                            // if(f_type === 'dateTimePicker'){
                            //   return <Col lg="6" key={index}>
                            //   <FormGroup>
                            //     <label
                            //       className="form-control-label"
                            //       htmlFor={f_name}
                            //     >
                            //       {f_label}
                            //     </label>
                            //     <Field
                            //       name={f_name}
                            //       placeholder={f_label}
                            //       type={f_type}
                            //       component={InputField}
                            //      />
                            //   </FormGroup>
                            // </Col>
                            // }
                            return (
                              <Col lg="6" key={index}>
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor={f_name}
                                  >
                                    {f_label}
                                  </label>
                                  <Field
                                    name={f_name}
                                    placeholder={f_label}
                                    type={f_type}
                                    componentType={f_type}
                                    component={InputField}
                                  />
                                </FormGroup>
                              </Col>
                            );
                          }
                        )}
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
