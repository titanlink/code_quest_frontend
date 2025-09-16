"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "..";


export async function allCategoryAction({page = 0, limit = 50}, token: string = 'No Token') {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource, token);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allCategoryAction:", e);
    return { error: true, msg: "No se pudo obtener los categorias" };
  }
}
