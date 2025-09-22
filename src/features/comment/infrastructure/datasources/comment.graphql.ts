import { categoryGQLFields } from "@/features/category/domain/entities/category.entity";
import { postGQLFields } from "@/features/post/domain/entities/post.entity";
import { userGQLFields } from "@/features/user/domain/entities/user.entity";
import { gql } from "@apollo/client";
import {
  commentGQLFields,
  subCommentGQLFields,
} from "../../domain/entities/comment.entity";

export const allCommentGQL = gql`
  query allComment($limit: Int, $offset: Int) {
    allComment(limit: $limit, offset: $offset) {
      items {
        ${commentGQLFields}
        user { ${userGQLFields}}
        post {
          ${postGQLFields}
          category { ${categoryGQLFields} }
        }
        sub_comment {
          ${subCommentGQLFields}
          user { ${userGQLFields} }
          comment { ${commentGQLFields} }
        }
      }
      total
    }
  }
`;

export const findCommentGQL = gql`
  query Comment($commentId: Int!) {
    comment(id: $commentId) {
      ${commentGQLFields}
    }
  }
`;

export const createCommentGQL = gql`
  mutation CreateComment($input: CreateCommentInput!) {
  createComment(createCommentInput: $input) {
    ${commentGQLFields}
    user { ${userGQLFields}}
  }
}
`;
export const createSubCommentGQL = gql`
mutation CreateSubComment($input: CreateSubCommentInput!) {
  createSubComment(createSubCommentInput: $input) {
    ${subCommentGQLFields}
    user { ${userGQLFields}}
    comment { ${commentGQLFields} } 
  }
}
`;

export const updateCommentGQL = gql`
  mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(updateCommentInput: $input) {
    ${commentGQLFields}
  }
}
`;
export const removeCommentGQL = gql`
  mutation RemoveComment($removeCommentId: Int!) {
    removeComment(id: $removeCommentId) {
      error
      message
      statusCode
    }
  }
`;
