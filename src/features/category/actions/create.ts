"use server";

import { ResponsePropio } from "@/config";
import { CategoryDatasourceGQL, CategoryRepositoryImpl, ICategory } from "..";



export async function createCategoryAction(data: ICategory) : Promise<ICategory | ResponsePropio> {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createCategoryAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
