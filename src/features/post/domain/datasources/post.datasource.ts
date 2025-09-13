import { ResponsePropio } from "@/config";
import { IPost } from "..";


export interface PostDatasource {
  all(page:number, limit:number): Promise<any>;
  findById(id: string): Promise<IPost | ResponsePropio>;
  create(entity: any): Promise<IPost | ResponsePropio>;
  update(entity: any): Promise<IPost | ResponsePropio>;
  delete(id: string): Promise<ResponsePropio>;
}
