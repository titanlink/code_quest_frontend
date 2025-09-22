import { categoryGQLFields } from "@/features/category/domain/entities/category.entity";
import { userGQLFields } from "@/features/user/domain/entities/user.entity";
import { gql } from "@apollo/client";
import { bookMarkGQLFields } from "../../domain/entities/bookmark.entity";
import { postGQLFields } from "../../domain/entities/post.entity";

export const allPostGQL = gql`
    query AllPost($idCategory: Int, $limit: Int, $offset: Int) {
    allPost(id_category: $idCategory, limit: $limit, offset: $offset) {
    items {
      ${postGQLFields}
      user { ${userGQLFields} }
      category { ${categoryGQLFields} }
    },
    total
    }
  }
`;

export const findPostGQL = gql`
  query Post($postId: Int!) {
    post(id: $postId) {
      ${postGQLFields}
      category { ${categoryGQLFields} }

    }
  }
`;
export const findPostBySlugGQL = gql`
  query Post($slug: String!) {
    postBySlug(slug: $slug) {
      is_like
      item {
        ${postGQLFields}

        bookmark_post {
          ${bookMarkGQLFields}
          user { ${userGQLFields} }
          post { ${postGQLFields} }
        }

        like_post {
          id
          user { ${userGQLFields} }
          createAt
        }

        user { ${userGQLFields} }

        category { ${categoryGQLFields} }
        comment {
          id
          likesCount
          commentCount
          content
          createAt
          updateAt
          user { ${userGQLFields} }
          sub_comment {
            id
            content
            likesCount
            createAt
            updateAt
            user { ${userGQLFields} }
            comment {
              id
              content
            }
          }
        }
      }
      is_bookmark
    }
  }
`;

export const createPostGQL = gql`
  mutation CreatePost($input: CreatePostInput!) {
  createPost(createPostInput: $input) {
    ${postGQLFields}
    category { ${categoryGQLFields} }
  }
}
`;

export const updatePostGQL = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(updatePostInput: $input) {
    ${postGQLFields}
    category { ${categoryGQLFields} }
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
