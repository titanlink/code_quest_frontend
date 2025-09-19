import { CommentDatasourceGQL, CommentRepositoryImpl } from "..";

export const repoConfig = (token: string) => {
  const datasource = new CommentDatasourceGQL();
  return new CommentRepositoryImpl(datasource, token);
}


