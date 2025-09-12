"use server";

import { PostDatasourceGQL, PostRepositoryImpl } from "..";



export async function createPostAction(data: any ) {
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);
  throw new Error("serverAction => createPostAction -> NOT IMPLEMENT")
  // const entity = new Post(0, data.path, data.type, true);

  // try {
  //   const response = await repo.create(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createPostAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
