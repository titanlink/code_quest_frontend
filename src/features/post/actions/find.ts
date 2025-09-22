"use server";

import { ResponsePropio } from "@/config/response-propio";
import { IPost } from "../domain/entities/post.entity";
import { repoConfig } from "./_repo-config";

export async function findPostAction(
  id: string,
  token: string
): Promise<IPost | ResponsePropio> {
  let retorno: IPost | ResponsePropio = {
    error: true,
    msg: "Error desconocido > findPostAction",
  };
  const repo = repoConfig(token);
  try {
    retorno = await repo.findById(id);
  } catch (e) {
    console.error("Error en findPostAction:", e);
  } finally {
    return retorno;
  }
}

export async function findPostBySlugAction(
  slug: string,
  token: string
): Promise<IPost | ResponsePropio> {
  let retorno: IPost | ResponsePropio = {
    error: true,
    msg: "Error desconocido",
  };
  const repo = repoConfig(token);
  try {
    retorno = await repo.findBySlugId(slug, token);
  } catch (e) {
    console.error("Error en findPostAction:", e);
  } finally {
    return retorno;
  }
}
