"use server";

import { 
  BookMarkDatasourceGQL,
  BookMarkRepositoryImpl,
  IBookMark,
  ILike,
  IPost,
  LikeDatasourceGQL,
  LikeRepositoryImpl,
  PostDatasourceGQL,
  PostRepositoryImpl 
} from "..";
import { ResponsePropio } from "@/config";


export async function updatePostAction(entity: IPost, token: string): Promise<IPost | ResponsePropio> {
  let retorno : IPost | ResponsePropio = { error: true, msg: "Error desconocido" };
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource, token);
  try {
    retorno = await repo.update(entity);
  } catch (e) {
    console.error("Error en createPostAction:", e);
    if ('error' in retorno) retorno.msg = "No se pudo crear el entity"
  }finally {
    return retorno
  }
}

export async function updateLikeAction(entity: ILike, token: string): Promise<ILike | ResponsePropio> {
  let retorno : ILike | ResponsePropio = { error: true, msg: "Error desconocido" };
  const datasource = new LikeDatasourceGQL();
  const repo = new LikeRepositoryImpl(datasource, token);
  try {
    retorno = await repo.update(entity);
  } catch (e) {
    console.error("Error en createLikePostAction:", e);
    if ('error' in retorno) retorno.msg = "No se pudo crear el entity"
  }finally {
    return retorno
  }
}
export async function updateBookMarkAction(entity: IBookMark, token: string): Promise<IBookMark | ResponsePropio> {
  let retorno : IBookMark | ResponsePropio = { error: true, msg: "Error desconocido" };
  const datasource = new BookMarkDatasourceGQL();
  const repo = new BookMarkRepositoryImpl(datasource, token);
  try {
    retorno = await repo.update(entity);
  } catch (e) {
    console.error("Error en createBookMarkAction:", e);
    if ('error' in retorno) retorno.msg = "No se pudo crear el entity"
  }finally {
    return retorno
  }
}
