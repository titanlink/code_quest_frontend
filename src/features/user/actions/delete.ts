"use server";

import { UserDatasourceGQL, UserRepositoryImpl } from "../infrastructure";


export async function deleteUserAction(id: number) : Promise<any> {
  // throw new Error("serverAction => deleteUserAction -> NOT IMPLEMENT")
  const datasource = new UserDatasourceGQL();
  const repo = new UserRepositoryImpl(datasource);

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deleteUserAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  