import { gql } from "@apollo/client";
import { postGQLFields } from "../../domain/entities/post.entity";
import { userGQLFields } from "@/features/user/domain/entities/user.entity";

export const allBookMarkGQL = gql`
  query allBookmark($limit: Int, $offset: Int) {
    allBookmark(limit: $limit, offset: $offset) {
    items {
      id
      post { ${postGQLFields} }
      user { ${userGQLFields} }
      createAt
      updateAt
    },
    total
    }
  }
`;

export const findBookMarkGQL = gql`
  query Bookmark($postId: Int!) {
    post(id: $postId) {
      id
      post { ${postGQLFields} }
      user { ${userGQLFields} }
      createAt
      updateAt
    }
  }
`;

export const createBookMarkGQL = gql`
  mutation CreateBookmark($input: CreateBookmarkInput!) {
  createBookmark(createBookmarkInput: $input) {
    id
    post { ${postGQLFields} }
    user { ${userGQLFields} }
    createAt
    updateAt
  }
}
`;

export const updateBookMarkGQL = gql`
  mutation UpdateBookmark($input: UpdateBookmarkInput!) {
  updateBookmark(updateBookmarkInput: $input) {
    id
    post { ${postGQLFields} }
    user { ${userGQLFields} }
    createAt
    updateAt
  }
}
`;
export const removeBookMarkPostGQL = gql`
  mutation RemoveBookmark($removeBookmarkId: Int!) {
    removeBookmark(id: $removeBookmarkId) {
      error
      message
      statusCode
    }
  }
`;
