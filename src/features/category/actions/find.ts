"use server";

import { ResponsePropio } from "@/config";
import { CategoryDatasourceGQL, CategoryRepositoryImpl, ICategory } from "..";


export async function findCategoryAction(id: string): Promise<ICategory | ResponsePropio> {
  let retorno: ICategory | ResponsePropio = { error: true, msg: 'Error desconocido'}
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);
  try {
    retorno = await repo.findById(id);
  } catch (e) {
    console.error("Error en findCategoryAction:", e);
  }finally{
    return retorno
  }
}
  