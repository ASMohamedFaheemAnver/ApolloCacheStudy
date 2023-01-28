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

export const GET_PAGINATED_USERS_QUERY = gql`
  query getPaginatedUsers($paginationDto: PaginationDto!) {
    getPaginatedUsers(paginationDto: $paginationDto) {
      users {
        _id
        name
        age
      }
      info {
        page
        size
        total
      }
    }
  }
`;
