"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "..";
import { ICategory } from "../domain";
import { ResponsePropio } from "@/config";


export async function updateCategoryAction(entity: ICategory): Promise<ICategory | ResponsePropio> {
  let retorno : ICategory | ResponsePropio = { error: true, msg: "Error desconocido" };
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);
  try {
    retorno = await repo.update(entity);
  } catch (e) {
    console.error("Error en createCategoryAction:", e);
    if ('error' in retorno) retorno.msg = "No se pudo crear el entity"
  }finally {
    return retorno
  }
}
