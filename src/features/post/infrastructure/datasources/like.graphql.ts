import { gql } from "@apollo/client";

export const allLikeGQL = gql`
  query allLike($limit: Int, $offset: Int) {
    allLike(limit: $limit, offset: $offset) {
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

export const findLikeGQL = gql`
  query Like($postId: Int!) {
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


export const createLikePostGQL = gql`
  mutation CreateLike($input: CreateLikeInput!) {
  createLikePost(createLikePostInput: $input) {
    id
    post {
      id
    }
    createAt
    updateAt
  }
}
`;

export const updateLikeGQL = gql`
  mutation UpdateLike($input: UpdateLikeInput!) {
  updateLike(updateLikeInput: $input) {
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
export const removeLikePostGQL = gql`
  mutation RemoveLike($removeLikePostId: Int!) {
  removeLikePost(id: $removeLikePostId) {
    error
    message
    statusCode
  }
}
`;