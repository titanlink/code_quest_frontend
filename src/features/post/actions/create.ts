"use server";

import { ResponsePropio } from "@/config";
import { PostDatasourceGQL, PostRepositoryImpl, IPost } from "..";



export async function createPostAction(data: IPost) : Promise<IPost | ResponsePropio> {
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createPostAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
