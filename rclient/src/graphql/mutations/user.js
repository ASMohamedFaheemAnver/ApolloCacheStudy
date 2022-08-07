import { gql } from "@apollo/client";

export const CREATE_USERS_MUTATION = gql`
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
