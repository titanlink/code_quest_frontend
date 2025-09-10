"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "../infrastructure";


export async function findAssetAction(id: number) {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);
  try {
    const response = await repo.findById(id);
    return { success: true, asset: response.data };
  } catch (e) {
    console.error("Error en findAssetAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
  