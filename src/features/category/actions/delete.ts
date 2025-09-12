"use server";

import { ResponsePropio } from "@/config";
import { CategoryDatasourceGQL, CategoryRepositoryImpl, ICategory } from "..";


export async function deleteCategoryAction(id: string) : Promise<ResponsePropio> {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);

  try {
    return await repo.delete(id);
  } catch (e) {
    console.error("Error en serverAction => deleteCategoryAction:", e);
    return { error: true, msg: "No se pudo eliminar el asset" };
  }
}
  