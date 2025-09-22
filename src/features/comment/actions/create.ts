"use server";

import { ResponsePropio } from "@/config/response-propio";
import { IComment, ISubComment } from "../domain/entities/comment.entity";
import { repoConfig } from "./_repo-config";

export async function createCommentAction(
  data: IComment,
  token: string = "No Token",
  isSubComment = false
): Promise<IComment| ISubComment | ResponsePropio> {
  const repo = repoConfig(token);

  try {
    return await repo.create(data, token, isSubComment);
  } catch (e) {
    console.error("Error en createCommentAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
