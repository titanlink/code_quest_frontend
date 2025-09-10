"use server";

import { CommentDatasourceGQL, CommentRepositoryImpl } from "../infrastructure";


export async function deleteCommentAction(id: number) : Promise<any> {
  // throw new Error("serverAction => deleteCommentAction -> NOT IMPLEMENT")
  const datasource = new CommentDatasourceGQL();
  const repo = new CommentRepositoryImpl(datasource);

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deleteCommentAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  