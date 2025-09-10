"use server";

import { revalidatePath } from "next/cache";
import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "../infrastructure";
import { ICategory } from "../domain";


export async function updateCategoryAction(data: ICategory): Promise<any> {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);
  throw new Error("serverAction => updateCategoryAction -> NOT IMPLEMENT")
  // try {
  //   const entity = new Category(data.id, data.path, data.type, data.active);
  //   const response = await repo.update(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createCategoryAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
