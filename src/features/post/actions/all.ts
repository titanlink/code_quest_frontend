"use server";

import { ResponsePropio } from "@/config/response-propio";
import { repoConfig, repoConfigBook, repoConfigLike } from "./_repo-config";
import { ILike } from "../domain/entities/like.entity";
import { IBookMark } from "../domain/entities/bookmark.entity";

export async function allPostAction(
  { page = 0, limit = 50 },
  token: string = "No Token",
  categoriId?: number
) {
  let retorno: ResponsePropio = {
    msg: "Error desconocido en allPostAction",
    error: true,
  };
  const repo = repoConfig(token);

  try {
    const response = await repo.all(page, limit, token, categoriId);
    retorno = response;
  } catch (e) {
    console.error("Error en allPostAction:", e);
    // return { error: true, msg: "No se pudo obtener los post" };
  } finally {
    return retorno;
  }
}

export async function allLikeAction(
  { page = 0, limit = 50 },
  token: string = "No Token"
): Promise<ILike[]> {
  const repo = repoConfigLike(token);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allLikeAction:", e);
    // return { error: true, msg: "No se pudo obtener los likes" };
    return [];
  }
}

export async function allBookMarkAction(
  { page = 0, limit = 50 },
  token: string = "No Token"
): Promise<IBookMark[]> {
  const repo = repoConfigBook(token);

  try {
    const response = await repo.all(page, limit);
    return response;
  } catch (e) {
    console.error("Error en allBookMarkAction:", e);
    // return { error: true, msg: "No se pudo obtener los likes" };
    return [];
  }
}
