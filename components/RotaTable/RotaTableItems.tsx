import React from "react";
import { Button } from "reactstrap";

export const RotaTableItemsTitle: React.SFC<{ title: string }> = ({
  title
}) => (
  <th scope="row">
    <span className="mb-0 text-sm">{title}</span>
  </th>
);

export const RotaTableItemsSimple: React.SFC<{ text: string }> = ({ text }) => (
  <td>{text}</td>
);

interface Props {
  onOpen?: () => void;
  onDelete: () => void;
  onUpdate: () => void;
  onApprove: () => void;
  onDecline: () => void;
  isDelete?: boolean;
  isUpdate?: boolean;
  isApprove?: boolean;
  isDecline?: boolean;
}

export const RotaTableItemsActions: React.SFC<Props> = ({
  onDelete,
  onUpdate,
  onApprove,
  onDecline,
  onOpen,
  isDelete,
  isUpdate,
  isApprove,
  isDecline
}) => (
  <td className="text-right">
    {isUpdate && (
      <Button color="primary" onClick={onUpdate} size="sm">
        Update
      </Button>
    )}
    {isDelete && (
      <Button color="primary" onClick={onDelete} size="sm">
        Delete
      </Button>
    )}
    {isApprove && (
      <Button color="primary" onClick={onApprove} size="sm">
        Approve
      </Button>
    )}
    {isDecline && (
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
