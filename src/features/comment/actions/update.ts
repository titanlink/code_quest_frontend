"use server";

import { revalidatePath } from "next/cache";
import { CommentDatasourceGQL, CommentRepositoryImpl } from "..";
import { IComment } from "../domain";


export async function updateCommentAction(data: IComment): Promise<any> {
  const datasource = new CommentDatasourceGQL();
  const repo = new CommentRepositoryImpl(datasource);
  throw new Error("serverAction => updateCommentAction -> NOT IMPLEMENT")
  // try {
  //   const entity = new Comment(data.id, data.path, data.type, data.active);
  //   const response = await repo.update(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createCommentAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
