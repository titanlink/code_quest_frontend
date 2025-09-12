import { ResponsePropio } from "@/config";
import { ICategory } from "..";


export abstract class CategoryRepository {
  abstract findById(id: string): Promise<any>;
  abstract create(entity: any): Promise<ICategory | ResponsePropio>;
  abstract update(entity: any): Promise<ICategory | ResponsePropio>;
  abstract all(page:number, limit:number): Promise<any>;
  abstract delete(id: string): Promise<ResponsePropio>;
}
