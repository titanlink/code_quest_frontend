"use server";

import { CommentDatasourceGQL, CommentRepositoryImpl } from "../infrastructure";


export async function allCommentAction({page = 1, limit = 50}) : Promise<any> {
  const datasource = new CommentDatasourceGQL();
  const repo = new CommentRepositoryImpl(datasource);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allCommentAction:", e);
    return { error: true, msg: "No se pudo obtener los assets" };
  }
}
