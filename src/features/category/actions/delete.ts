"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "..";


export async function deleteCategoryAction(id: string) : Promise<any> {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deleteCategoryAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  