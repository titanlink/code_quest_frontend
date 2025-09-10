"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "../infrastructure";


export async function allCategoryAction({page = 1, limit = 50}) : Promise<any> {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allCategoryAction:", e);
    return { error: true, msg: "No se pudo obtener los assets" };
  }
}
