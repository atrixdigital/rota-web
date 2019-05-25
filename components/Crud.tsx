import { Form, Formik, FormikActions } from "formik";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import { MeMe } from "../generated/apolloComponent";
import Loader from "./Loader";
import RotaTable from "./RotaTable/RotaTable";

interface FiltersClause {
  isAreaFilter?: boolean;
  isTypeFilter?: boolean;
}

type CreateButtonLocation = "bottom-left" | "top-right";

interface Props<T, I> {
  pageTitle: (() => JSX.Element) | string;
  items: T[];
  fields: string[];
  loading: boolean;
  renderItem: (item: T) => JSX.Element;
  toggleModal: () => void;
  initialValue: I;
  onSubmit: (values: I, formikActions: FormikActions<I>) => void;
  validationSchema: any;
  changeActionType: (type?: string) => Promise<void>;
  getActionType: () => string;
  generateFormFields: (values: I) => JSX.Element;
  isModalOpen: boolean;
  me?: MeMe;
  isCreate?: boolean;
  createLocation?: CreateButtonLocation;
  onDelete?: () => void;
  isFilters?: boolean;
  filters?: FiltersClause;
  renderTypes?: () => JSX.Element[];
  renderAreas?: () => JSX.Element[];
}

interface State<T> {
  items: T[];
  currentPage: number;
  totalPerPage: number;
  searchField: string;
  areaFieldValue: string;
  typeFieldValue: string;
}

class Crud<T extends {}, I extends {}> extends Component<
  Props<T, I>,
  State<T>
> {
  state: Readonly<State<T>> = {
    items: this.props.items,
    currentPage: 1,
    totalPerPage: 10,
    searchField: this.props.fields.length > 0 ? this.props.fields[0] : "",
    areaFieldValue: "",
    typeFieldValue: ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      searchField: nextProps.fields.length > 0 ? nextProps.fields[0] : ""
    });
  }

  _onSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { items } = this.props;
    const { searchField } = this.state;
    if (searchField) {
      let updatedList = items;
      updatedList = updatedList.filter(item => {
        return (
          item[searchField]
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
        );
      });
      this.setState({ items: updatedList }, () => {
        const { pageNumbers } = this._generatePaginationMeta();
        // currentPage > pageNumbers.length
        //   ?
        //   : null;
        this._onPageChange(pageNumbers.length > 1 ? 1 : pageNumbers.length);
      });
    }
  };

  _onPageChange = (currentPage: number) => {
    this.setState({
      currentPage
    });
  };

  _generatePaginationMeta = (): {
    pageNumbers: number[];
    currentItems: T[];
  } => {
    const { items, currentPage, totalPerPage } = this.state;
    let currentItems = items;
    const pageNumbers = [];
    if (currentItems && currentItems.length > 0) {
      // Logic for displaying todos
      const indexOfLastTodo = currentPage * totalPerPage;
      const indexOfFirstTodo = indexOfLastTodo - totalPerPage;
      currentItems = items.slice(indexOfFirstTodo, indexOfLastTodo);

      for (let i = 1; i <= Math.ceil(items.length / totalPerPage); i++) {
        pageNumbers.push(i);
      }
    }
    return { pageNumbers, currentItems };
  };

  _onCreateClick = async () => {
    const { changeActionType, toggleModal } = this.props;
    await changeActionType();
    toggleModal();
  };

  render() {
    const {
      pageTitle,
      fields,
      loading,
      renderItem,
      toggleModal,
      initialValue,
      onSubmit,
      validationSchema,
      changeActionType,
      getActionType,
      generateFormFields,
      isModalOpen,
      me,
      isCreate,
      createLocation,
      onDelete,
      isFilters,
      filters,
      renderAreas,
      renderTypes
    } = this.props;
    const {
      items,
      currentPage,
      searchField,
      totalPerPage,
      areaFieldValue,
      typeFieldValue
    } = this.state;
    const { pageNumbers, currentItems } = this._generatePaginationMeta();

    return (
      <>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-3">
              {typeof pageTitle === "function" ? pageTitle() : pageTitle}
            </h3>
            <Row className="align-items-center">
              {isFilters && filters && items.length > 0 ? (
                <>
                  {filters.isAreaFilter ? (
                    <div className="col-md-2 col-sm-6">
                      <div className="navbar-search form-inline d-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Select Area"
                              type="select"
                              value={areaFieldValue}
                              onChange={e => {
                                this.setState({
                                  areaFieldValue: e.target.value
                                });
                              }}
                            >
                              <option value="">Select Area</option>
                              {renderAreas()}
                              {/* {data &&
                                      data.getAllArea &&
                                      data.getAllArea.length > 0 &&
                                      data.getAllArea.map(({ id, title }) => {
                                        return (
                                          <option key={id} value={id}>
                                            {title}
                                          </option>
                                        );
                                      })} */}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </div>
                    </div>
                  ) : null}
                  {filters.isTypeFilter && (
                    <div className="col-md-2 col-sm-6">
                      <div className="navbar-search form-inline d-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Select Type"
                              type="select"
                              value={typeFieldValue}
                              onChange={e => {
                                this.setState({
                                  typeFieldValue: e.target.value
                                });
                              }}
                            >
                              <option value="">Select Type</option>
                              {renderTypes()}
                              {/* {data &&
                                      data.getAllRoleNoAuth &&
                                      data.getAllRoleNoAuth.length > 0 &&
                                      data.getAllRoleNoAuth
                                        .filter(
                                          ({ title }) => title !== "Manager"
                                        )
                                        .map(({ id, title }) => {
                                          return (
                                            <option key={id} value={id}>
                                              {title}
                                            </option>
                                          );
                                        })} */}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </div>
                    </div>
                  )}
                  <div className="col-md-3 col-sm-8">
                    <div className="navbar-search form-inline d-flex ml-lg-auto">
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Search"
                            type="text"
                            onChange={this._onSearch}
                          />
                        </InputGroup>
                      </FormGroup>
                    </div>
                  </div>
                  {/* {fields && fields.length > 0 ? (
                    <div className="col-md-2 col-sm-2">
                      <div className="navbar-search form-inline d-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                          <InputGroup className="input-group-alternative">
                            <Input
                              placeholder="Search Field"
                              type="select"
                              value={searchField}
                              onChange={e => {
                                this.setState({
                                  searchField: e.target.value
                                });
                              }}
                            >
                              <option>Search Field</option>
                              {fields.map((f, i) =>
                                f ? (
                                  <option key={i} value={f}>
                                    {f}
                                  </option>
                                ) : null
                              )}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </div>
                    </div>
                  ) : null} */}
                </>
              ) : null}
              {isFilters && items.length > 0 && (
                <>
                  <div style={{ flex: 1 }} />
                  <div className="col-md-2 col-sm-3">
                    <div className="navbar-search form-inline d-flex ml-lg-auto">
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <Input
                            placeholder="No. of Pages"
                            type="select"
                            value={totalPerPage}
                            onChange={e => {
                              this.setState({
                                totalPerPage: parseInt(e.target.value)
                              });
                            }}
                          >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                          </Input>
                        </InputGroup>
                      </FormGroup>
                    </div>
                  </div>
                </>
              )}
              {(isCreate && createLocation === "top-right") || onDelete ? (
                <div className="col text-right">
                  {isCreate && createLocation === "top-right" && (
                    <Button
                      color="primary"
                      onClick={this._onCreateClick}
                      size="sm"
                    >
                      Create
                    </Button>
                  )}
                  {onDelete && (
                    <Button color="primary" onClick={onDelete} size="sm">
                      Delete
                    </Button>
                  )}
                </div>
              ) : null}
            </Row>
          </CardHeader>
          {/* render data and table */}
          {loading && <Loader className="col-12" />}
          {items && items.length > 0 ? (
            <RotaTable
              headings={fields}
              pageNumbers={pageNumbers}
              currentPage={currentPage}
              onPageChange={this._onPageChange}
              onCreateClick={
                isCreate && createLocation === "bottom-left"
                  ? this._onCreateClick
                  : false
              }
            >
              {currentItems
                .filter(item => {
                  if (
                    filters &&
                    filters.isAreaFilter &&
                    areaFieldValue !== ""
                  ) {
                    return item["area"]
                      ? item["area"].id === areaFieldValue
                      : true;
                  }
                  return true;
                })
                .filter(item => {
                  if (
                    filters &&
                    filters.isTypeFilter &&
                    typeFieldValue !== ""
                  ) {
                    return item["role"]
                      ? item["role"].id === typeFieldValue
                      : true;
                  }
                  return true;
                })
                .map(item => renderItem(item))}
            </RotaTable>
          ) : (
            <div />
          )}
        </Card>
        <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
          <Formik<I>
            initialValues={initialValue}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={({ isSubmitting, values }) => {
              return (
                <Form>
                  <ModalHeader toggle={toggleModal}>
                    {getActionType()} {pageTitle}
                  </ModalHeader>
                  <ModalBody>
                    <Row>{generateFormFields(values)}</Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          />
        </Modal>
      </>
    );
  }
}

export default Crud;
