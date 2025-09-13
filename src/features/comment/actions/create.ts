"use server";

import { ResponsePropio } from "@/config";
import { CommentDatasourceGQL, CommentRepositoryImpl, IComment } from "..";



export async function createCommentAction(data: IComment) : Promise<IComment | ResponsePropio> {
  const datasource = new CommentDatasourceGQL();
  const repo = new CommentRepositoryImpl(datasource);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createCommentAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
