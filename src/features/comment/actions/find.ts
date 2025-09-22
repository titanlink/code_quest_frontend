"use server";

import { repoConfig } from "./_repo-config";

export async function findCommentAction(id: string, token: string) {
  const repo = repoConfig(token);
  try {
    const response = await repo.findById(id);
    return response;
  } catch (e) {
    console.error("Error en findCommentAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
