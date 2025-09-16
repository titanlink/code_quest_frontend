"use server";

import { ResponsePropio } from "@/config";
import { CategoryDatasourceGQL, CategoryRepositoryImpl, ICategory } from "..";



export async function createCategoryAction(data: ICategory, token: string) : Promise<ICategory | ResponsePropio> {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource, token);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createCategoryAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
