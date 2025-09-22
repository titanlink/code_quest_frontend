import { gql } from "@apollo/client";
import { userGQLFields } from "../../domain/entities/user.entity";
import { bookMarkGQLFields } from "@/features/post/domain/entities/bookmark.entity";
import { postGQLFields } from "@/features/post/domain/entities/post.entity";
import { categoryGQLFields } from "@/features/category/domain/entities/category.entity";

export const allUserGQL = gql`
  query allUsers($limit: Int, $offset: Int) {
    allUser(limit: $limit, offset: $offset) {
      items {
        ${userGQLFields}
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
      ${userGQLFields}
      bookmark_post {
        ${bookMarkGQLFields}
        user { ${userGQLFields} }
        post { 
          ${postGQLFields} 
          category { ${categoryGQLFields} }
        }
      }

    }
  }
`;
export const findUserGQL = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      ${userGQLFields}
    }
  }
`;

export const createUserGQL = gql`
  mutation CreateUser($input: CreateUserInput!) {
  createUser(createUserInput: $input) {
    ${userGQLFields}
  }
}
`;

export const updateUserGQL = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(updateUserInput: $input) {
    ${userGQLFields}
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
