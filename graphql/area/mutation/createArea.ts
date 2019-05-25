import gql from "graphql-tag";
import { AreaBasicFragment } from "../fragements";

export const CreateAreaMutaion = gql`
  mutation CreateArea($data: CreateAreaInput!) {
    createArea(data: $data) {
      ...AreaBasicFragment
    }
  }
  ${AreaBasicFragment}
`;
