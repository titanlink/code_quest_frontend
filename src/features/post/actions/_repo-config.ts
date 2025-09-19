import { BookMarkDatasourceGQL,
  BookMarkRepositoryImpl,
  LikeDatasourceGQL,
  LikeRepositoryImpl,
  PostDatasourceGQL,
  PostRepositoryImpl 
} from "..";

export const repoConfig = (token: string) => {
  const datasource = new PostDatasourceGQL();
  return new PostRepositoryImpl(datasource, token);
}

export const repoConfigBook = (token: string) => {
  const datasource = new BookMarkDatasourceGQL();
  return new BookMarkRepositoryImpl(datasource, token);
}

export const repoConfigLike = (token: string) => {
  const datasource = new LikeDatasourceGQL();
  return new LikeRepositoryImpl(datasource, token);
}

