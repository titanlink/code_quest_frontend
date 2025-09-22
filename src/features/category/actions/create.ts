"use server";

import { ResponsePropio } from "@/config/response-propio";
import { ICategory } from "../domain/entities/category.entity";
import { repoConfig } from "./_repo-config";

export async function createCategoryAction(
  data: ICategory,
  token: string
): Promise<ICategory | ResponsePropio> {
  const repo = repoConfig(token);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createCategoryAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
