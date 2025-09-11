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
  query findCategory($limit: Int, $offset: Int) {
    findCategory(limit: $limit, offset: $offset) {
      id
      name
      description
    }
  }
`;

export const createCategoryGQL = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(createCategoryInput: $input) {
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
    name
    description
    slug
    color
  }
}
`;