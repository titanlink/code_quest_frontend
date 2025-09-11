"use server";

import { CommentDatasourceGQL, CommentRepositoryImpl } from "../infrastructure";


export async function findCommentAction(id: string) {
  const datasource = new CommentDatasourceGQL();
  const repo = new CommentRepositoryImpl(datasource);
  try {
    const response = await repo.findById(id);
    return response;
  } catch (e) {
    console.error("Error en findCommentAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
  