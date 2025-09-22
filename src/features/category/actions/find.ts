"use server";

import { ResponsePropio } from "@/config/response-propio";
import { ICategory } from "../domain/entities/category.entity";
import { repoConfig } from "./_repo-config";

export async function findCategoryAction(
  id: string,
  token: string
): Promise<ICategory | ResponsePropio> {
  let retorno: ICategory | ResponsePropio = {
    error: true,
    msg: "Error desconocido",
  };
  const repo = repoConfig(token);
  try {
    retorno = await repo.findById(id);
  } catch (e) {
    console.error("Error en findCategoryAction:", e);
  } finally {
    return retorno;
  }
}
