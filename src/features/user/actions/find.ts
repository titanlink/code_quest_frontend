"use server";

import { repoConfig } from "./_repo-config";




export async function findUserAction(id: string, token: string) {
  const repo = repoConfig(token)
  try {
    const response = await repo.findById(id);
    return response
  } catch (e) {
    console.error("Error en findUserAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
export async function checkProfileAction(token: string) {
  const repo = repoConfig(token)
  try {
    const response = await repo.checkProfile();
    return response
  } catch (e) {
    console.error("Error en findUserAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}

export async function dashboardAction(token: string) {
  const repo = repoConfig(token)
  try {
    const response = await repo.dashboard();
    return response
  } catch (e) {
    console.error("Error en findUserAction:", e);
    return { success: false, error: "No se pudo obtener el asset" };
  }
}
  