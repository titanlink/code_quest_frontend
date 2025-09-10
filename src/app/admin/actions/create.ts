"use server";

import { CategoryDatasourceGQL, CategoryRepositoryImpl } from "../infrastructure";



export async function createCategoryAction(data: any ) {
  const datasource = new CategoryDatasourceGQL();
  const repo = new CategoryRepositoryImpl(datasource);
  throw new Error("serverAction => createCategoryAction -> NOT IMPLEMENT")
  // const entity = new Category(0, data.path, data.type, true);

  // try {
  //   const response = await repo.create(entity);
  //   revalidatePath("/entity");
  //   return response
  // } catch (e) {
  //   console.error("Error en createCategoryAction:", e);
  //   return { error: true, msg: "No se pudo crear el entity" };
  // }
}
