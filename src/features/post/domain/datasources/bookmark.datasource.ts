import { ResponsePropio } from "@/config/response-propio";
import { IBookMark } from "../entities/bookmark.entity";

export interface BookMarkDatasource {
  all(page: number, limit: number, token: string): Promise<any>;
  findById(id: string, token: string): Promise<IBookMark | ResponsePropio>;
  create(entity: any, token: string): Promise<IBookMark | ResponsePropio>;
  update(entity: any, token: string): Promise<IBookMark | ResponsePropio>;
  delete(id: string, token: string): Promise<ResponsePropio>;
}
