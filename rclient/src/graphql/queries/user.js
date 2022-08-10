import { gql } from "@apollo/client";

export const GET_ALL_USERS_QUERY = gql`
  query getAllUsers($ageDivider: Int) {
    getAllUsers(ageDivider: $ageDivider) {
      _id
      name
      age
    }
  }
`;
