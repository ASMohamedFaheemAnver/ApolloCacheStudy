import { gql } from "@apollo/client";

export const CREATE_USERS_MUTATION = gql`
  mutation createUser($createUserDto: CreateUserDto) {
    createUser(createUserDto: $createUserDto) {
      name
      age
    }
  }
`;
