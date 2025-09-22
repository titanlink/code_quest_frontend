import { gql } from "@apollo/client";
import { categoryGQLFields } from "../../domain/entities/category.entity";

export const allCategoryGQL = gql`
  query allCategories($limit: Int, $offset: Int) {
    allCategory(limit: $limit, offset: $offset) {
      items {
        ${categoryGQLFields}
      }
      total
    }
  }
`;

export const findCategoryGQL = gql`
  query Category($categoryId: Int!) {
    category(id: $categoryId) {
      ${categoryGQLFields}
    }
  }
`;

export const createCategoryGQL = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(createCategoryInput: $input) {
    ${categoryGQLFields}
  }
}
`;

export const updateCategoryGQL = gql`
  mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $input) {
    ${categoryGQLFields}
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
