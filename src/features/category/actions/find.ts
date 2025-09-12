"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "..";


export async function findCategoryAction(id: string) {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);
  try {
    const response = await repo.findById(id);
    return { success: true, data: response.data };
  } catch (e) {
    console.error("Error en findCategoryAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
  