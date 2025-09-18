import { gql } from "@apollo/client";

export const allUserGQL = gql`
  query allUsers($limit: Int, $offset: Int) {
    allUser(limit: $limit, offset: $offset) {
      items {
        id
        name
        email
        role
        provider
        avatar
        createAt
        updateAt
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
      role
      avatar
      provider
      createAt
      updateAt
    }
  }
`;

export const createUserGQL = gql`
  mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    id
    name
    email
    role
  }
}
`;

export const updateUserGQL = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(updateUserInput: $input) {
    id
    name
    email
    role
    avatar
    provider
    createAt
    updateAt
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