import { gql } from "@apollo/client";

export const allBookMarkGQL = gql`
  query allBookmark($limit: Int, $offset: Int) {
    allBookmark(limit: $limit, offset: $offset) {
    items { id
      id
      post {
        id
      }
      user {
        id
      }
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
      post {
        id
      }
      user {
        id
      }
      createAt
      updateAt
    }
  }
`;


export const createBookMarkGQL = gql`
  mutation CreateBookmark($input: CreateBookmarkInput!) {
  createBookmark(createBookmarkInput: $input) {
    id
    post {
      id
    }
    user {
      id
      email
      createAt
      updateAt
      avatar
      name
      role
    }
    createAt
    updateAt
  }
}
`;

export const updateBookMarkGQL = gql`
  mutation UpdateBookmark($input: UpdateBookmarkInput!) {
  updateBookmark(updateBookmarkInput: $input) {
    id
    post {
      id
    }
    user {
      id
    }
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