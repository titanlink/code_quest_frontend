import { gql } from "@apollo/client";

export const allCategoryGQL = gql`
  query allCategories($limit: Int, $page: Int) {
    allCategory(limit: $limit, page: $page) {
      id
      name
      description
    }
  }
`;

export const findCategoryGQL = gql`
  query findCategory($limit: Int, $page: Int) {
    findCategory(limit: $limit, page: $page) {
      id
      name
      description
    }
  }
`;

export const createCategoryGQL = gql`
  query createCategory($limit: Int, $page: Int) {
    createCategory(limit: $limit, page: $page) {
      id
      name
      description
    }
  }
`;

export const updateCategoryGQL = gql`
  query updateCategory($limit: Int, $page: Int) {
    updateCategory(limit: $limit, page: $page) {
      id
      name
      description
    }
  }
`;