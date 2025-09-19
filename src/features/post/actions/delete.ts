"use server";

import { ResponsePropio } from "@/config";
import { repoConfig, repoConfigBook, repoConfigLike } from "./_repo-config";


export async function deletePostAction(id: string, token: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const repo = repoConfig(token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deletePostAction:"
    console.error(error, e);
    retorno.msg = error
  }finally {
    return retorno
  }
}

export async function deleteLikeAction(id: string, token: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const repo = repoConfigLike(token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deleteLikeAction:"
    console.error(error, e);
    retorno.msg = error
  }finally {
    return retorno
  }
}

export async function deleteBookMarkAction(id: string, token: string) : Promise<ResponsePropio> {
  let retorno: ResponsePropio = { error: true, msg: 'Error desconocido'}
  const repo = repoConfigBook(token);

  try {
    retorno = await repo.delete(id);
  } catch (e) {
    const error = "Error en serverAction => deleteBookMarkAction:"
    console.error(error, e);
    retorno.msg = error
  }finally {
    return retorno
  }
}