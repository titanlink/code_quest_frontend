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
      total_view
      viewUserCount
      likesCount
      commentCount
      tags
      createAt
      updateAt

      user {
        id
        email
        createAt
        updateAt
        avatar
        name
        role
      }

      comment {
        id
        content
        sub_comment {
          id 
          content
        }
      }

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
      total_view
      viewUserCount
      published
      featured
      likesCount
      commentCount
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
        total_view
        viewUserCount
        coverImage
        published
        featured
        likesCount
        commentCount
        tags
        createAt
        updateAt

        bookmark_post {
          id
          user {
            id
            email
            name
          }
          post {
            id
          }
          createAt
          updateAt
        }

        like_post {
          id
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
      is_bookmark
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