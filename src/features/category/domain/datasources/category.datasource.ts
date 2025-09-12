import { ResponsePropio } from "@/config";
import { ICategory } from "..";


export interface CategoryDatasource {
  findById(id: string): Promise<any>;
  create(entity: any): Promise<ICategory | ResponsePropio>;
  update(entity: any): Promise<ICategory | ResponsePropio>;
  all(page:number, limit:number): Promise<any>;
  delete(id: string): Promise<ResponsePropio>;
}
