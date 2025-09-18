"use server";

import { ResponsePropio } from "@/config";
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


export async function allPostAction({page = 0, limit = 50}, token: string = 'No Token') {
  let retorno: ResponsePropio = { msg: 'Error desconocido en allPostAction', error: true }
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource, token);

  try {
    const response = await repo.all(page, limit);
    retorno = response
  } catch (e) {
    console.error("Error en allPostAction:", e);
    // return { error: true, msg: "No se pudo obtener los post" };
  } finally {
    return retorno
  }
}

export async function allLikeAction({page = 0, limit = 50}, token: string = 'No Token') : Promise<ILike[]> {
  const datasource = new LikeDatasourceGQL();
  const repo = new LikeRepositoryImpl(datasource, token);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allLikeAction:", e);
    // return { error: true, msg: "No se pudo obtener los likes" };
    return []
  }
}

export async function allBookMarkAction({page = 0, limit = 50}, token: string = 'No Token') : Promise<IBookMark[]> {
  const datasource = new BookMarkDatasourceGQL();
  const repo = new BookMarkRepositoryImpl(datasource, token);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allBookMarkAction:", e);
    // return { error: true, msg: "No se pudo obtener los likes" };
    return []
  }
}
