"use server";

import { CommentDatasourceGQL, CommentRepositoryImpl } from "../infrastructure";



export async function createCommentAction(data: any ) {
  const datasource = new CommentDatasourceGQL();
  const repo = new CommentRepositoryImpl(datasource);
  throw new Error("serverAction => createCommentAction -> NOT IMPLEMENT")
  // const entity = new Comment(0, data.path, data.type, true);

  // try {
  //   const response = await repo.create(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createCommentAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
