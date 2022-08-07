import { gql } from "@apollo/client";

export const GET_ALL_CHALLENGES_QUERY = gql`
  query getAllChallenges {
    getAllChallenges {
      _id
      name
      participants {
        _id
        name
        age
      }
    }
  }
`;
