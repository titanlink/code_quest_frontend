"use server";

import { IPost, PostDatasourceGQL, PostRepositoryImpl  } from "..";


export async function allPostAction({page = 0, limit = 50}) : Promise<IPost[]> {
  const datasource = new PostDatasourceGQL();
  const repo = new PostRepositoryImpl(datasource);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allPostAction:", e);
    // return { error: true, msg: "No se pudo obtener los assets" };
    return []
  }
}
