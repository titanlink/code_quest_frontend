"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "..";
import { ICategory } from "../domain";
import { ResponsePropio } from "@/config";


export async function updateCategoryAction(entity: ICategory): Promise<ICategory | ResponsePropio> {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);
  try {
    return await repo.update(entity);
  } catch (e) {
    console.error("Error en createCategoryAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
