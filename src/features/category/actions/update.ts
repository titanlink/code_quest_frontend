"use server";

import { ICategory } from "..";
import { ResponsePropio } from "@/config";
import { repoConfig } from "./_repo-config";


export async function updateCategoryAction(entity: ICategory, token: string): Promise<ICategory | ResponsePropio> {
  let retorno : ICategory | ResponsePropio = { error: true, msg: "Error desconocido" };
  const repo = repoConfig(token)
  try {
    retorno = await repo.update(entity);
  } catch (e) {
    console.error("Error en createCategoryAction:", e);
    if ('error' in retorno) retorno.msg = "No se pudo crear el entity"
  }finally {
    return retorno
  }
}
