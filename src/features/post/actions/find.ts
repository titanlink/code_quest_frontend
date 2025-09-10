"use server";

import { PostDatasourceGQL, PostRepositoryImpl } from "../infrastructure";


export async function findPostAction(id: number) {
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);
  try {
    const response = await repo.findById(id);
    return { success: true, asset: response.data };
  } catch (e) {
    console.error("Error en findPostAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
  