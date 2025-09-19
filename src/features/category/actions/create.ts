"use server";

import { ResponsePropio } from "@/config";
import { repoConfig } from "./_repo-config";
import { ICategory } from "..";



export async function createCategoryAction(data: ICategory, token: string) : Promise<ICategory | ResponsePropio> {
  const repo = repoConfig(token)

  try {
    return await repo.create(data);
  } catch (e) {
    console.error("Error en createCategoryAction:", e);
    return { error: true, msg: "No se pudo crear el entity" };
  }
}
