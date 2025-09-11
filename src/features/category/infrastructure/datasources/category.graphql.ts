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
  query createCategory($limit: Int, $offset: Int) {
    createCategory(limit: $limit, offset: $offset) {
      id
      name
      description
    }
  }
`;

export const updateCategoryGQL = gql`
  query updateCategory($limit: Int, $offset: Int) {
    updateCategory(limit: $limit, offset: $offset) {
      id
      name
      description
    }
  }
`;