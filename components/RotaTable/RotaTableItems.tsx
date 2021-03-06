import React from "react";
import { Button } from "reactstrap";

export const RotaTableItemsTitle: React.SFC<{
  title: string | (() => JSX.Element);
}> = ({ title }) => (
  <th scope="row" style={{ width: "100%" }}>
    <span className="mb-0 text-sm">
      {typeof title === "string" ? title : title()}
    </span>
  </th>
);

export const RotaTableItemsSimple: React.SFC<{ text: string }> = ({ text }) => (
  <td>{text}</td>
);

interface Props {
  onOpen?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
  onApprove?: () => void;
  onDecline?: () => void;
}

export const RotaTableItemsActions: React.SFC<Props> = ({
  onDelete,
  onUpdate,
  onApprove,
  onDecline,
  onOpen
}) => (
  <td className="text-right">
    {onUpdate && (
      <Button color="primary" onClick={onUpdate} size="sm">
        Update
      </Button>
    )}
    {onDelete && (
      <Button color="primary" onClick={onDelete} size="sm">
        Delete
      </Button>
    )}
    {onApprove && (
      <Button color="primary" onClick={onApprove} size="sm">
        Approve
      </Button>
    )}
    {onDecline && (
      <Button color="primary" onClick={onDecline} size="sm">
        Decline
      </Button>
    )}

    {/* <UncontrolledDropdown>
      <DropdownToggle
        className="btn-icon-only text-light"
        href="#pablo"
        role="button"
        size="sm"
        color=""
        onClick={e => e.preventDefault()}
      >
        <i className="fas fa-ellipsis-v" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-arrow" right>
        {onOpen && typeof onOpen === "function" && (
          <DropdownItem
            onClick={e => {
              e.preventDefault();
              onDelete();
            }}
          >
            Open
          </DropdownItem>
        )}
        <DropdownItem
          onClick={e => {
            e.preventDefault();
            onDelete();
          }}
        >
          Delete
        </DropdownItem>
        <DropdownItem
          onClick={e => {
            e.preventDefault();
            onUpdate();
          }}
        >
          Update
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown> */}
  </td>
);
