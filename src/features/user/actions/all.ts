"use server";

import { UserDatasourceGQL, UserRepositoryImpl } from "../infrastructure";


export async function allUserAction({page = 1, limit = 50}) : Promise<any> {
  const datasource = new UserDatasourceGQL();
  const repo = new UserRepositoryImpl(datasource);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allUserAction:", e);
    return { error: true, msg: "No se pudo obtener los assets" };
  }
}
