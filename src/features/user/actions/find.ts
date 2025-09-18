"use server";

import { UserDatasourceGQL, UserRepositoryImpl } from "..";


export async function findUserAction(id: string, token: string) {
  const datasource = new UserDatasourceGQL();
  const repo = new UserRepositoryImpl(datasource, token);
  try {
    const response = await repo.findById(id);
    return response
  } catch (e) {
    console.error("Error en findUserAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
  