import { gql } from "@apollo/client";

export const allCommentGQL = gql`
  query allComment($limit: Int, $offset: Int) {
    allComment(limit: $limit, offset: $offset) {
      items {
        id
        content
        user {
          id
          name
          email
        }
        # post {
        #   id
        #   category {
        #     id
        #     name
        #     description
        #     postCount
        #     color
        #     slug
        #   }
        # }
        # sub_comment {
        #   id 
        #   content
        # }
        createAt
        updateAt
      }
      total
    }
  }
`;

export const findCommentGQL = gql`
  query Comment($commentId: Int!) {
    comment(id: $commentId) {
      id
      content
      postId
      authorId
      author
      parentId
      # sub_comment
      createAt
      updateAt
    }
  }
`;

export const createCommentGQL = gql`
  mutation CreateComment($input: CreateCommentInput!) {
  createComment(createCommentInput: $input) {
    id
    content
    # parent_id
  }
}
`;

export const updateCommentGQL = gql`
  mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(updateCommentInput: $input) {
    id
    content
    postId
    authorId
    author
    parentId
    # sub_comment
    createdAt
    updatedAt
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