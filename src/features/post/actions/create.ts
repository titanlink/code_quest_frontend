"use server";

import { ResponsePropio } from "@/config/response-propio";
import { repoConfig, repoConfigBook, repoConfigLike } from "./_repo-config";
import { IPost } from "../domain/entities/post.entity";
import { ILike } from "../domain/entities/like.entity";
import { IBookMark } from "../domain/entities/bookmark.entity";

export async function createPostAction(
  data: IPost,
  token: string
): Promise<IPost | ResponsePropio> {
  const repo = repoConfig(token);

  try {
    console.log("🚀 ~ createPostAction ~ data:..........", data)
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createPostAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}

export async function createLikePostAction(
  data: ILike,
  token: string
): Promise<ILike | ResponsePropio> {
  const repo = repoConfigLike(token);
  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createLikePostAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}

export async function createBookMarkAction(
  data: IBookMark,
  token: string
): Promise<IBookMark | ResponsePropio> {
  const repo = repoConfigBook(token);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createBookMarkAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
