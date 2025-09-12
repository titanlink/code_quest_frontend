"use server";

import { PostDatasourceGQL, PostRepositoryImpl } from "..";


export async function deletePostAction(id: string) : Promise<any> {
  // throw new Error("serverAction => deletePostAction -> NOT IMPLEMENT")
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deletePostAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  