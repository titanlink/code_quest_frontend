import { CommentDatasourceGQL } from "../infrastructure/datasources/comment.datasource_gql_impl";
import { CommentRepositoryImpl } from "../infrastructure/repositories/comment.respository_impl";

export const repoConfig = (token: string) => {
  const datasource = new CommentDatasourceGQL();
  return new CommentRepositoryImpl(datasource, token);
};
