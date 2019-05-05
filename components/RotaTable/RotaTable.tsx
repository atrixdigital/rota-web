import React from "react";
import {
  Table,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import RotaTableHeadItems from "./RotaTableHeadItems";

interface Props {
  headings: string[];
}

export default class RotaTable extends React.Component<Props> {
  render() {
    const { headings, children } = this.props;
    return (
      <>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              {headings &&
                headings.map((item, index) => (
                  <RotaTableHeadItems key={index} title={item} />
                ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
        {/* <CardFooter className="py-4">
          <nav aria-label="...">
            <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0"
            >
              <PaginationItem className="disabled">
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="active">
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  2 <span className="sr-only">(current)</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </CardFooter> */}
      </>
    );
  }
}
