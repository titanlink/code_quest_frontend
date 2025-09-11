"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "../infrastructure";


export async function deleteCategoryAction(id: string) : Promise<any> {
  // throw new Error("serverAction => deleteCategoryAction -> NOT IMPLEMENT")
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deleteCategoryAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  