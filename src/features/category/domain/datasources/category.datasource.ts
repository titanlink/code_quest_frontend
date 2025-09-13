import { ResponsePropio } from "@/config";
import { ICategory } from "..";


export interface CategoryDatasource {
  all(page:number, limit:number): Promise<any>;
  findById(id: string): Promise<ICategory | ResponsePropio>;
  create(entity: any): Promise<ICategory | ResponsePropio>;
  update(entity: any): Promise<ICategory | ResponsePropio>;
  delete(id: string): Promise<ResponsePropio>;
}
