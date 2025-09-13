"use server";

import { ResponsePropio } from "@/config";
import { PostDatasourceGQL, PostRepositoryImpl } from "..";


export async function deletePostAction(id: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);

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
  