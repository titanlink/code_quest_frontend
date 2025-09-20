import { ResponsePropio } from "@/config";
import { IComment } from "..";


export interface CommentDatasource {
  all(page:number, limit:number, token:string): Promise<any>;
  findById(id: string, token:string): Promise<IComment | ResponsePropio>;
  create(entity: any, token:string, isSubComment: boolean): Promise<IComment | ResponsePropio>;
  update(entity: any, token:string): Promise<IComment | ResponsePropio>;
  delete(id: string, token:string): Promise<ResponsePropio>;
}
