"use server";

import { UserDatasourceGQL, UserRepositoryImpl } from "../infrastructure";



export async function createUserAction(data: any ) {
  const datasource = new UserDatasourceGQL();
  const repo = new UserRepositoryImpl(datasource);
  throw new Error("serverAction => createUserAction -> NOT IMPLEMENT")
  // const entity = new User(0, data.path, data.type, true);

  // try {
  //   const response = await repo.create(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createUserAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
