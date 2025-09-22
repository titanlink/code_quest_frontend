import { BookMarkDatasourceGQL } from "../infrastructure/datasources/bookmark.datasource_gql_impl";
import { LikeDatasourceGQL } from "../infrastructure/datasources/like.datasource_gql_impl";
import { PostDatasourceGQL } from "../infrastructure/datasources/post.datasource_gql_impl";
import { BookMarkRepositoryImpl } from "../infrastructure/repositories/bookmark.respository_impl";
import { LikeRepositoryImpl } from "../infrastructure/repositories/like.respository_impl";
import { PostRepositoryImpl } from "../infrastructure/repositories/post.respository_impl";

export const repoConfig = (token: string) => {
  const datasource = new PostDatasourceGQL();
  return new PostRepositoryImpl(datasource, token);
};

export const repoConfigBook = (token: string) => {
  const datasource = new BookMarkDatasourceGQL();
  return new BookMarkRepositoryImpl(datasource, token);
};

export const repoConfigLike = (token: string) => {
  const datasource = new LikeDatasourceGQL();
  return new LikeRepositoryImpl(datasource, token);
};
