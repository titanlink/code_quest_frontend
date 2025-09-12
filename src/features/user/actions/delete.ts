"use server";

import { UserDatasourceGQL, UserRepositoryImpl } from "..";


export async function deleteUserAction(id: string) : Promise<any> {
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
  