"use server";

import { revalidatePath } from "next/cache";
import { UserDatasourceGQL, UserRepositoryImpl } from "..";
import { IUser } from "../domain";
import { ResponsePropio } from "@/config";


export async function updateUserAction(entity: IUser, token: string, changeRole:boolean = false): Promise<IUser | ResponsePropio> {
  let retorno : IUser | ResponsePropio = { error: true, msg: "Error desconocido" };
  const datasource = new UserDatasourceGQL();
  const repo = new UserRepositoryImpl(datasource, token);
  try {
    if(!changeRole) retorno = await repo.update(entity);
    if(changeRole) retorno = await repo.changeRole(entity);
  } catch (e) {
    console.error("Error en createUserAction:", e);
    if ('error' in retorno) retorno.msg = "No se pudo crear el entity"
  }finally {
    return retorno
  }
}
