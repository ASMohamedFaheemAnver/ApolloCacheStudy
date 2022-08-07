import { gql } from "@apollo/client";

export const CREATE_CHALLENGE_MUTATION = gql`
  mutation createChallenge($createChallengeDto: CreateChallengeDto!) {
    createChallenge(createChallengeDto: $createChallengeDto) {
      _id
      name
      participants {
        _id
      }
    }
  }
`;

export const UPDATE_CHALLENGE_MUTATION = gql`
  mutation updateChallenge($updateChallengeDto: UpdateChallengeDto!) {
    updateChallenge(updateChallengeDto: $updateChallengeDto) {
      _id
      name
    }
  }
`;
