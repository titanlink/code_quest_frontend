"use server";

import { ResponsePropio } from "@/config";
import { CategoryDatasourceGQL, CategoryRepositoryImpl, ICategory } from "..";


export async function deleteCategoryAction(id: string, token: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource, token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deleteCategoryAction:"
    console.error(error, e);
    retorno.msg = error
  }finally {
    return retorno
  }
}
  