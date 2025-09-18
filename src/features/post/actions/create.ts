"use server";

import { ResponsePropio } from "@/config";
import { 
  PostDatasourceGQL,
  PostRepositoryImpl,
  IPost,
  LikeDatasourceGQL,
  ILike,
  LikeRepositoryImpl,
  BookMarkDatasourceGQL,
  IBookMark, 
  BookMarkRepositoryImpl
} from "..";



export async function createPostAction(data: IPost, token: string) : Promise<IPost | ResponsePropio> {
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource, token);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createPostAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}

export async function createLikePostAction(data: ILike, token: string) : Promise<ILike | ResponsePropio> {
  const datasource = new LikeDatasourceGQL();
  const repo = new LikeRepositoryImpl(datasource, token);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createLikePostAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}

export async function createBookMarkAction(data: IBookMark, token: string) : Promise<IBookMark | ResponsePropio> {
  const datasource = new BookMarkDatasourceGQL();
  const repo = new BookMarkRepositoryImpl(datasource, token);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createBookMarkAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
