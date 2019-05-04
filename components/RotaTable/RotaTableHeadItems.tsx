import React from "react";

interface Props {
  title: string;
}

const RotaTableHeadItems: React.SFC<Props> = ({ title }) => (
  <th scope="col">{title}</th>
);

export default RotaTableHeadItems;
