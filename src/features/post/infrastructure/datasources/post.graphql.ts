import { gql } from "@apollo/client";

export const allPostGQL = gql`
  query allCategories($limit: Int, $offset: Int) {
    allPost(limit: $limit, offset: $offset) {
      id
      title
      slug
      content
      excerpt
      coverImage
      published
      featured
      likesCount
      tags
      createAt
      updateAt

      category {
        id
        name
        slug
        description
        color
      }

    }
  }
`;

export const findPostGQL = gql`
  query Post($postId: Int!) {
    post(id: $postId) {
      id
      title
      slug
      content
      excerpt
      coverImage
      published
      featured
      likesCount
      tags
      createAt
      updateAt

      category {
        id
        name
        slug
        description
        color
      }

    }
  }
`;

export const createPostGQL = gql`
  mutation CreatePost($input: CreatePostInput!) {
  createPost(createPostInput: $input) {
    id
    title
    slug
    content
    excerpt
    coverImage
    published
    featured
    tags
    category {
      id
    }
  }
}
`;

export const updatePostGQL = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(updatePostInput: $input) {
    id
    title
    slug
    content
    excerpt
    coverImage
    published
    featured
    tags
    category {
      id
    }
  }
}
`;
export const removePostGQL = gql`
  mutation RemovePost($removePostId: Int!) {
  removePost(id: $removePostId) {
    error
    message
    statusCode
  }
}
`;