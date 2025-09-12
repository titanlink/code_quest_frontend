"use server";

import { UserDatasourceGQL, UserRepositoryImpl } from "..";


export async function allUserAction({page = 0, limit = 50}) : Promise<any> {
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
