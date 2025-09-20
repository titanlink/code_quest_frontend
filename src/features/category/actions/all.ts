"use server";

import { repoConfig } from "./_repo-config";


export async function allCategoryAction({page = 0, limit = 50}, token: string = 'No Token') {
  const repo = repoConfig(token)

  try {
    const response = await repo.all(page, limit);
    console.log("🚀 ~ allCategoryAction ~ response:", response)
    return response;
  } catch (e) {
    console.error("Error en allCategoryAction:", e);
    return { error: true, msg: "No se pudo obtener los categorias" };
  }
}
