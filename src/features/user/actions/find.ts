"use server";

import { UserDatasourceGQL, UserRepositoryImpl } from "../infrastructure";


export async function findUserAction(id: string) {
  const datasource = new UserDatasourceGQL();
  const repo = new UserRepositoryImpl(datasource);
  try {
    const response = await repo.findById(id);
    return { success: true, asset: response.data };
  } catch (e) {
    console.error("Error en findUserAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
  