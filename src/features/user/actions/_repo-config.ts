import { UserDatasourceGQL, UserRepositoryImpl } from "..";

export const repoConfig = (token: string) => {
  const datasource = new UserDatasourceGQL();
  return new UserRepositoryImpl(datasource, token);
}
