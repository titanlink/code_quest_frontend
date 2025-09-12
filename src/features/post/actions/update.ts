"use server";

import { revalidatePath } from "next/cache";
import { PostDatasourceGQL, PostRepositoryImpl } from "..";
import { IPost } from "../domain";


export async function updatePostAction(data: IPost): Promise<any> {
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);
  throw new Error("serverAction => updatePostAction -> NOT IMPLEMENT")
  // try {
  //   const entity = new Post(data.id, data.path, data.type, data.active);
  //   const response = await repo.update(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createPostAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
