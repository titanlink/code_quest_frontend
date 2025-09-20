import { gql } from "@apollo/client";

export const allUserGQL = gql`
  query allUsers($limit: Int, $offset: Int) {
    allUser(limit: $limit, offset: $offset) {
      items {
        id
        name
        email
        role
        about
        twitter_url
        instagram_url
        provider
        avatar
        createAt
        updateAt
      }
      total
    }
  }
`;

export const dashboardGQL = gql`
  query TotalResponse {
  totalResponse {
    total_post
    total_post_published
    total_category
    total_user
    total_user_admin
    total_comment
    total_sub_comment
    total_view
  }
}
`;
export const checkProfileGQL = gql`
  query CheckProfile {
    checkProfile {
      id
      provider
      providerId
      role
      about
      twitter_url
      instagram_url
      avatar
      name
      email
      createAt
      updateAt
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
      about
      twitter_url
      instagram_url
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
    about
    twitter_url
    instagram_url
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