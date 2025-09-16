import { ResponsePropio } from "@/config";
import { ICategory } from "..";


export interface CategoryDatasource {
  all(page:number, limit:number, token:string): Promise<any>;
  findById(id: string, token:string): Promise<ICategory | ResponsePropio>;
  create(entity: any, token:string): Promise<ICategory | ResponsePropio>;
  update(entity: any, token:string): Promise<ICategory | ResponsePropio>;
  delete(id: string, token:string): Promise<ResponsePropio>;
}
