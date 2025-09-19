"use server";

import { repoConfig } from "./_repo-config";


export async function deleteUserAction(id: string, token:string) : Promise<any> {
  // throw new Error("serverAction => deleteUserAction -> NOT IMPLEMENT")
  const repo = repoConfig(token)

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deleteUserAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  