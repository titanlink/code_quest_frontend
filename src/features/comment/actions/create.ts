"use server";

import { ResponsePropio } from "@/config";
import { IComment } from "..";
import { repoConfig } from "./_repo-config";



export async function createCommentAction(data: IComment, token: string = 'No Token') : Promise<IComment | ResponsePropio> {
  const repo = repoConfig(token);

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createCommentAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
