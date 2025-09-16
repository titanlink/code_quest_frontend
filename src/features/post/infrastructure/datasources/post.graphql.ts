import { gql } from "@apollo/client";

export const allPostGQL = gql`
  query allPosts($limit: Int, $offset: Int) {
    allPost(limit: $limit, offset: $offset) {
    items { id
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
    },
    total
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
export const findPostBySlugGQL = gql`
  query Post($slug: String!) {
    postBySlug(slug: $slug) {
      item {
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
        comment {
          id
          content
          sub_comment {
            id 
            content
          }
        }
      }
      is_like

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