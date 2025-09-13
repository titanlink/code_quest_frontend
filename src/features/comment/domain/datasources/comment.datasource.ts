import { ResponsePropio } from "@/config";
import { IComment } from "..";


export interface CommentDatasource {
  all(page:number, limit:number): Promise<any>;
  findById(id: string): Promise<IComment | ResponsePropio>;
  create(entity: any): Promise<IComment | ResponsePropio>;
  update(entity: any): Promise<IComment | ResponsePropio>;
  delete(id: string): Promise<ResponsePropio>;
}
