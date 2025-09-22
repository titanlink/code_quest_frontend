import { CategoryDatasourceGQL } from "../infrastructure/datasources/category.datasource_gql_impl";
import { CategoryRepositoryImpl } from "../infrastructure/repositories/category.respository_impl";

export const repoConfig = (token: string) => {
  const datasource = new CategoryDatasourceGQL();
  return new CategoryRepositoryImpl(datasource, token);
};
