import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

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
  id: string;
  onOpen?: () => void;
  onDelete: () => void;
  onUpdate: () => void;
}

export const RotaTableItemsActions: React.SFC<Props> = ({
  onDelete,
  onUpdate,
  onOpen
}) => (
  <td className="text-right">
    <UncontrolledDropdown>
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
    </UncontrolledDropdown>
  </td>
);
