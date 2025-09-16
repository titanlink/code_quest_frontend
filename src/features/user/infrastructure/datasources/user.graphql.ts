import { gql } from "@apollo/client";

export const allUserGQL = gql`
  query allCategories($limit: Int, $offset: Int) {
    allUser(limit: $limit, offset: $offset) {
      items {
        id
        name
        email
      }
      total
    }
  }
`;

export const findUserGQL = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      name
      email
    }
  }
`;

export const createUserGQL = gql`
  mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    name
    email
  }
}
`;

export const updateUserGQL = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(updateUserInput: $input) {
    id
    name
    email
  }
}
`;
export const removeUserGQL = gql`
  mutation RemoveUser($removeUserId: Int!) {
  removeUser(id: $removeUserId) {
    error
    message
    statusCode
  }
}
`;