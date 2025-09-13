"use server";

import { ResponsePropio } from "@/config";
import { PostDatasourceGQL, PostRepositoryImpl, IPost } from "..";


export async function findPostAction(id: string): Promise<IPost | ResponsePropio> {
  let retorno: IPost | ResponsePropio = { error: true, msg: 'Error desconocido'}
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);
  try {
    retorno = await repo.findById(id);
  } catch (e) {
    console.error("Error en findPostAction:", e);
  }finally{
    return retorno
  }
}
  