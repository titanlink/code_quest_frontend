import { ResponsePropio } from "@/config";
import { IBookMark } from "..";


export interface BookMarkDatasource {
  all(page:number, limit:number, token:string): Promise<any>;
  findById(id: string, token:string): Promise<IBookMark | ResponsePropio>;
  create(entity: any, token:string): Promise<IBookMark | ResponsePropio>;
  update(entity: any, token:string): Promise<IBookMark | ResponsePropio>;
  delete(id: string, token:string): Promise<ResponsePropio>;
}
