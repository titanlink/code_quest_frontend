import { ResponsePropio } from "@/config";
import { ICategory } from "..";


export abstract class CategoryRepository {
  abstract findById(id: string, token: string): Promise<ICategory | ResponsePropio>;
  abstract create(entity: any, token: string): Promise<ICategory | ResponsePropio>;
  abstract update(entity: any, token: string): Promise<ICategory | ResponsePropio>;
  abstract all(page:number, limit:number, token: string): Promise<any>;
  abstract delete(id: string, token: string): Promise<ResponsePropio>;
}
