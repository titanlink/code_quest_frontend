"use server";

import { ResponsePropio } from "@/config/response-propio";
import { IUser } from "../domain/entities/user.entity";
import { repoConfig } from "./_repo-config";

export async function updateUserAction(
  entity: IUser,
  token: string,
  changeRole: boolean = false
): Promise<IUser | ResponsePropio> {
  let retorno: IUser | ResponsePropio = {
    error: true,
    msg: "Error desconocido",
  };
  const repo = repoConfig(token);
  try {
    if (!changeRole) retorno = await repo.update(entity);
    if (changeRole) retorno = await repo.changeRole(entity);
  } catch (e) {
    console.error("Error en createUserAction:", e);
    if ("error" in retorno) retorno.msg = "No se pudo crear el entity";
  } finally {
    return retorno;
  }
}
