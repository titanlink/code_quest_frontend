"use server";

import { revalidatePath } from "next/cache";
import { UserDatasourceGQL, UserRepositoryImpl } from "../infrastructure";
import { IUser } from "../domain";


export async function updateUserAction(data: IUser): Promise<any> {
  const datasource = new UserDatasourceGQL();
  const repo = new UserRepositoryImpl(datasource);
  throw new Error("serverAction => updateUserAction -> NOT IMPLEMENT")
  // try {
  //   const entity = new User(data.id, data.path, data.type, data.active);
  //   const response = await repo.update(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createUserAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
