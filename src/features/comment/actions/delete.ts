"use server";

import { repoConfig } from "./_repo-config";


export async function deleteCommentAction(id: string, token: string) : Promise<any> {
  // throw new Error("serverAction => deleteCommentAction -> NOT IMPLEMENT")
 const repo = repoConfig(token);

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deleteCommentAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  