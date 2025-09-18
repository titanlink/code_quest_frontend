"use server";

import { ResponsePropio } from "@/config";
import { 
  BookMarkDatasourceGQL,
  BookMarkRepositoryImpl,
  LikeDatasourceGQL,
  LikeRepositoryImpl,
  PostDatasourceGQL,
  PostRepositoryImpl 
} from "..";


export async function deletePostAction(id: string, token: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource, token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deletePostAction:"
    console.error(error, e);
    retorno.msg = error
  }finally {
    return retorno
  }
}

export async function deleteLikeAction(id: string, token: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const datasource = new LikeDatasourceGQL();
  const repo = new LikeRepositoryImpl(datasource, token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deleteLikeAction:"
    console.error(error, e);
    retorno.msg = error
  }finally {
    return retorno
  }
}

export async function deleteBookMarkAction(id: string, token: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const datasource = new BookMarkDatasourceGQL();
  const repo = new BookMarkRepositoryImpl(datasource, token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deleteBookMarkAction:"
    console.error(error, e);
    retorno.msg = error
  }finally {
    return retorno
  }
}