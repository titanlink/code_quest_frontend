"use server";

import { IComment } from "../domain";
import { repoConfig } from "./_repo-config";


export async function updateCommentAction(data: IComment, token: string): Promise<any> {
 const repo = repoConfig(token);
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
