import { gql } from "@apollo/client";

export const GET_ALL_USERS_QUERY = gql`
  query {
    getAllUsers {
      _id
      name
      age
    }
  }
`;
