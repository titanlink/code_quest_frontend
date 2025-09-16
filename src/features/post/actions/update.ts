"use server";

import { LikeDatasourceGQL, LikeRepositoryImpl, PostDatasourceGQL, PostRepositoryImpl } from "..";
import { ILike, IPost } from "../domain";
import { ResponsePropio } from "@/config";


export async function updatePostAction(entity: IPost, token: string): Promise<IPost | ResponsePropio> {
  console.log("🚀 ~ (PASO 1) updatePostAction ~ updatePostAction:")
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
  console.log("🚀 ~ (PASO 1) updateLikeAction ~ updateLikeAction:")
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
