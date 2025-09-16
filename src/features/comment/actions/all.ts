"use server";

import { CommentDatasourceGQL, CommentRepositoryImpl } from "..";


export async function allCommentAction({page = 0, limit = 50}, token: string = 'No Token') {
  const datasource = new CommentDatasourceGQL();
  const repo = new CommentRepositoryImpl(datasource, token);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allCommentAction:", e);
    return { error: true, msg: "No se pudo obtener los comentarios" };
  }
}
