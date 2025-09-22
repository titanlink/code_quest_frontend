"use server";

import { ResponsePropio } from "@/config/response-propio";
import { repoConfig } from "./_repo-config";

export async function deleteCategoryAction(
  id: string,
  token: string
): Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: "Error desconocido" };
  const repo = repoConfig(token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deleteCategoryAction:";
    console.error(error, e);
    retorno.msg = error;
  } finally {
    return retorno;
  }
}
