import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "..";

export const repoConfig = (token: string) => {
  const datasource = new CategoryDatasourceGQL();
  return new CategoryRepositoryImpl(datasource, token);
}


