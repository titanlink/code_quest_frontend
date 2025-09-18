import { ResponsePropio } from "@/config";
import { IPost } from "..";


export interface PostDatasource {
  all(page:number, limit:number, token: string): Promise<ResponsePropio>;
  findById(id: string, token: string): Promise<IPost | ResponsePropio>;
  findBySlugId(id: string, token: string): Promise<IPost | ResponsePropio>;
  create(entity: any, token: string): Promise<IPost | ResponsePropio>;
  update(entity: any, token: string): Promise<IPost | ResponsePropio>;
  delete(id: string, token: string): Promise<ResponsePropio>;
}
