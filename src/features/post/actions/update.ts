"use server";

import { PostDatasourceGQL, PostRepositoryImpl } from "..";
import { IPost } from "../domain";
import { ResponsePropio } from "@/config";


export async function updatePostAction(entity: IPost): Promise<IPost | ResponsePropio> {
  let retorno : IPost | ResponsePropio = { error: true, msg: "Error desconocido" };
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);
  try {
    retorno = await repo.update(entity);
  } catch (e) {
    console.error("Error en createPostAction:", e);
    if ('error' in retorno) retorno.msg = "No se pudo crear el entity"
  }finally {
    return retorno
  }
}
