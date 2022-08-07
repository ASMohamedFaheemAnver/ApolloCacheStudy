import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($createUserDto: CreateUserDto!) {
    createUser(createUserDto: $createUserDto) {
      _id
      name
      age
    }
  }
`;

export const UPDATE_USERS_MUTATION = gql`
  mutation updateUser($updateUserDto: UpdateUserDto!) {
    updateUser(updateUserDto: $updateUserDto) {
      _id
      name
      age
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
    }
  }
`;
