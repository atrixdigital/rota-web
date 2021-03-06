import React from "react";
import {
  Button,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table
} from "reactstrap";
import RotaTableHeadItems from "./RotaTableHeadItems";

interface Props {
  headings: string[];
  pageNumbers?: number[];
  currentPage?: number;
  onPageChange?: (currentPage: number) => void;
  onCreateClick?: (() => Promise<void>) | boolean;
}

export default class RotaTable extends React.Component<Props> {
  _onPageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    pageNumber: number | string = "next"
  ) => {
    e.preventDefault();
    const { onPageChange, pageNumbers, currentPage } = this.props;
    let pageNumber_updated = currentPage;
    if (typeof pageNumber === "number") {
      pageNumber_updated = pageNumber;
    }
    if (typeof pageNumber === "string") {
      pageNumber_updated =
        pageNumber === "next" ? pageNumber_updated + 1 : pageNumber_updated - 1;
    }
    if (pageNumber_updated < 1) {
      pageNumber_updated = 1;
    }
    if (pageNumber_updated > pageNumbers.length) {
      pageNumber_updated = pageNumbers.length;
    }
    onPageChange(pageNumber_updated);
  };

  render() {
    const {
      headings,
      children,
      pageNumbers,
      currentPage,
      onCreateClick
    } = this.props;
    return (
      <>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {pageNumbers &&
                pageNumbers.length > 0 &&
                headings &&
                headings.map((item, index) => (
                  <RotaTableHeadItems key={index} title={item} />
                ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
        {(pageNumbers && pageNumbers.length > 0) || onCreateClick ? (
          <CardFooter className="py-4">
            <div className="d-flex align-items-center">
              {onCreateClick && (
                <div>
                  <Button
                    color="primary"
                    onClick={
                      onCreateClick && typeof onCreateClick === "function"
                        ? onCreateClick
                        : null
                    }
                    size="sm"
                  >
                    Create
                  </Button>
                </div>
              )}
              {pageNumbers && pageNumbers.length > 0 && (
                <div className="flex-fill">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem
                        className={currentPage <= 1 ? "disabled" : ""}
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={e => this._onPageChange(e, "previous")}
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {pageNumbers.map(number => {
                        return (
                          <PaginationItem
                            key={number}
                            className={currentPage === number ? "active" : ""}
                          >
                            <PaginationLink
                              id={number.toString()}
                              onClick={e => this._onPageChange(e, number)}
                            >
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}{" "}
                      <PaginationItem
                        className={
                          currentPage >= 1 && currentPage >= pageNumbers.length
                            ? "disabled"
                            : ""
                        }
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={this._onPageChange}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </div>
              )}
            </div>
          </CardFooter>
        ) : null}
      </>
    );
  }
}
