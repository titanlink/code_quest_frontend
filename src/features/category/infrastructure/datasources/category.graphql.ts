import { gql } from "@apollo/client";

export const allCategoryGQL = gql`
  query allCategories($limit: Int, $offset: Int) {
    allCategory(limit: $limit, offset: $offset) {
      id
      name
      description
      color
      slug
    }
  }
`;

export const findCategoryGQL = gql`
  query Category($categoryId: Int!) {
    category(id: $categoryId) {
      id
        name
        description
        color
        slug
    }
  }
`;

export const createCategoryGQL = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(createCategoryInput: $input) {
    id
    name
    description
    slug
    color
  }
}
`;

export const updateCategoryGQL = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $input) {
    id
    name
    description
    slug
    color
  }
}
`;
export const removeCategoryGQL = gql`
  mutation RemoveCategory($removeCategoryId: Int!) {
  removeCategory(id: $removeCategoryId) {
    error
    message
    statusCode
  }
}
`;