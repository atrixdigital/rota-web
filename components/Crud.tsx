import { Form, Formik, FormikActions } from "formik";
import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  Container,
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
import AdminLayout from "./AdminLayout";
import Header from "./Headers/Header";
import Loader from "./Loader";
import RotaTable from "./RotaTable/RotaTable";

interface Props<T, I> {
  pageTitle: string;
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
  generateFormFields: () => JSX.Element;
  isModalOpen: boolean;
  filters?: string[];
  me?: MeMe;
}

interface State<T> {
  items: T[];
  currentPage: number;
  totalPerPage: number;
  searchField: string;
}

class Crud<T extends {}, I extends {}> extends Component<
  Props<T, I>,
  State<T>
> {
  state: Readonly<State<T>> = {
    items: this.props.items,
    currentPage: 1,
    totalPerPage: 10,
    searchField: this.props.fields.length > 0 ? this.props.fields[0] : ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      searchField: nextProps.fields.length > 0 ? nextProps.fields[0] : ""
    });
  }

  _isSearch = (): boolean => {
    const { filters } = this.props;
    return filters ? !!filters.find(filter => filter === "filter") : false;
  };

  _generateCols = (): number => {
    let totalCols = 11;
    if (this._isSearch()) {
      totalCols = totalCols - 5;
    }
    return totalCols;
  };

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
      me
    } = this.props;
    const { items, currentPage, searchField, totalPerPage } = this.state;
    const { pageNumbers, currentItems } = this._generatePaginationMeta();

    return (
      <AdminLayout pageTitle={pageTitle} me={me}>
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className={`col-${this._generateCols()}`}>
                      <Row className="align-items-center">
                        <div className="col-md-3">
                          <h3 className="mb-0">{pageTitle}</h3>
                        </div>
                        <div className="col-2">
                          <div className="navbar-search form-inline d-none d-md-flex ml-lg-auto">
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
                      </Row>
                    </div>
                    {this._isSearch() && searchField ? (
                      <>
                        <div className="col-3 text-right">
                          <div className="navbar-search form-inline d-none d-md-flex ml-lg-auto">
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
                        {fields && fields.length > 0 ? (
                          <div className="col-2">
                            <div className="navbar-search form-inline d-none d-md-flex ml-lg-auto">
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
                        ) : null}
                      </>
                    ) : null}
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={async () => {
                          await changeActionType();
                          toggleModal();
                        }}
                        size="sm"
                      >
                        Create
                      </Button>
                    </div>
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
                  >
                    {currentItems.map(item => renderItem(item))}
                  </RotaTable>
                ) : (
                  <div />
                )}
              </Card>
            </div>
          </Row>
        </Container>
        <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
          <Formik<I>
            initialValues={initialValue}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={({ isSubmitting }) => {
              return (
                <Form>
                  <ModalHeader toggle={toggleModal}>
                    {getActionType()} {pageTitle}
                  </ModalHeader>
                  <ModalBody>
                    <div className="pl-lg-4">
                      <Row>{generateFormFields()}</Row>
                    </div>
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
      </AdminLayout>
    );
  }
}

export default Crud;
