import { UserDatasourceGQL } from "../infrastructure/datasources/user.datasource_gql_impl";
import { UserRepositoryImpl } from "../infrastructure/repositories/user.respository_impl";

export const repoConfig = (token: string) => {
  const datasource = new UserDatasourceGQL();
  return new UserRepositoryImpl(datasource, token);
};
